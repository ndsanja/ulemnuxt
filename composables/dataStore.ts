import { v4 as uuidv4 } from 'uuid';

const initial = [
  {
    id: 'root',
    elName: 'root',
    isRoot: true,
    parentId: '',
    currentIndex: null,
    elKind: 'div',
    content: 'root',
    elId: '',
    classes: 'thisRoot p-2 bg-white h-full w-full relative pb-100px',
    css: '',
    children: [
      {
        id: '1',
        elName: 'section 1',
        isRoot: false,
        parentId: '',
        currentIndex: null,
        elKind: 'div',
        content: 'section',
        elId: '',
        classes:
          'bg-green-500 sm:bg-blue-500 md:bg-yellow-500 lg:bg-red-500 xl:bg-black p-2 min-h-[100px] min-w-[300px] w-full',
        css: '',
        children: [],
      },
      {
        id: '2',
        elName: 'section 2',
        isRoot: false,
        parentId: '',
        currentIndex: null,
        elKind: 'section',
        content: 'section',
        elId: '',
        classes: 'bg-red-500 p-2 min-h-[100px] min-w-[300px] w-full',
        css: '',
        children: [
          {
            id: '3',
            elName: 'section 3',
            isRoot: false,
            parentId: '',
            currentIndex: null,
            elKind: 'div',
            content: 'section',
            elId: '',
            classes: 'bg-yellow-500 p-2 min-h-[100px] min-w-[300px] w-full',
            css: '',
            children: [],
          },
        ],
      },
      {
        id: '4',
        elName: 'section 4',
        isRoot: false,
        parentId: '',
        currentIndex: null,
        elKind: 'div',
        content: 'section',
        elId: '',
        classes: 'bg-blue-500 p-2 min-h-[100px] min-w-[300px] w-full',

        css: '',
        children: [],
      },
      {
        id: '5',
        elName: 'paragraph',
        isRoot: false,
        parentId: '',
        currentIndex: null,
        elKind: 'p',
        content: 'Hello World',
        elId: '5',
        classes: 'text-3xl text-red-500',

        css: '',
        children: [],
      },
      {
        id: '6',
        elName: 'heading 1',
        isRoot: false,
        parentId: '',
        currentIndex: null,
        elKind: 'h1',
        content: 'untuk konten',
        elId: '6',
        classes: 'text-3xl text-blue-500',

        css: '',
        children: [],
      },
    ],
  },
];

const sectionData = [
  {
    id: 'section',
    elName: 'section',
    isRoot: false,
    parentId: '',
    currentIndex: null,
    elKind: 'section',
    content: 'section',
    elId: '',
    classes: 'bg-green-500 min-h-[100px] min-w-[300px] w-full',
    css: '',
    children: [],
  },
  {
    id: 'container',
    elName: 'container',
    isRoot: false,
    parentId: '',
    currentIndex: null,
    elKind: 'div',
    content: 'container',
    elId: '',
    classes: 'container mx-auto bg-cyan min-h-[100px] min-w-[300px]',
    css: '',
    children: [],
  },
  {
    id: 'flex',
    elName: 'flex',
    isRoot: false,
    parentId: '',
    currentIndex: null,
    elKind: 'div',
    content: 'flex',
    elId: '',
    classes: 'flex bg-red min-h-[100px] min-w-[300px] w-full',
    css: '',
    children: [],
  },
  {
    id: 'grid',
    elName: 'grid',
    isRoot: false,
    parentId: '',
    currentIndex: null,
    elKind: 'div',
    content: 'grid',
    elId: '',
    classes: 'grid bg-yellow min-h-[100px] min-w-[300px] w-full',
    css: '',
    children: [],
  },
];

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

export const useStore = () => {
  const { display } = useStateUiBuilder();

  const data = useState<ElementDataType[]>('data', () => initial);
  const addElementData = useState<ElementDataType[]>(
    'element-data',
    () => sectionData
  );

  const id = useState('id', () => '1');
  const idFromDrag = useState('id-from-drag', () => '');
  const currentIndex = useState('current-index', () => 0);
  const currentParentId = useState('current-parent-id', () => '');
  const hoverId = useState('hover-id', () => '');
  const activeId = useState('active-id', () => '');
  const isDragAddNew = useState('drag-add-new', () => false);
  const currentData = useState<any>('current-data', () => null);
  const currentParentData = useState<any>('current-parent-data', () => null);
  const contentLen = useState<any>('contentLen', () => 0);
  const textContent = useState<any>('textContent', () => '');
  const fontContent = useState<any>('fontContent', () => '30px Arial');
  const textWidth = useState<any>('textWidth', () => 0);
  const displaySize = useState('display-size', () => 0);

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

  const dataById = computed<ElementDataType | any>(() =>
    getElementById(id.value, data.value)
  );

  const getDataById = (id: any) => {
    return computed<ElementDataType | any>(() =>
      getElementById(id, data.value)
    );
  };
  const getAddElementDataById = (id: any) => {
    return computed<ElementDataType | any>(() =>
      getElementById(id, addElementData.value)
    );
  };

  const xs = computed(() => displaySize.value < Breakpoints.sm);
  const sm = computed(
    () =>
      displaySize.value >= Breakpoints.sm && displaySize.value < Breakpoints.md
  );
  const md = computed(
    () =>
      displaySize.value >= Breakpoints.md && displaySize.value < Breakpoints.lg
  );
  const lg = computed(
    () =>
      displaySize.value >= Breakpoints.lg && displaySize.value < Breakpoints.xl
  );
  const xl = computed(() => displaySize.value >= Breakpoints.xl);

  const handleDelete = (index: any) => {
    const currentParentData = getDataById(currentParentId.value);
    currentParentData.value.children?.splice(Number(index), 1);
  };

  const changeIdObj = (obj: any, newId: any) => {
    obj.id = newId;
    obj.children.forEach((item: any) => {
      changeIdObj(item, newId);
    });
  };
  const handleDuplicate = (elId: any) => {
    const currentData = getDataById(elId);
    const copyCurrentData = JSON.parse(JSON.stringify(currentData.value));
    const currentParentData = getDataById(currentParentId.value);

    currentParentData.value.children.push({
      ...copyCurrentData,
      id: uuidv4(),
    });
  };

  const filterClasses = (classes: any, filtered: any) => {
    return classes
      .replaceAll('\n', ' ')
      .split(' ')
      .filter((e: any) => e.startsWith(filtered))
      .join(' ');
  };

  const baseClasses = (classes: any) => {
    return classes
      .replaceAll('\n', ' ')
      .split(' ')
      .filter(
        (e: any) =>
          !e.startsWith('sm:') &&
          !e.startsWith('md:') &&
          !e.startsWith('lg:') &&
          !e.startsWith('xl:')
      )
      .join(' ');
  };
  const dataClasses = (classes: any) => {
    if (xl.value) {
      return `${baseClasses(classes)} ${filterClasses(
        classes,
        'sm:'
      )} ${filterClasses(classes, 'md:')} ${filterClasses(
        classes,
        'lg:'
      )} ${filterClasses(classes, 'xl:')}`;
    }
    if (lg.value) {
      return `${baseClasses(classes)} ${filterClasses(
        classes,
        'sm:'
      )} ${filterClasses(classes, 'md:')} ${filterClasses(classes, 'lg:')}`;
    }
    if (md.value) {
      return `${baseClasses(classes)} ${filterClasses(
        classes,
        'sm:'
      )} ${filterClasses(classes, 'md:')}`;
    }
    if (sm.value) {
      return `${baseClasses(classes)} ${filterClasses(classes, 'sm:')}`;
    }
    if (xs.value) {
      return `${baseClasses(classes)}`;
    }
  };

  function getTextWidth(text: any, font: any) {
    // create an offscreen element
    const element = document.createElement('canvas');
    const context = element.getContext('2d');
    if (context) {
      context.font = font;
    }
    const width = context?.measureText(text).width;

    textContent.value = text;
    fontContent.value = font;
    textWidth.value = width;
    // return the width of the text
    return width;
  }

  return {
    data,
    addElementData,
    id,
    isDragAddNew,
    hoverId,
    activeId,
    currentIndex,
    currentParentId,
    idFromDrag,
    currentData,
    currentParentData,
    contentLen,
    textContent,
    fontContent,
    textWidth,
    getTextWidth,
    getElementById,
    getDataById,
    getAddElementDataById,
    handleDelete,
    handleDuplicate,
    dataClasses,
    filterClasses,
    baseClasses,
    dataById,
    displaySize,
    xs,
    sm,
    md,
    lg,
    xl,
  };
};
