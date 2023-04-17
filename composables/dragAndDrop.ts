import { v4 as uuidV4 } from 'uuid';

export const useDragAndDrop = () => {
  const { toogleLeft } = useStateUiBuilder();
  const { isDragAddNew, getDataById, getAddElementDataById, id, activeId } =
    useStore();

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
    boundingTop: any;
    boundingBottom: any;
    boundingLeft: any;
    boundingRight: any;
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
    boundingTop: null,
    boundingBottom: null,
    boundingLeft: null,
    boundingRight: null,
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
  const isDropBefore = useState('dropBefore', () => false);
  const isDropAfter = useState('dropAfter', () => false);
  const isDropInside = useState('dropInside', () => false);
  const isTouch = useState('isTouch', () => false);
  const testItemId = useState('tetst', () => null);
  const typographyFocus = useState<any>('typographyFocus', () => null);

  const useOnDragStart = (
    e: any,
    item: any,
    index: any,
    isAddNew: boolean,
    delay: number
  ) => {
    if (e.clientX) {
      drag.value.x = e.clientX;
      drag.value.x = e.clientY;
      isTouch.value = false;
    } else {
      drag.value.x = e.touches[0].clientX;
      drag.value.y = e.touches[0].clientY;
    }

    id.value = item.id;
    activeId.value = item.id;

    if (item.id == 'root') return;

    longPress.value = setTimeout(function () {
      root.value = document.querySelector('.rootBuilder');
      drag.value.ref = document.querySelector(`[data-itemId="${item.id}"]`);
      drag.value.itemId = item.id;

      isDragStart.value = true;
      isDragAddNew.value = isAddNew;

      //set item data
      drag.value.item = item;
      drag.value.itemId = item.id;
      drag.value.itemIndex = Number(index);
      drag.value.itemIndexOld = Number(index);
      drag.value.parentId =
        drag.value.ref.parentNode.attributes['data-itemId'].value;
      drag.value.parentIndex =
        drag.value.ref.parentNode.attributes['data-index'].value;
      drag.value.parent = getDataById(drag.value.parentId).value;
    }, delay);
  };

  const useOnDraging = (e: any, itemId: any) => {
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
          const itemRect = dropItem.value.getBoundingClientRect();
          dragOver.value.boundingTop = itemRect.top;
          dragOver.value.boundingBottom = itemRect.bottom;
          dragOver.value.boundingLeft = itemRect.left;
          dragOver.value.boundingRight = itemRect.right;

          if (
            drag.value.x >= itemRect.left &&
            drag.value.x <= itemRect.right &&
            drag.value.y >= itemRect.top &&
            drag.value.y <= itemRect.bottom &&
            isDraging.value == true
          ) {
            overlapItemId.value =
              dropItem.value.attributes['data-itemId'].value;
            drop.value.itemIndex =
              dropItem.value.attributes['data-index'].value;
            dragOver.value.itemId =
              dropItem.value.attributes['data-itemId'].value;
            dragOver.value.item = dropItem.value.attributes['data-item'].value;
            drop.value.parentId = dropItem.value.parentNode.classList[0];

            if (e.clientX) {
              if (overlapItemId.value == itemId) {
                if (
                  drag.value.y >= itemRect.top &&
                  drag.value.y <=
                    itemRect.bottom - (itemRect.bottom - itemRect.top) / 1.5
                ) {
                  isDropBefore.value = true;
                  isDropAfter.value = false;
                  isDropInside.value = false;
                } else if (
                  drag.value.y <= itemRect.bottom &&
                  drag.value.y >=
                    itemRect.top + (itemRect.bottom - itemRect.top) / 1.5
                ) {
                  isDropBefore.value = false;
                  isDropAfter.value = true;
                  isDropInside.value = false;
                } else {
                  isDropBefore.value = false;
                  isDropAfter.value = false;
                  isDropInside.value = true;
                }
              }
            } else {
              if (
                drag.value.y >= itemRect.top &&
                drag.value.y <=
                  itemRect.bottom - (itemRect.bottom - itemRect.top) / 1.5
              ) {
                isDropBefore.value = true;
                isDropAfter.value = false;
                isDropInside.value = false;
              } else if (
                drag.value.y <= itemRect.bottom &&
                drag.value.y >=
                  itemRect.top + (itemRect.bottom - itemRect.top) / 1.5
              ) {
                isDropBefore.value = false;
                isDropAfter.value = true;
                isDropInside.value = false;
              } else {
                isDropBefore.value = false;
                isDropAfter.value = false;
                isDropInside.value = true;
              }
            }
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
      drop.value.itemId = overlapItemId.value;
      drop.value.item = getDataById(drop.value.itemId);

      const dragItemData = getAddElementDataById(drag.value.itemId);
      const copyData = JSON.parse(JSON.stringify(dragItemData.value));

      if (isDropBefore.value && drop.value.itemId != 'root') {
        const dropItemData = getDataById(drop.value.parentId);
        dropItemData.value.children.splice(drop.value.itemIndex, 0, {
          ...copyData,
          id: uuidV4(),
        });
      }

      if (isDropAfter.value && drop.value.itemId != 'root') {
        const dropItemData = getDataById(drop.value.parentId);
        dropItemData.value.children.splice(drop.value.itemIndex + 1, 0, {
          ...copyData,
          id: uuidV4(),
        });
      }

      if (isDropInside.value) {
        drop.value.item.children.push({ ...copyData, id: uuidV4() });
      }

      overlapItemId.value = null;
      drag.value.itemId = null;
      isDragStart.value = false;
      isDraging.value = false;
      clearTimeout(longPress.value);

      return;
    }

    if (isDragAddNew.value === false) {
      drop.value.itemId = overlapItemId.value;
      drop.value.item = getDataById(drop.value.itemId);

      if (isDropBefore.value && drop.value.itemId != 'root') {
        if (drag.value.parentId == drop.value.parentId) {
          const dragParentData = getDataById(drag.value.parentId ?? '');
          const temp = JSON.parse(
            JSON.stringify(dragParentData.value.children[drag.value.itemIndex])
          );

          dragParentData.value.children.splice(drag.value.itemIndex, 1);
          if (drag.value.itemIndex < drop.value.itemIndex) {
            dragParentData.value.children.splice(drop.value.itemIndex - 1, 0, {
              ...temp,
            });
          } else {
            dragParentData.value.children.splice(drop.value.itemIndex, 0, {
              ...temp,
            });
          }
        } else {
          const dragParentData = getDataById(drag.value.parentId ?? '');
          const temp = JSON.parse(
            JSON.stringify(dragParentData.value.children[drag.value.itemIndex])
          );

          dragParentData.value.children.splice(drag.value.itemIndex, 1);

          const dropParentData = getDataById(drop.value.parentId);
          dropParentData.value.children.splice(drop.value.itemIndex, 0, {
            ...temp,
          });
        }
      }

      if (isDropAfter.value && drop.value.itemId != 'root') {
        if (drag.value.parentId == drop.value.parentId) {
          const dragParentData = getDataById(drag.value.parentId ?? '');
          const temp = JSON.parse(
            JSON.stringify(dragParentData.value.children[drag.value.itemIndex])
          );

          dragParentData.value.children.splice(drag.value.itemIndex, 1);
          if (drag.value.itemIndex < drop.value.itemIndex) {
            dragParentData.value.children.splice(drop.value.itemIndex, 0, {
              ...temp,
            });
          } else {
            dragParentData.value.children.splice(drop.value.itemIndex + 1, 0, {
              ...temp,
            });
          }
        } else {
          const dragParentData = getDataById(drag.value.parentId ?? '');
          const temp = JSON.parse(
            JSON.stringify(dragParentData.value.children[drag.value.itemIndex])
          );

          dragParentData.value.children.splice(drag.value.itemIndex, 1);

          const dropParentData = getDataById(drop.value.parentId);
          dropParentData.value.children.splice(drop.value.itemIndex + 1, 0, {
            ...temp,
          });
        }
      }

      if (isDropInside.value) {
        if (drag.value.parentId == drop.value.parentId) {
          const dragItemData = getDataById(drag.value.itemId);
          drop.value.item.children.push({ ...dragItemData.value });

          const dragParentData = getDataById(drag.value.parentId ?? '');
          dragParentData.value.children?.splice(
            Number(drag.value.itemIndex),
            1
          );
        } else {
          const dragParentData = getDataById(drag.value.parentId ?? '');
          const temp = JSON.parse(
            JSON.stringify(dragParentData.value.children[drag.value.itemIndex])
          );

          dragParentData.value.children.splice(drag.value.itemIndex, 1);

          const dropData = getDataById(drop.value.itemId);
          dropData.value.children.push({
            ...temp,
          });
        }
      }

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
    isDropAfter,
    isDropBefore,
    isDropInside,
    testItemId,
    isDragStart,
    isTouch,
    typographyFocus,
    useOnDragStart,
    useOnDragEnd,
    useOnDraging,
    onDragStart,
  };
};
