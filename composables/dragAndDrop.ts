import { v4 as uuidV4 } from 'uuid';

export const useDragAndDrop = () => {
  const { isDragAddNew, getDataById } = useStore();

  const dragItemId = useState('dragItemId', () => '');
  const dragParentId = useState('dragParentId', () => '');
  const dragIndex = useState('dragIndex', () => '');
  const dragData = useState<any>('dragData', () => {});
  const dropItemId = useState('dropItemId', () => '');
  const isOnDrag = useState('is-ondrag', () => false);
  const clientMove = useState<any>('client-moving', () => null);
  const isDisabledDragAndDrop = useState('dragItemId', () => false);

  const useOnDragStart = (e: any, isAddNew: boolean) => {
    const dragItem = e.target.getAttribute('data-item');
    const dragNodeId = e.target.getAttribute('data-itemId');
    const dragNodeIndex = e.target.getAttribute('data-index');
    const dragNodeParentId = e.target.getAttribute('data-parentId');

    e.target.classList.add('dragging');

    dragItemId.value = dragNodeId;
    dragParentId.value = dragNodeParentId;
    dragIndex.value = dragNodeIndex;
    dragData.value = JSON.parse(dragItem);
    isDragAddNew.value = isAddNew;
  };

  const useOnDrag = (e: any) => {
    e.target.classList.add('ondrag');
    isOnDrag.value = true;
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
    e.target.classList.remove('ondrag');
  };

  const useOnDrop = (e: any) => {
    const dropNodeId = e.target.getAttribute('data-itemId');
    dropItemId.value = dropNodeId;

    const dropData = getDataById(dropItemId.value);
    e.target.classList.remove('dragover');
    isOnDrag.value = false;

    if (dropItemId.value == dragItemId.value) return;

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
    }

    if (isDragAddNew.value === true) {
      const dropItemData = getDataById(dropItemId.value);
      const dragItemDataNewId = { ...dragData.value, id: `el-${uuidV4()}` };
      dropItemData.value.children?.push({
        ...dragItemDataNewId,
        parentId: dropNodeId,
      });
    }
  };

  const useOnTouchStart = (e: any, isAddNew: any) => {
    const dragItem = e.target.getAttribute('data-item');
    const dragNodeId = e.target.getAttribute('data-itemId');
    const dragNodeIndex = e.target.getAttribute('data-index');
    const dragNodeParentId = e.target.getAttribute('data-parentId');

    // e.target.classList.add('ontouch');

    clientMove.value = e.target;

    clientMove.value.style.height = clientMove.value.clientHeight;
    clientMove.value.style.width = clientMove.value.clientWidth;
    clientMove.value.style.position = 'fixed';

    dragItemId.value = dragNodeId;
    dragParentId.value = dragNodeParentId;
    dragIndex.value = dragNodeIndex;
    dragData.value = JSON.parse(dragItem);

    isDragAddNew.value = isAddNew;
    isOnDrag.value = true;
    console.log(clientMove.value);
  };

  const useOnTouchMove = (e: any) => {
    if (clientMove.value) {
      if (e.clientX) {
        // mousemove
        clientMove.value.style.left =
          e.clientX - clientMove.value.clientWidth / 2;
        clientMove.value.style.top =
          e.clientY - clientMove.value.clientHeight / 2;
      } else {
        // touchmove - assuming a single touchpoint
        clientMove.value.style.left =
          e.changedTouches[0].clientX - clientMove.value.clientWidth / 2;
        clientMove.value.style.top =
          e.changedTouches[0].clientY - clientMove.value.clientHeight / 2;
      }
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
    useOnTouchStart,
    useOnTouchMove,

    isOnDrag,
    isDisabledDragAndDrop
  };
};
