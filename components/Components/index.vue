<script setup lang="ts">
import { UseDraggable as Draggable } from '@vueuse/components'

const { id, xs, sm, md, lg, xl } = useStore()
const { useOnDrag, useOnDragEnter, useOnDragEnd, useOnDragLeave, useOnDragOver, useOnDragStart, useOnDrop, useOnTouchStart, useOnTouchMove } = useDragAndDrop()
interface Props {
  data: any
}
const props = defineProps<Props>()

const positionX = ref()
const positionY = ref()

const updateXY = (x: any, y: any) => {
  positionX.value = x
  positionY.value = y
}
</script>


<template>
  <Element v-for="(item, index ) in props.data" :key="item.id" :draggable="item.isRoot ? false : true"
    :class="xl ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md} ${item.classes.lg} ${item.classes.xl}` : lg ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md} ${item.classes.lg}` : md ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md}` : sm ? `${item.classes.xs} ${item.classes.sm}` : item.classes.xs"
    @click.self="id = item.id" :data-item="JSON.stringify(item)" :data-itemId="item.id" :data-index="index"
    :data-parentId="item.parentId" :elements-data="item" @dragstart.self="useOnDragStart($event, false)"
    @drag.self.prevent="useOnDrag($event)" @drop.self.prevent="useOnDrop($event)"
    @dragover.self.prevent="useOnDragOver($event)" @dragenter.self.prevent="useOnDragEnter($event)"
    @dragleave.self.prevent="useOnDragLeave($event)" @dragend.self.prevent="useOnDragEnd($event)"
    @touchstart.self.prevent="useOnTouchStart($event, false)" @touchmove.self.prevent="useOnTouchMove($event)"
    @touchend.self.prevent="useOnDrop($event)">
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

.ontouch {
  position: fixed;
  background: salmon !important;
}

.tets {}
</style>
