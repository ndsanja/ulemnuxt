export const useEditor = () => {
  const editorIsDragStart = useState('is-drag-start', () => false);
  const editorIsDragging = useState('is-dragging', () => false);
  const editorIsDragEnd = useState('is-drag-end', () => false);
  const editorIsDragOver = useState('is-drag-over', () => false);
  const editorIsDragCancel = useState('is-drag-cancel', () => false);
  const editorItemId = useState('item-id', () => '');

  const useEditorDragStart = (e: any, id: any) => {
    editorIsDragStart.value = true;
    editorIsDragging.value = false;
    editorIsDragEnd.value = false;
    editorIsDragOver.value = false;
    editorIsDragCancel.value = false;
    editorItemId.value = id;
  };

  const useEditorDragMove = (e: any) => {
    if (!editorIsDragStart.value) return;
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
    useEditorDragStart,
    useEditorDragMove,
    useEditorDragEnd,
  };
};
