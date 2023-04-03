<script setup lang="ts">
import { UseDraggable as Draggable } from '@vueuse/components'

const { id, xs, sm, md, lg, xl } = useStore()
const { useOnDrag, useOnDragEnter, useOnDragEnd, useOnDragLeave, useOnDragOver, useOnDragStart, useOnDrop, useOnTouchStart, useOnTouchMove } = useDragAndDrop()
interface Props {
  data: any
}

const props = defineProps<Props>()
const refs = ref<any>(null)

const positionX = ref()
const positionY = ref()

const onMouseDown = (e: any, isRoot: boolean) => {
  refs.value = e.target
  // positionX.value = e.clientX
  // positionY.value = e.clientY

  if (!isRoot) {
    refs.value.style.position = 'fixed'
    refs.value.style.left = positionX.value + 'px'
    refs.value.style.top = positionY.value + 'px'
  }

  // console.log(positionX.value, positionY.value);
  // console.log(e);
  // console.log(e.target);
}

const onMouseMove = (e: any) => {
  if (e.clientX) {
    positionX.value = e.clientX
    positionY.value = e.clientY


    refs.value.style.left = positionX.value - refs.value.clientWidth / 2 + 'px'
    refs.value.style.top = positionY.value - refs.value.clientHeight / 2 + 'px'
  } else {
    positionX.value = e.changedTouches[0].clientX
    positionY.value = e.changedTouches[0].clientY
    refs.value.style.left = positionX.value - refs.value.clientWidth / 2 + 'px'
    refs.value.style.top = positionY.value - refs.value.clientHeight / 2 + 'px'
  }

}


const onMouseUp = (e: any) => {
  refs.value = null
}


</script>


<template>
  <Element v-for="(item, index ) in props.data" :key="item.id" :draggable="item.isRoot ? false : true"
    :class="xl ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md} ${item.classes.lg} ${item.classes.xl}` : lg ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md} ${item.classes.lg}` : md ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md}` : sm ? `${item.classes.xs} ${item.classes.sm}` : item.classes.xs"
    @click.self="id = item.id" :data-item="JSON.stringify(item)" :data-itemId="item.id" :data-index="index"
    :data-parentId="item.parentId" :elements-data="item" @mousedown.self.prevent="onMouseDown($event, item.isRoot)"
    @mousemove.self.prevent="onMouseMove($event)" @mouseup.self.prevent="onMouseUp($event)"
    @touchstart.self.prevent="onMouseDown($event, item.isRoot)" @touchmove.self.prevent="onMouseMove($event)"
    @touchend.self.prevent="onMouseUp($event)">
    <ComponentsTest v-if="item.children?.length" :data="item.children ?? []" />
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
