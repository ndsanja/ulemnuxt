import { v4 as uuidV4 } from 'uuid';

export const useDragAndDrop = () => {
  interface Drag {
    ref?: any;
    x?: any;
    y?: any;
    item?: any;
    itemId?: any;
    itemIndex?: any;
    itemIndexOld?: any;
    itemIndexNew?: any;
    parent?: any;
    parentId?: any;
    parentIndex?: any;
  }

  interface Drop {
    ref: any;
    // x?: any,
    // y?: any,
    item?: any;
    itemId?: any;
    itemIndex?: any;
    itemIndexOld?: any;
    itemIndexNew?: any;
    parent?: any;
    parentId?: any;
    parentIndex?: any;
  }

  interface DragOver {
    ref: any;
    // x?: any,
    // y?: any,
    item?: any;
    itemId?: any;
    itemIndex?: any;
    itemIndexOld?: any;
    itemIndexNew?: any;
    parent?: any;
    parentId?: any;
    parentIndex?: any;
  }

  const initDrag: Drag = {
    ref: null,
    item: null,
    itemId: null,
    itemIndex: null,
    itemIndexNew: null,
    itemIndexOld: null,
    parent: null,
    parentId: null,
    parentIndex: null,
    x: null,
    y: null,
  };
  const initDrop: Drop = {
    ref: null,
    item: null,
    itemId: null,
    itemIndex: null,
    itemIndexNew: null,
    itemIndexOld: null,
    parent: null,
    parentId: null,
    parentIndex: null,
  };
  const initDragOver: DragOver = {
    ref: null,
    item: null,
    itemId: null,
    itemIndex: null,
    itemIndexNew: null,
    itemIndexOld: null,
    parent: null,
    parentId: null,
    parentIndex: null,
  };
  const { isDragAddNew, getDataById } = useStore();
  const drag = useState<Drag>('drag', () => initDrag);
  const drop = useState<Drop>('drop', () => initDrop);
  const dragOver = useState<DragOver>('dragOver', () => initDragOver);

  const startX = useState<any>('startX', () => null);
  const startY = useState<any>('startY', () => null);
  const deltaX = useState<any>('deltaX', () => null);
  const deltaY = useState<any>('deltaY', () => null);

  const dragItemId = useState('dragItemId', () => '');
  const dragParentId = useState('dragParentId', () => '');
  const dragIndex = useState('dragIndex', () => '');
  const dragData = useState<any>('dragData', () => {});
  const dropItemId = useState('dropItemId', () => '');
  const isOnDrag = useState('is-ondrag', () => false);
  const clientMove = useState<any>('client-moving', () => null);
  const isDisabledDragAndDrop = useState('dragItemId', () => false);

  const useOnDragStart = (e: any, isAddNew: boolean) => {
    drag.value.ref = e;
    drag.value.ref.target.style.height =
      drag.value.ref.target.clientHeight + 'px';
    drag.value.ref.target.style.width =
      drag.value.ref.target.clientWidth + 'px';
    // startX.value = e.touches[0].clientX;
    // startY.value = e.touches[0].clientY;
    drag.value.ref.target.style.position = 'absolute';

    drag.value.item = e.target.getAttribute('data-item');
    drag.value.itemId = e.target.getAttribute('data-itemId');
    drag.value.itemIndex = e.target.getAttribute('data-index');
    drag.value.itemIndexOld = e.target.getAttribute('data-index');
    drag.value.parentId = e.target.getAttribute('data-parentId');
    drag.value.parentIndex = e.target.getAttribute('data-parentId');
    drag.value.parent = e.target.getAttribute('data-parentId');

    e.target.classList.add('dragging');

    isDragAddNew.value = isAddNew;
  };

  const useOnDraging = (e: any) => {
    if (drag.value.ref) {
      // deltaX.value = e.touches[0].clientX - startX.value;
      // deltaY.value = e.touches[0].clientY - startY.value;
      if (e.clientX) {
        // mousemove
        drag.value.ref.target.style.left =
          e.clientX - drag.value.ref.target.clientWidth / 2 + 'px';
        drag.value.ref.target.style.top =
          e.clientY - drag.value.ref.target.clientHeight / 2 + 'px';
      } else {
        // touchmove - assuming a single touchpoint
        drag.value.ref.target.style.left =
          e.changedTouches[0].clientX -
          drag.value.ref.target.clientWidth / 2 +
          'px';
        drag.value.ref.target.style.top =
          e.changedTouches[0].clientY -
          drag.value.ref.target.clientHeight / 2 +
          'px';
      }
      // if (e.clientX) {
      //   // mousemove
      //   drag.value.ref.target.style.left =
      //     drag.value.ref.target.offsetLeft + deltaX.value + 'px';
      //   drag.value.ref.target.style.top =
      //     drag.value.ref.target.offsetTop + deltaY.value + 'px';
      // } else {
      //   // touchmove - assuming a single touchpoint
      //   drag.value.ref.target.style.left =
      //     drag.value.ref.target.offsetLeft + deltaX.value + 'px';
      //   drag.value.ref.target.style.top =
      //     drag.value.ref.target.offsetTop + deltaY.value + 'px';
      // }
    }
    e.target.classList.add('ondrag');
    isOnDrag.value = true;
  };

  const useOnDragEnd = (e: any) => {
    e.target.classList.remove('dragging');
    e.target.classList.remove('dragover');
    e.target.classList.remove('ondrag');
    drag.value.ref = null;
  };

  const useOnDragEnter = (e: any) => {
    e.target.classList.add('dragover');
  };

  const useOnDragOver = (e: any) => {};

  const useOnDragLeave = (e: any) => {
    e.target.classList.remove('dragover');
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
    isOnDrag,
    isDisabledDragAndDrop,
    drag,
    drop,
    dragOver,
    useOnDragStart,
    useOnDragEnd,
    useOnDraging,
    // useOnDragEnter,
    // useOnDragOver,
    // useOnDragLeave,
    // useOnDrop,
    useOnTouchStart,
    useOnTouchMove,
  };
};
