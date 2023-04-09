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
  const touchDelay = useState('touchDelay', () => 500);

  const useOnDragStart = (
    e: any,
    item: any,
    index: any,
    isAddNew: boolean,
    delay: number
  ) => {
    if (item.id == 'root') return;

    longPress.value = setTimeout(function () {
      root.value = document.querySelector('.rootBuilder');
      drag.value.ref = e;
      drag.value.itemId = item.id;

      isDragStart.value = true;
      isDragAddNew.value = isAddNew;

      //get initial touch position
      if (e.clientX) {
        startX.value = drag.value.ref.clientX;
        startY.value = drag.value.ref.clientY;
      } else {
        startX.value = drag.value.ref.touches[0].clientX;
        startY.value = drag.value.ref.touches[0].clientY;
      }

      //set item data
      drag.value.item = item;
      drag.value.itemId = item.id;
      drag.value.itemIndex = Number(index);
      drag.value.itemIndexOld = Number(index);
      drag.value.parentId =
        drag.value.ref.target.parentNode.attributes['data-itemId'].value;
      drag.value.parentIndex =
        drag.value.ref.target.parentNode.attributes['data-index'].value;
      drag.value.parent = getDataById(drag.value.parentId).value;
    }, delay);
  };

  const useOnDraging = (e: any) => {
    if (!isDragStart.value) return;

    isDraging.value = true;

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
    if (!isDraging.value && !isDragStart.value) {
      overlapItemId.value = null;
      drag.value.itemId = null;
      isDragStart.value = false;
      isDraging.value = false;
      clearTimeout(longPress.value);

      return;
    }

    if (isDragAddNew.value === true) {
      const dragItemData = getAddElementDataById(drag.value.itemId);
      const copyData = JSON.parse(JSON.stringify(dragItemData.value));
      const dropItemData = getDataById(overlapItemId.value);

      dropItemData.value.children.push({ ...copyData, id: uuidV4() });

      overlapItemId.value = null;
      drag.value.itemId = null;
      isDragStart.value = false;
      isDraging.value = false;
      clearTimeout(longPress.value);

      return;
    }

    if (isDragAddNew.value === false) {
      const dragItemData = getDataById(drag.value.itemId);
      const dropItemData = getDataById(overlapItemId.value);
      dropItemData.value.children.push({ ...dragItemData.value });

      const dragParentData = getDataById(drag.value.parentId ?? '');
      dragParentData.value.children?.splice(Number(drag.value.itemIndex), 1);

      overlapItemId.value = null;
      drag.value.itemId = null;
      isDragStart.value = false;
      isDraging.value = false;
      clearTimeout(longPress.value);

      return;
    }
  };

  const onDragStart = (e: any, item: any, isAddNew: boolean, delay: number) => {
    longPress.value = setTimeout(function () {
      isDragStart.value = true;

      isDragAddNew.value = isAddNew;
      root.value = document.querySelector('.rootBuilder');
      drag.value.ref = e;
      drag.value.item = item;
      drag.value.itemId = item.id;

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
    }, delay);
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
