const initial: ElementDataType[] = [];

const sectionData = [
  {
    id: 'section',
    isRoot: false,
    parentId: '',
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
    isRoot: false,
    parentId: '',
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
    isRoot: false,
    parentId: '',
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
    isRoot: false,
    parentId: '',
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
  isRoot: boolean;
  parentId: any;
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

  const id = useState('id', () => 1);
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
