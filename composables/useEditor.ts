import { v4 as uuidv4 } from 'uuid';

type ElementDataType = {
  id: any;
  elName: string;
  isRoot: boolean;
  parentId: any;
  currentIndex: any;
  elKind: string;
  content: string;
  elId: string;
  classes: string;
  css: any;
  children: ElementDataType[];
};

export const useEditor = () => {
  const { data } = useStore();

  const editorIsDragStart = useState('is-drag-start', () => false);
  const editorIsDragging = useState('is-dragging', () => false);
  const editorIsDragEnd = useState('is-drag-end', () => false);
  const editorIsDragOver = useState('is-drag-over', () => false);
  const editorIsDragCancel = useState('is-drag-cancel', () => false);
  const editorItemId = useState('item-id', () => '');
  const editorParentSection = useState('parent-section', () => '');
  const editorItemActiveId = useState<any>('active-id', () => '');
  const editorItemSelectedId = useState<any>('active-id', () => '');
  const editorItemHoverId = useState<any>('hover-id', () => '');
  const editorDragItem = useState<any>('drag-item', () => null);
  const editorDropItem = useState<any>('drop-item', () => null);
  const editorDragOverItem = useState<any>('drag-over-item', () => null);

  const useEditorDragStart = (e: any, id: any) => {
    editorIsDragStart.value = true;
    editorIsDragging.value = false;
    editorIsDragEnd.value = false;
    editorIsDragOver.value = false;
    editorIsDragCancel.value = false;

    editorItemId.value = id;

    editorItemActiveId.value = id;
    editorItemSelectedId.value = id;
    editorDragItem.value = e.target;
    editorParentSection.value =
      editorDragItem.value.parentNode?.attributes?.['data-item-id']?.value;

    document
      .querySelector(`[data-item-id="${editorParentSection.value}"]`)
      ?.classList.add('selected');
  };

  const useEditorDragMove = (e: any) => {
    if (
      !editorIsDragStart.value ||
      editorItemId.value == 'root' ||
      editorDragItem.value.attributes?.['data-el-kind']?.value == 'section'
    )
      return;
    editorIsDragging.value = true;

    document
      .querySelector(`[data-item-id="${editorItemSelectedId.value}"]`)
      ?.classList.remove('selected');

    document
      .querySelector(`[data-item-id="${editorItemSelectedId.value}"]`)
      ?.classList.remove('hovered');

    // @ts-ignore
    $(function () {
      // // @ts-ignore
      // $('#draggable').draggable({ snap: true });
      // // @ts-ignore
      // $('#draggable2').draggable({ snap: '.ui-widget-header' });
      // // @ts-ignore
      // $('#draggable3').draggable({
      //   snap: '.ui-widget-header',
      //   snapMode: 'outer',
      // });
      // // @ts-ignore
      // $('#draggable4').draggable({ grid: [4, 4] });
      // @ts-ignore
      $(`#${editorItemId.value}`).draggable({ grid: [4, 4] });
    });
  };

  const getElementById = (elementId: any, data: ElementDataType[]) => {
    let resultElement: ElementDataType | any = {};

    data.some(function iter(element: ElementDataType) {
      if (element.id == elementId) {
        resultElement = element;
        return true;
      }
      return Array.isArray(element.children) && element.children.some(iter);
    });
    return resultElement;
  };

  const useEditorDragEnd = (e: any) => {
    editorDropItem.value = e.target;

    editorIsDragStart.value = false;
    editorIsDragging.value = false;
    editorIsDragEnd.value = true;
    editorIsDragOver.value = false;
    editorIsDragCancel.value = false;
  };

  const editorItemById = computed<ElementDataType | any>(() =>
    getElementById(editorItemSelectedId.value, data.value)
  );

  const editorGettDataById = (id: any) => {
    return computed<ElementDataType | any>(() =>
      getElementById(id, data.value)
    );
  };

  const editorOrderedSection = (index: any, position: any) => {
    let temp = JSON.parse(
      JSON.stringify(editorGettDataById(editorItemActiveId.value).value)
    );

    let parentSection = editorGettDataById('root').value;

    if (position == 'after') {
      parentSection.children.splice(Number(index), 1);
      parentSection.children.splice(Number(index) + 1, 0, { ...temp });
    }
    if (position == 'before') {
      parentSection.children.splice(Number(index), 1);
      parentSection.children.splice(Number(index) - 1, 0, { ...temp });
    }
  };

  const editorAddSection = (index: any, position: any) => {
    let section = {
      id: '1',
      elName: 'section 1',
      isRoot: false,
      parentId: '',
      currentIndex: null,
      elKind: 'section',
      content: 'section',
      elId: '',
      classes: 'h-[300px] w-[100%] relative',
      css: '',
      children: [],
    };
    if (position == 'before') {
      editorGettDataById('root').value.children.splice(Number(index), 0, {
        ...section,
        id: uuidv4(),
      });
    }
    if (position == 'after') {
      editorGettDataById('root').value.children.splice(Number(index) + 1, 0, {
        ...section,
        id: uuidv4(),
      });
    }
  };

  const editorDeleteSection = (index: any) => {
    editorGettDataById('root').value.children.splice(Number(index), 1);
  };

  const changeIdObj = (obj: any, newId: any) => {
    obj.id = newId;
    obj.children.forEach((item: any) => {
      changeIdObj(item, newId);
    });
  };

  const editorDuplicateSection = (index: any) => {
    let duplicated = JSON.parse(
      JSON.stringify(editorGettDataById(editorItemSelectedId.value).value)
    );

    editorGettDataById('root').value.children.splice(Number(index) + 1, 0, {
      ...duplicated,
      id: uuidv4(),
      children: duplicated.children.map((e: any) => {
        return { ...e, id: uuidv4() };
      }),
    });
  };

  return {
    editorIsDragStart,
    editorIsDragging,
    editorIsDragOver,
    editorIsDragEnd,
    editorIsDragCancel,
    editorItemId,
    editorItemActiveId,
    editorItemSelectedId,
    editorItemHoverId,
    editorDragItem,
    editorDropItem,
    editorDragOverItem,
    editorItemById,
    editorDuplicateSection,
    editorDeleteSection,
    editorAddSection,
    editorOrderedSection,
    editorGettDataById,
    useEditorDragStart,
    useEditorDragMove,
    useEditorDragEnd,
  };
};
