<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

const { id, xs, sm, md, lg, xl, getDataById, hoverId, activeId, currentIndex, currentParentId, handleDelete, handleDuplicate } = useStore()
const { drag, dragOver, drop, useOnDragStart, useOnDragEnd, useOnDraging, isDraging, overlapItemId, dragItemId } = useDragAndDrop()


interface Props {
  data: any
}

const props = defineProps<Props>()

const dataClasses = (item: any) => {
  return xl ? `${item?.classes?.xs} ${item?.classes?.sm} ${item?.classes?.md} ${item?.classes?.lg} ${item?.classes?.xl}` : lg ? `${item?.classes?.xs} ${item?.classes?.sm} ${item?.classes?.md} ${item?.classes?.lg}` : md ? `${item?.classes?.xs} ${item?.classes?.sm} ${item?.classes?.md}` : sm ? `${item?.classes?.xs} ${item?.classes?.sm}` : item?.classes?.xs
}

const handleCLick = (e: any, elId: any) => {
  id.value = elId
  activeId.value = elId

  if (elId == 'root') {
    isDraging.value = false
  }
}

const handleDragOver = (e: any) => {
  console.log(e);
}

const handleMouseOver = (e: any, itemId: any) => {
  hoverId.value = itemId

}
</script>

<template>
  <Element v-for="(item, index) in data" :key="item.id" :data-itemId="item.id" :data-item="JSON.stringify(item)"
    :data-index="index" draggable="true" @click.self.prevent="handleCLick($event, item.id)"
    @mousedown.self.prevent="useOnDragStart($event, item, index, false)" @mousemove.self.prevent="useOnDraging"
    @mouseup.self.prevent="useOnDragEnd" @touchstart.self.prevent="useOnDragStart($event, item, index, false)"
    @touchmove.self.prevent="useOnDraging" @touchend.self.prevent="useOnDragEnd"
    @mouseover.self.prevent="handleMouseOver($event, item.id)"
    :class="`${dataClasses(item)} ${hoverId == item.id && `hover:outline hover:outline-offset-1 hover:outline-2 hover:outline-green-500`} ${activeId == item.
      id && `outline outline-offset-1 outline-2 outline-green-500 relative`} ${overlapItemId == item.id && 'dropTarget'} ${drag.itemId == item.id && 'dragItem'}`" class="">

    <div v-if="activeId == item.id || hoverId == item.id"
      class="absolute min-w-[20px] min-h-[20px] px-1 bg-green-500 border border-white -top-[21px] left-0 z-40 text-[11px] flex items-center justify-center">
      <p>{{ item.elName }}</p>
    </div>

    <div v-if="activeId == item.id"
      class="absolute min-w-[20px] h-[28px] px-1 bg-green-500 border border-white -top-[29px] right-0 z-40 flex items-center justify-between gap-2">

      <div>
        <Icon name="fluent:add-square-24-regular" class="text-24px cursor-pointer"
          @click.self="handleDuplicate(item.id)" />
      </div>
      <div class="h-28px w-1px bg-white"></div>
      <div>
        <Icon name="fluent:settings-24-regular" class="text-24px cursor-pointer" @click.self="handleDelete(index)" />
      </div>

    </div>

    <ComponentsEditable :data="item.children" />
  </Element>
</template>

<style scoped>
.dropTarget {
  outline: 3px blue solid;
  outline-offset: 2px;
  cursor: move;
}

.dragItem {
  position: relative !important;
  cursor: move;
}

.dragItem::after {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: white;
  opacity: 0.60;
  position: absolute;
}
</style>