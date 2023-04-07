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
  const elementX = useState<any>('deltaX', () => null);
  const elementY = useState<any>('deltaY', () => null);
  const isDraging = useState('is-draging', () => false);

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
    isDraging.value = true;

    //set size height & width
    drag.value.ref.target.style.height = `${drag.value.ref.target.clientHeight}px`;
    drag.value.ref.target.style.width = `${drag.value.ref.target.clientWidth}px`;

    //get initial touch position
    if (e.clientX) {
      startX.value = e.clientX;
      startY.value = e.clientY;
    } else {
      startX.value = e.touches[0].clientX;
      startY.value = e.touches[0].clientY;
    }

    //get initial element position
    elementX.value = drag.value.ref.target.offsetLeft;
    elementY.value = drag.value.ref.target.offsetTop;

    //set style
    drag.value.ref.target.style.position = 'absolute';
    drag.value.ref.target.style['z-index'] = 100;

    //set item data
    drag.value.item = e.target.attributes['data-item'].value;
    drag.value.itemId = e.target.attributes['data-itemId'].value;
    drag.value.itemIndex = e.target.attributes['data-item'].value;
    drag.value.itemIndexOld = e.target.attributes['data-item'].value;
    drag.value.parentId = e.target.parentNode.attributes['data-itemId'].value;
    drag.value.parentIndex = e.target.parentNode.attributes['data-index'].value;
    drag.value.parent = e.target.parentNode.attributes['data-item'].value;

    e.target.classList.add('dragging');

    isDragAddNew.value = isAddNew;
  };

  const useOnDraging = (e: any) => {
    if (!isDraging.value) return;

    if (drag.value.ref) {
      if (e.clientX) {
        // calculate distance move by the mouse
        const deltaX = e.clientX - startX.value;
        const deltaY = e.clientY - startY.value;

        // update element position
        drag.value.ref.target.style.left = `${elementX.value + deltaX}px`;
        drag.value.ref.target.style.top = `${elementY.value + deltaY}px`;
      } else {
        // calculate distance move by the touch
        const deltaX = e.touches[0].clientX - startX.value;
        const deltaY = e.touches[0].clientY - startY.value;

        // touchmove - assuming a single touchpoint
        // update element position
        drag.value.ref.target.style.left = `${elementX.value + deltaX}px`;
        drag.value.ref.target.style.top = `${elementY.value + deltaY}px`;
      }
      // set x & y
      drag.value.x = drag.value.ref.target.offsetLeft;
      drag.value.y = drag.value.ref.target.offsetTop;
    }
    e.target.classList.add('ondrag');
  };

  const useOnDragEnd = (e: any) => {
    e.target.classList.remove('dragging');
    e.target.classList.remove('dragover');
    e.target.classList.remove('ondrag');

    // drag.value.ref.target.style.position = '';
    drag.value.ref.target.style['z-index'] = '';
    drag.value.ref.target.style.height = '';
    drag.value.ref.target.style.width = '';

    isDraging.value = false;
  };

  // const useOnDragEnter = (e: any) => {
  //   e.target.classList.add('dragover');
  // };

  // const useOnDragOver = (e: any) => {};

  // const useOnDragLeave = (e: any) => {
  //   e.target.classList.remove('dragover');
  // };

  // const useOnDrop = (e: any) => {
  //   const dropNodeId = e.target.getAttribute('data-itemId');
  //   dropItemId.value = dropNodeId;

  //   const dropData = getDataById(dropItemId.value);
  //   e.target.classList.remove('dragover');
  //   isOnDrag.value = false;

  //   if (dropItemId.value == dragItemId.value) return;

  //   if (isDragAddNew.value === false) {
  //     if (dragParentId.value !== dropItemId.value) {
  //       dropData.value.children?.push({
  //         ...dragData.value,
  //         parentId: dropItemId.value,
  //       });

  //       const removeItemFromParentOrigin = getDataById(
  //         dragParentId.value ?? ''
  //       );
  //       removeItemFromParentOrigin.value.children?.splice(dragIndex.value, 1);
  //     }
  //   }

  //   if (isDragAddNew.value === true) {
  //     const dropItemData = getDataById(dropItemId.value);
  //     const dragItemDataNewId = { ...dragData.value, id: `el-${uuidV4()}` };
  //     dropItemData.value.children?.push({
  //       ...dragItemDataNewId,
  //       parentId: dropNodeId,
  //     });
  //   }
  // };

  // const useOnTouchStart = (e: any, isAddNew: any) => {
  //   const dragItem = e.target.getAttribute('data-item');
  //   const dragNodeId = e.target.getAttribute('data-itemId');
  //   const dragNodeIndex = e.target.getAttribute('data-index');
  //   const dragNodeParentId = e.target.getAttribute('data-parentId');

  //   // e.target.classList.add('ontouch');

  //   clientMove.value = e.target;

  //   clientMove.value.style.height = clientMove.value.clientHeight;
  //   clientMove.value.style.width = clientMove.value.clientWidth;
  //   clientMove.value.style.position = 'fixed';

  //   dragItemId.value = dragNodeId;
  //   dragParentId.value = dragNodeParentId;
  //   dragIndex.value = dragNodeIndex;
  //   dragData.value = JSON.parse(dragItem);

  //   isDragAddNew.value = isAddNew;
  //   isOnDrag.value = true;
  //   console.log(clientMove.value);
  // };

  // const useOnTouchMove = (e: any) => {
  //   if (clientMove.value) {
  //     if (e.clientX) {
  //       // mousemove
  //       clientMove.value.style.left =
  //         e.clientX - clientMove.value.clientWidth / 2;
  //       clientMove.value.style.top =
  //         e.clientY - clientMove.value.clientHeight / 2;
  //     } else {
  //       // touchmove - assuming a single touchpoint
  //       clientMove.value.style.left =
  //         e.changedTouches[0].clientX - clientMove.value.clientWidth / 2;
  //       clientMove.value.style.top =
  //         e.changedTouches[0].clientY - clientMove.value.clientHeight / 2;
  //     }
  //   }
  // };

  return {
    isOnDrag,
    isDisabledDragAndDrop,
    drag,
    drop,
    dragOver,
    isDraging,
    useOnDragStart,
    useOnDragEnd,
    useOnDraging,
    // useOnDragEnter,
    // useOnDragOver,
    // useOnDragLeave,
    // useOnDrop,
    // useOnTouchStart,
    // useOnTouchMove,
  };
};
