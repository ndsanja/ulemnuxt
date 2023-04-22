<script setup lang="ts">

const { dataClasses } = useStore()
const { editorIsDragStart, editorIsDragging, editorIsDragEnd, editorIsDragOver, useEditorDragStart, useEditorDragMove, useEditorDragEnd, editorItemHoverId, editorItemSelectedId } = useEditor()

interface Props {
  data: any
}

const props = defineProps<Props>()

const handleMouseOver = (id: any) => {
  editorItemHoverId.value = id
}

</script>


<template>
  <ElementEditable v-for="(item, index) in  props.data " :key="item.id" :dataItemProps="item" :id="item.id"
    :data-el-kind="item.elKind" :data-item-id="item.id" @mouseover.self="handleMouseOver(item.id)"
    @mousedown.self.prevent="useEditorDragStart($event, item.id)" @mousemove.self.prevent="useEditorDragMove"
    @mouseup.self.prevent="useEditorDragEnd" @touchstart.self.passive="useEditorDragStart($event, item.id)"
    @touchmove.self.prevent="useEditorDragMove" @touchend.self.prevent="useEditorDragEnd"
    :class="`${dataClasses(item?.classes)} ${editorItemSelectedId == item.id && !editorIsDragging ? 'selected' : ''} ${editorItemHoverId == item.id && 'hovered'} ${editorIsDragStart && editorItemSelectedId == item.id && item.elKind != 'section' && item.id != 'root' ? 'dragging' : ''}`">
    <ComponentsEditor :data="item.children" />
  </ElementEditable>
</template>

<style scoped>
.selected {
  outline: 1px blue solid;
  outline-offset: 1px;
}

.dragging {
  cursor: move;
  opacity: 0.8;
  position: absolute;
}

.hovered {
  outline: 1px blue solid;
  outline-offset: 1px;
}
</style>
