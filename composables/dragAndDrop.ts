import { v4 as uuidV4 } from 'uuid';

export const useDragAndDrop = () => {
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
  const isDraging = useState('is-draging', () => false);
  const isOnDrag = useState('is-ondrag', () => false);
  const isDisabledDragAndDrop = useState('dragItemId', () => false);
  const overlapItemId = useState<any>('overlapItemId', () => null);
  const dragItemId = useState<any>('dragItemId', () => null);

  const useOnDragStart = (e: any, isAddNew: boolean) => {
    root.value = document.querySelector('.thisRoot');
    drag.value.ref = e;
    isDraging.value = true;
    dragItemId.value = e.target.attributes['data-itemId'].value;

    //get initial touch position
    if (e.clientX) {
      startX.value = e.clientX;
      startY.value = e.clientY;
    } else {
      startX.value = e.touches[0].clientX;
      startY.value = e.touches[0].clientY;
    }

    //set item data
    drag.value.item = e.target.attributes['data-item'].value;
    drag.value.itemId = e.target.attributes['data-itemId'].value;
    drag.value.itemIndex = e.target.attributes['data-item'].value;
    drag.value.itemIndexOld = e.target.attributes['data-item'].value;
    drag.value.parentId = e.target.parentNode.attributes['data-itemId'].value;
    drag.value.parentIndex = e.target.parentNode.attributes['data-index'].value;
    drag.value.parent = e.target.parentNode.attributes['data-item'].value;

    isDragAddNew.value = isAddNew;
  };

  const useOnDraging = (e: any) => {
    if (!isDraging.value) return;

    if (drag.value.ref) {
      if (e.clientX) {
        drag.value.x = e.clientX;
        drag.value.y = e.clientY;
      } else {
        drag.value.x = e.touches[0].clientX;
        drag.value.y = e.touches[0].clientY;
      }

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
            overlapItemId.value =
              dropItem.value.attributes['data-itemId'].value;
          }
        }
      }
    }
  };

  const useOnDragEnd = (e: any) => {
    e.target.classList.remove('dragging');
    e.target.classList.remove('dragover');
    e.target.classList.remove('ondrag');

    overlapItemId.value = null;
    dragItemId.value = null;

    isDraging.value = false;
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

  return {
    isOnDrag,
    isDisabledDragAndDrop,
    drag,
    drop,
    dragOver,
    overlapItemId,
    dragItemId,
    isDraging,
    useOnDragStart,
    useOnDragEnd,
    useOnDraging,
    useMouseOver,
  };
};
