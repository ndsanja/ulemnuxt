<script setup lang="ts">
import { UseDraggable as Draggable } from '@vueuse/components'

const { id, xs, sm, md, lg, xl, getDataById } = useStore()
const { useOnDrag, useOnDragEnter, useOnDragEnd, useOnDragLeave, useOnDragOver, useOnDragStart, useOnDrop, useOnTouchStart, useOnTouchMove } = useDragAndDrop()
interface Props {
  data: any
}



const props = defineProps<Props>()
const refs = ref<any>(null)
const dragItem = ref<any>(null)
const dragItemId = ref<any>(null)
const dragParentId = ref<any>(null)
const dragIndex = ref<any>(null)
const dropItemId = ref<any>(null)

const positionX = ref()
const positionY = ref()

const onMouseDown = (e: any, isRoot: boolean) => {
  refs.value = e.target
  // positionX.value = e.clientX
  // positionY.value = e.clientY
  dragItem.value = ref<any>(refs.value.attributes['data-item'].value)
  dragItemId.value = ref<any>(refs.value.attributes['data-itemId'].value)
  dragParentId.value = ref<any>(refs.value.attributes['data-parentId'].value)
  dragIndex.value = ref<any>(refs.value.attributes['data-index'].value)

  // if (!isRoot) {
  //   // refs.value.style.display = 'none'
  // }
  // refs.value.style.left = positionX.value + 'px'
  // refs.value.style.top = positionY.value + 'px'
  refs.value.style.cursor = 'move'

  // console.log(positionX.value, positionY.value);
  // console.log(e);
  // console.log(e.target);
  // console.log(refs.value.attributes['data-item']);
  console.log(dragItem.value.value);
  console.log(dragItemId.value.value);
  console.log(dragParentId.value.value);
  console.log(dragIndex.value.value);
}

const onMouseMove = (e: any, isRoot: boolean) => {
  // if (!isRoot) {

  //   positionX.value = e.clientX
  //   positionY.value = e.clientY
  //   refs.value.style.left = positionX.value - refs.value.clientWidth / 2 + 'px'
  //   refs.value.style.top = positionY.value - refs.value.clientHeight / 2 + 'px'
  //   if (e.clientX) {
  //     positionX.value = e.clientX
  //     positionY.value = e.clientY
  //     refs.value.style.left = positionX.value - refs.value.clientWidth / 2 + 'px'
  //     refs.value.style.top = positionY.value - refs.value.clientHeight / 2 + 'px'
  //   } else {
  //     positionX.value = e.changedTouches[0].clientX
  //     positionY.value = e.changedTouches[0].clientY
  //     refs.value.style.left = positionX.value - refs.value.clientWidth / 2 + 'px'
  //     refs.value.style.top = positionY.value - refs.value.clientHeight / 2 + 'px'
  //   }
  // }

}


const onMouseUp = (e: any) => {

  dropItemId.value = e.target.attributes['data-itemId'].value
  // console.log(dropItemId.value);

  const dropData = getDataById(dropItemId.value).value;
  const dragData = JSON.parse(dragItem.value.value);

  console.log('dropData', dropData.id);
  console.log('dragData', dragData.id);


  // isOnDrag.value = false;

  if (dropItemId.value == dragItemId.value.value) return;


  if (dragParentId.value.value !== dropItemId.value) {
    dropData.children?.push({
      ...dragData,
      parentId: dropItemId.value,
    });

    const removeItemFromParentOrigin = getDataById(
      dragParentId.value.value ?? ''
    );
    removeItemFromParentOrigin.value.children?.splice(dragIndex.value, 1);
  }

  // e.target.classList.remove('dragging');
  // e.target.classList.remove('dragover');
  // e.target.classList.remove('ondrag');
  // e.target.classList.remove('dragover');
  // refs.value = null
}


const onMouseEnter = (e: any) => {
  e.target.classList.add('dragover');

};

const onMouseOver = (e: any) => {
  e.target.classList.add('dragover');

};

const onMouseLeave = (e: any) => {
  e.target.classList.remove('dragover');
};

const onMouseOut = (e: any) => {
  e.target.classList.remove('dragging');
  e.target.classList.remove('dragover');
  e.target.classList.remove('ondrag');
};


</script>


<template>
  <Element v-for="(item, index ) in props.data" :key="item.id" :draggable="item.isRoot ? false : true"
    :class="xl ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md} ${item.classes.lg} ${item.classes.xl}` : lg ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md} ${item.classes.lg}` : md ? `${item.classes.xs} ${item.classes.sm} ${item.classes.md}` : sm ? `${item.classes.xs} ${item.classes.sm}` : item.classes.xs"
    @click.self="id = item.id" :data-item="JSON.stringify(item)" :data-itemId="item.id" :data-index="index"
    :data-parentId="item.parentId" :elements-data="item" @mousedown.self.prevent="onMouseDown($event, item.isRoot)"
    @mouseup.self.prevent="onMouseUp($event)">
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
