<script setup lang="ts">
const { id, xs, sm, md, lg, xl } = useStore()
const { useOnDrag, useOnDragEnter, useOnDragEnd, useOnDragLeave, useOnDragOver, useOnDragStart, useOnDrop, isOnDrag } = useDragAndDrop()
interface Props {
  data: any
}
const props = defineProps<Props>()

</script>


<template>
  <Element v-for="(item, index ) in props.data" :key="item.id"
    :class="xl ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md} ${item.classes.lg} ${item.classes.xl}` : lg ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md} ${item.classes.lg}` : md ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md}` : sm ? `${item.classes.xs} ${item.classes.sm}` : item.classes.xs"
    @click.self="id = item.id" :data-item="JSON.stringify(item)" :data-itemId="item.id" :data-index="index"
    :data-parentId="item.parentId" :elements-data="item" :draggable="`${item.isRoot ? false : true}`"
    @dragstart.self="useOnDragStart($event, false)" @drag.self.prevent="useOnDrag($event)"
    @drop.self.prevent="useOnDrop($event)" @dragover.self.prevent="useOnDragOver($event)"
    @dragenter.self.prevent="useOnDragEnter($event)" @dragleave.self.prevent="useOnDragLeave($event)"
    @dragend.self.prevent="useOnDragEnd($event)">
    <Components v-if="item.children?.length" :data="item.children ?? []" />
  </Element>
</template>

<style>
.dragging {
  background: salmon !important;
}

.dragover {
  background: gray !important;
}

.ondrag {
  display: none;
}

.tets {}
</style>
