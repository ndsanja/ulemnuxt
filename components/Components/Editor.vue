<script setup lang="ts">

const { dataClasses } = useStore()
const { editorIsDragStart, editorIsDragging, editorIsDragEnd, editorIsDragOver, useEditorDragStart, useEditorDragMove, useEditorDragEnd } = useEditor()

interface Props {
  data: any
}

const props = defineProps<Props>()


</script>


<template>
  <ElementEditable v-for="(item, index) in props.data" :key="item.id" :dataItemProps="item" :id="item.id"
    @mousedown.self="useEditorDragStart($event, item.id)" @mousemove.self.prevent="useEditorDragMove"
    @mouseup="useEditorDragEnd" @touchstart.self.passive="useEditorDragStart($event, item.id)"
    @touchmove.self.prevent="useEditorDragMove" @touchend="useEditorDragEnd"
    :class="`absolute ${item.id != 'root' && editorIsDragging ? 'tw-cursor-move' : ''} ${dataClasses(item?.classes)}`">
    <ComponentsEditor :data="item.children" />
  </ElementEditable>
</template>

<style scoped></style>
