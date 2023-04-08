import { v4 as uuidV4 } from 'uuid';

export const useDragAndDrop = () => {
  const { toogleLeft } = useStateUiBuilder();
  const { isDragAddNew, getDataById, getAddElementDataById } = useStore();

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
  const isDragStart = useState('is-draging', () => false);
  const isDraging = useState('is-draging', () => false);
  const isOnDrag = useState('is-ondrag', () => false);
  const isDisabledDragAndDrop = useState('dragItemId', () => false);
  const overlapItemId = useState<any>('overlapItemId', () => null);
  const dragItemId = useState<any>('dragItemId', () => null);
  const longPress = useState<any>('longPress', () => null);

  const useOnDragStart = (e: any, isAddNew: boolean) => {
    longPress.value = setTimeout(function () {
      isDraging.value = true;

      isDragAddNew.value = isAddNew;
      isDragStart.value = true;
      root.value = document.querySelector('.thisRoot');
      drag.value.ref = e;
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
      drag.value.parentIndex =
        e.target.parentNode.attributes['data-index'].value;
      drag.value.parent = e.target.parentNode.attributes['data-item'].value;
    }, 500);
  };

  const useOnDraging = (e: any) => {
    if (!isDragStart) return;

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
    if (!isDraging.value) {
      overlapItemId.value = null;
      dragItemId.value = null;
      isDraging.value = false;
      isDragStart.value = false;
      clearTimeout(longPress.value);

      return;
    }

    if (isDragAddNew.value === true) {
      const dragItemData = getAddElementDataById(dragItemId.value);
      const copyData = JSON.parse(JSON.stringify(dragItemData.value));
      const dropItemData = getDataById(overlapItemId.value);

      dropItemData.value.children.push({ ...copyData, id: uuidV4() });

      overlapItemId.value = null;
      dragItemId.value = null;
      isDraging.value = false;
      isDragStart.value = false;
      clearTimeout(longPress.value);

      return;
    }

    if (isDragAddNew.value === false) {
      const dragItemData = getDataById(dragItemId.value);
      const dropItemData = getDataById(overlapItemId.value);
      dropItemData.value.children.push({ ...dragItemData.value });

      const dragParentData = getDataById(drag.value.parentId ?? '');
      dragParentData.value.children?.splice(drag.value.itemIndex, 1);

      overlapItemId.value = null;
      dragItemId.value = null;
      isDraging.value = false;
      isDragStart.value = false;
      clearTimeout(longPress.value);

      return;
    }
  };

  const onDragStart = (e: any, item: any, isAddNew: boolean) => {
    longPress.value = setTimeout(function () {
      isDragStart.value = true;

      isDragAddNew.value = isAddNew;
      root.value = document.querySelector('.thisRoot');
      drag.value.ref = e;
      drag.value.item = item;
      dragItemId.value = drag.value.item.id;

      // console.log(e);

      //get initial touch position
      if (e.clientX) {
        startX.value = e.clientX;
        startY.value = e.clientY;
      } else {
        startX.value = e.touches[0].clientX;
        startY.value = e.touches[0].clientY;
      }

      toogleLeft.value = false;
    }, 500);
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
    onDragStart,
  };
};
