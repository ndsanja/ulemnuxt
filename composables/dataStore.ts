const initial: ElementDataType[] = [
  {
    id: '0',
    isRoot: true,
    parentId: '0',
    elKind: 'div',
    content: 'div 2',
    elId: '',
    classes: {
      xs: 'min-h-screen h-full w-full bg-blue-300',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      xxl: '',
    },
    css: '',
    children: [
      {
        id: '1',
        isRoot: false,
        parentId: '0',
        elKind: 'div',
        content: 'div 1',
        elId: '',
        classes: {
          xs: 'bg-red-500 min-h-[100px] min-w-[300px] p-4 border border-blue',
          sm: 'sm:bg-blue-500',
          md: 'md:bg-green-500',
          lg: 'lg:bg-black',
          xl: 'xl:bg-indigo-500',
          xxl: '2xl:bg-yellow-500',
        },
        css: '',
        children: [
          {
            id: '1.1',
            isRoot: false,
            parentId: '1',
            elKind: 'div',
            content: 'div 2',
            elId: '',
            classes: {
              xs: 'bg-red-500 min-h-[100px] min-w-[300px] p-4 border border-blue',
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
            id: '1.2',
            isRoot: false,
            parentId: '1',
            elKind: 'div',
            content: 'div 2',
            elId: '',
            classes: {
              xs: 'bg-red-500 min-h-[100px] min-w-[300px] p-4 border border-blue',
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
            id: '1.3',
            isRoot: false,
            parentId: '1',
            elKind: 'div',
            content: 'div 2',
            elId: '',
            classes: {
              xs: 'bg-red-500 min-h-[100px] min-w-[300px] p-4 border border-blue',
              sm: '',
              md: '',
              lg: '',
              xl: '',
              xxl: '',
            },
            css: '',
            children: [],
          },
        ],
      },
      {
        id: '2',
        isRoot: false,
        parentId: '0',
        elKind: 'div',
        content: 'div 3',
        elId: '',
        classes: {
          xs: 'bg-yellow-500 min-h-[100px] min-w-[300px] p-4 border border-blue',
          sm: '',
          md: '',
          lg: '',
          xl: '',
          xxl: '',
        },
        css: '',
        children: [],
      },
    ],
  },
];

const sectionData = [
  {
    id: 'section-1',
    isRoot: false,
    parentId: '',
    elKind: 'div',
    content: 'section 1',
    elId: '',
    classes: {
      xs: 'bg-green-500 min-h-[100px] min-w-[300px] p-4 border border-blue',
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
