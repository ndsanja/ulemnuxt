export const useEditor = () => {
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
      editorDragItem.value.attributes['data-item-id'].value;
  };

  const useEditorDragMove = (e: any) => {
    if (
      !editorIsDragStart.value ||
      editorItemId.value == 'root' ||
      editorDragItem.value.attributes?.['data-el-kind']?.value == 'section'
    )
      return;
    editorIsDragging.value = true;
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

  const useEditorDragEnd = (e: any) => {
    editorDropItem.value = e.target;

    editorIsDragStart.value = false;
    editorIsDragging.value = false;
    editorIsDragEnd.value = true;
    editorIsDragOver.value = false;
    editorIsDragCancel.value = false;
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
    useEditorDragStart,
    useEditorDragMove,
    useEditorDragEnd,
  };
};
