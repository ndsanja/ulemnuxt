const initial: ElementDataType[] = [
  {
    id: 'root',
    elName: 'root',
    isRoot: true,
    parentId: '',
    currentIndex: null,
    elKind: 'div',
    content: 'root',
    elId: '',
    classes: {
      xs: 'bg-white h-full w-full pb-4',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      xxl: '',
    },
    css: '',
    children: [],
  },
];

const sectionData = [
  {
    id: 'section',
    elName: 'section',
    isRoot: false,
    parentId: '',
    currentIndex: null,
    elKind: 'div',
    content: 'section',
    elId: '',
    classes: {
      xs: 'bg-green-500 min-h-[100px] min-w-[300px] w-full',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      xxl: '',
    },
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
    classes: {
      xs: 'container mx-auto bg-cyan min-h-[100px] min-w-[300px]',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      xxl: '',
    },
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
    classes: {
      xs: 'flex bg-red min-h-[100px] min-w-[300px] w-full',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      xxl: '',
    },
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
    classes: {
      xs: 'grid bg-yellow min-h-[100px] min-w-[300px] w-full',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      xxl: '',
    },
    css: '',
    children: [],
  },
];

type Classes = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};
type ElementDataType = {
  id: any;
  elName: string;
  isRoot: boolean;
  parentId: any;
  currentIndex: any;
  elKind: string;
  content: string;
  elId: string;
  classes: Classes;
  css: any;
  children: ElementDataType[];
};

export const useStore = () => {
  const data = useState<ElementDataType[]>('data', () => initial);
  const addElementData = useState<ElementDataType[]>(
    'element-data',
    () => sectionData
  );

  const id = useState('id', () => '');
  const idFromDrag = useState('id-from-drag', () => '');
  const currentIndex = useState('current-index', () => 0);
  const currentParentId = useState('current-parent-id', () => '');
  const hoverId = useState('hover-id', () => '');
  const activeId = useState('active-id', () => '');
  const isDragAddNew = useState('drag-add-new', () => false);

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

  const displaySize = useState('display-size', () => 0);

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
    getElementById,
    getDataById,
    getAddElementDataById,
    dataById,
    displaySize,
    xs,
    sm,
    md,
    lg,
    xl,
  };
};
