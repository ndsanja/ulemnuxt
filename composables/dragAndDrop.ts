import { v4 as uuidV4 } from 'uuid';

export const useDragAndDrop = () => {
  const { isDragAddNew, getDataById, getAddElementDataById } = useStore();

  const dragItemId = useState('dragItemId', () => '');
  const dragParentId = useState('dragParentId', () => '');
  const dragIndex = useState('dragIndex', () => '');
  const dragData = useState<any>('dragData', () => {});
  const dropItemId = useState('dropItemId', () => '');

  const useOnDragStart = (e: any, isAddNew: boolean) => {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';

    const dragItem = e.target.getAttribute('data-item');
    const dragNodeId = e.target.getAttribute('data-itemId');
    const dragNodeIndex = e.target.getAttribute('data-index');
    const dragNodeParentId = e.target.getAttribute('data-parent');

    e.target.classList.add('dragging');

    dragItemId.value = dragNodeId;
    dragParentId.value = dragNodeParentId;
    dragIndex.value = dragNodeIndex;
    dragData.value = JSON.parse(dragItem);
    isDragAddNew.value = isAddNew;
  };

  const useOnDrag = (e: any) => {
    e.target.classList.add('ondrag');
  };

  const useOnDragEnter = (e: any) => {
    e.target.classList.add('dragover');
  };

  const useOnDragOver = (e: any) => {};

  const useOnDragLeave = (e: any) => {
    e.target.classList.remove('dragover');
  };

  const useOnDragEnd = (e: any) => {
    e.target.classList.remove('dragging');
    e.target.classList.remove('dragover');
  };

  const useOnDrop = (e: any) => {
    const dropNodeId = e.target.getAttribute('data-itemId');
    dropItemId.value = dropNodeId;

    const dropData = getDataById(dropItemId.value);

    if (dropItemId.value == dragItemId.value) {
      e.target.classList.remove('dragover');
      document
        .querySelector(`[data-itemId = ${dragItemId.value}]`)
        ?.classList.remove('ondrag');
      return;
    }

    if (isDragAddNew.value === false) {
      if (dragParentId.value !== dropItemId.value) {
        dropData.value.children?.push({
          ...dragData.value,
          parentId: dropItemId.value,
        });

        const removeItemFromParentOrigin = getDataById(
          dragParentId.value ?? ''
        );
        removeItemFromParentOrigin.value.children?.splice(dragIndex.value, 1);
      }

      e.target.classList.remove('dragover');
      document
        .querySelector(`[data-itemId = ${dragItemId.value}]`)
        ?.classList.remove('ondrag');
    }

    if (isDragAddNew.value === true) {
      const dropItemData = getDataById(dropItemId.value);

      const dragItemDataNewId = { ...dragData.value, id: `el-${uuidV4()}` };
      dropItemData.value.children?.push({
        ...dragItemDataNewId,
        parentId: dropNodeId,
      });

      // const removeItemFromParentOrigin = getAddElementDataById(dragParentId ?? "");
      // removeItemFromParentOrigin.value.children?.splice(dragItemIndex, 1);

      e.target.classList.remove('dragover');
      document
        .querySelector(`[data-itemId = ${dragItemId.value}]`)
        ?.classList.remove('ondrag');
    }
  };

  return {
    useOnDragStart,
    useOnDrag,
    useOnDragEnter,
    useOnDragOver,
    useOnDragLeave,
    useOnDragEnd,
    useOnDrop,
  };
};
