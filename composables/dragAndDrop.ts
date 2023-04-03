export const useDragAndDrop = () => {
  const { isDragAddNew, getDataById, getAddElementDataById } = useStore();

  const useOnDragStart = (e: any, isAddNew: boolean) => {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';

    const dragNodeId = e.target.getAttribute('data-item');
    const dragNodeIndex = e.target.getAttribute('data-index');
    const dragNodeParentId = e.target.getAttribute('data-parent');

    e.target.classList.add('dragging');

    e.dataTransfer.setData('itemData', [
      dragNodeId,
      dragNodeIndex,
      dragNodeParentId,
    ]);

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
    const dropNodeId = e.target.getAttribute('data-item');

    const dropData = e.dataTransfer.getData('itemData');
    const dropDataArray = dropData?.split(',');
    const dragItemId = dropDataArray[0];
    const dragItemIndex = Number(dropDataArray[1]);
    const dragParentId = dropDataArray[2];

    if (dropNodeId == dragItemId) {
      e.target.classList.remove('dragover');
      document
        .querySelector(`[data-item = ${dragItemId}]`)
        ?.classList.remove('ondrag');
      return;
    }

    if (isDragAddNew.value === false) {
      const dragItemData = getDataById(dragItemId);
      if (dragItemData.value.parentId !== dropNodeId) {
        const dropItemData = getDataById(dropNodeId);
        dropItemData.value.children?.push({
          ...dragItemData.value,
          parentId: dropNodeId,
        });

        const removeItemFromParentOrigin = getDataById(dragParentId ?? '');
        removeItemFromParentOrigin.value.children?.splice(dragItemIndex, 1);
      }

      e.target.classList.remove('dragover');
      document
        .querySelector(`[data-item = ${dragItemId}]`)
        ?.classList.remove('ondrag');
    }

    if (isDragAddNew.value === true) {
      const dragItemData = getAddElementDataById(dragItemId);
      const dropItemData = getDataById(dropNodeId);
      dropItemData.value.children?.push({
        ...dragItemData.value,
        parentId: dropNodeId,
      });

      // const removeItemFromParentOrigin = getAddElementDataById(dragParentId ?? "");
      // removeItemFromParentOrigin.value.children?.splice(dragItemIndex, 1);

      e.target.classList.remove('dragover');
      document
        .querySelector(`[data-item = ${dragItemId}]`)
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
