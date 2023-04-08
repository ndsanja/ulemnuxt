import { v4 as uuidV4 } from 'uuid';

export const useDragAndDropBackup = () => {
  const { isDragAddNew, getDataById, activeId, hoverId } = useStore();

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

  const root = useState<any>('root', () => null);
  const dropItem = useState<any>('dropItem', () => null);
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
    root.value = document.querySelector('.thisRoot');
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
    drag.value.ref.target.style.opacity = 0.5;
    // drag.value.ref.target.style['z-index'] = 100;

    //set item data
    drag.value.item = e.target.attributes['data-item'].value;
    drag.value.itemId = e.target.attributes['data-itemId'].value;
    drag.value.itemIndex = e.target.attributes['data-item'].value;
    drag.value.itemIndexOld = e.target.attributes['data-item'].value;
    drag.value.parentId = e.target.parentNode.attributes['data-itemId'].value;
    drag.value.parentIndex = e.target.parentNode.attributes['data-index'].value;
    drag.value.parent = e.target.parentNode.attributes['data-item'].value;

    e.target.classList.add('dragging');
    e.target.classList.add('dragItem');

    isDragAddNew.value = isAddNew;
  };

  const useOnDraging = (e: any) => {
    if (!isDraging.value) return;

    if (drag.value.ref) {
      if (e.clientX) {
        // // calculate distance move by the mouse
        // const deltaX = e.clientX - startX.value;
        // const deltaY = e.clientY - startY.value;

        // // update element position
        // drag.value.ref.target.style.left = `${elementX.value + deltaX}px`;
        // drag.value.ref.target.style.top = `${elementY.value + deltaY}px`;
        drag.value.x = e.clientX;
        drag.value.y = e.clientY;
      } else {
        // // calculate distance move by the touch
        // const deltaX = e.touches[0].clientX - startX.value;
        // const deltaY = e.touches[0].clientY - startY.value;

        // // touchmove - assuming a single touchpoint
        // // update element position
        // drag.value.ref.target.style.left = `${elementX.value + deltaX}px`;
        // drag.value.ref.target.style.top = `${elementY.value + deltaY}px`;
        drag.value.x = e.touches[0].clientX;
        drag.value.y = e.touches[0].clientY;
      }

      // set x & y
      // drag.value.x = drag.value.ref.target.offsetLeft;
      // drag.value.y = drag.value.ref.target.offsetTop;

      // get all child Node recursively
      function getAllChildren(element: any): any {
        const allChildren = [];
        // check if the element has any children
        if (element.hasChildNodes()) {
          // iterate over all child nodes of the element
          for (let childNode of element.childNodes) {
            // check if the child node is an element node
            if (childNode.nodeType === Node.ELEMENT_NODE) {
              // add the child element to the array of all children
              allChildren.push(childNode);
              // recursively get all the nested children of the child element
              allChildren.push(...getAllChildren(childNode));
            }
          }
        }
        return allChildren;
      }
      let items = getAllChildren(root.value);

      // filtered childNode by Id
      let filteredItems = items.filter((e: any) => {
        if (e.hasAttribute('data-itemId')) {
          return e.attributes['data-itemId'].value != drag.value.itemId;
        }
      });

      //evalute is overlap
      for (dropItem.value of filteredItems) {
        if (dropItem.value) {
          let div = document.createElement('div');
          div.style.width = '100%';
          div.style.height = '4px';
          div.style.background = 'purple';

          const itemRect = dropItem.value.getBoundingClientRect();

          if (
            drag.value.x >= itemRect.left &&
            drag.value.x <= itemRect.right &&
            drag.value.y >= itemRect.top &&
            drag.value.y <= itemRect.bottom &&
            isDraging.value == true
          ) {
            dropItem.value.style.outline = '3px blue solid';
            dropItem.value.style['outline-offset'] = '2px';
          } else {
            dropItem.value.style.outline = '';
            dropItem.value.style['outline-offset'] = '';
          }
        }
      }

      //   // console.log(items);
    }

    // e.target.classList.add('ondrag');
    // const dropTargetRect = e.target.getBoundingClientRect();
    // if (
    //   drag.value.x >= dropTargetRect.left &&
    //   drag.value.x <= dropTargetRect.right &&
    //   drag.value.y >= dropTargetRect.top &&
    //   drag.value.y <= dropTargetRect.bottom
    // ) {
    //   // dropTarget.classList.add('over');
    //   console.log(e.target.attributes['data-itemId'].value);
    // } else {
    //   console.log('not');

    //   // dropTarget.classList.remove('over');
    // }
    // console.log(e.target.attributes['data-itemId'].value);
  };

  const useOnDragEnd = (e: any) => {
    e.target.classList.remove('dragging');
    e.target.classList.remove('dragover');
    e.target.classList.remove('ondrag');

    drag.value.ref.target.style.position = '';
    drag.value.ref.target.style['z-index'] = '';
    drag.value.ref.target.style.height = '';
    drag.value.ref.target.style.width = '';
    drag.value.ref.target.style.opacity = '';

    if (dropItem.value) {
      dropItem.value.style.outline = '';
      dropItem.value.style['outline-offset'] = '';
    }

    isDraging.value = false;
    e.target.classList.remove('dragItem');
  };

  const useMouseOver = (e: any, itemId: any) => {
    hoverId.value = itemId;
    if (isDraging.value && hoverId.value == itemId) {
      e.target.style.outline = '3px blue solid';
      e.target.style['outline-offset'] = '2px';
    } else {
      if (hoverId.value == itemId) {
        e.target.style.outline = '2px green solid';
        e.target.style['outline-offset'] = '2px';
      } else {
        e.target.style.outline = '';
        e.target.style['outline-offset'] = '';
      }
    }
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
    useMouseOver,
    // useOnDragEnter,
    // useOnDragOver,
    // useOnDragLeave,
    // useOnDrop,
    // useOnTouchStart,
    // useOnTouchMove,
  };
};
