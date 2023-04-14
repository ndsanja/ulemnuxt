<script setup lang="ts">

const { id, sm, md, lg, xl, hoverId, activeId, handleDelete } = useStore()
const { drag, useOnDragStart, useOnDragEnd, useOnDraging, isDraging, overlapItemId, testItemId, isDropAfter, isDropBefore, isDropInside } = useDragAndDrop()


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


const handleMouseOver = (e: any, itemId: any) => {
  hoverId.value = itemId

}
</script>

<template>
  <Element v-for="(item, index) in props.data" :key="item.id" :dataItemProps="item" :data-itemId="item.id"
    :data-item="JSON.stringify(item)" :data-index="index" draggable="true"
    @click.self.prevent="handleCLick($event, item.id)"
    @mousedown.self.prevent="useOnDragStart($event, item, index, false, 300)"
    @mousemove.self.prevent="useOnDraging($event, item.id)" @mouseup.self.prevent="useOnDragEnd"
    @touchstart.self.prevent="useOnDragStart($event, item, index, false, 500)"
    @touchmove.self.prevent="useOnDraging($event, item.id)" @touchend.self.prevent="useOnDragEnd"
    @mouseover.self.prevent="handleMouseOver($event, item.id)"
    :class="`${item.id} ${dataClasses(item)} ${hoverId == item.id && `hover:tw-outline hover:tw-outline-offset-1 hover:tw-outline-2 hover:tw-outline-green-500 tw-relative`} ${activeId == item.
      id && `tw-outline tw-outline-offset-1 tw-outline-2 tw-outline-green-500 tw-relative`} ${overlapItemId == item.id && 'dropTarget'} ${drag.itemId == item.id && 'dragItem'} ${overlapItemId == item.id && isDropBefore ? 'tw-mt-[20px]' : ''} ${overlapItemId == item.id && isDropAfter ? 'tw-mb-[20px]' : ''}`"
    class="">

    <div v-if="activeId == item.id"
      style="position: absolute; top: -21px; left: 0; z-index: 40; min-width: 20px; min-height: 20px; padding: 0 4px; background-color: #22c55e; border: 1px solid white; font-size: 11px; display: flex; align-items: center; justify-content: start; gap: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; overflow: hidden">

      <p style="width: 100%;">{{ item.elName }}</p>

      <div
        style="display: flex; align-items: center; justify-content: center; border-left: 1px white solid; padding-left: 4px;">
        <Icon name="fluent:settings-24-regular" style="font-size: 16px; cursor: pointer;"
          @click.self="handleDelete(index)" />
      </div>
    </div>

    <div v-if="hoverId == item.id"
      style="position: absolute; top: -21px; left: 0; z-index: 40; min-width: 20px; min-height: 20px; padding: 0 4px; background-color: transparent; color: #052e16; font-size: 11px; display: flex; align-items: center; justify-content: start; gap: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; overflow: hidden">

      <p style="width: 100%;">{{ item.elName }}</p>
    </div>

    <div v-if="overlapItemId == item.id"
      class="tw-absolute tw-min-w-[20px] tw-min-h-[20px] tw-px-1 tw-bg-blue-500 tw-border tw-border-white -tw-top-[21px] tw-left-0 tw-z-40 tw-text-[11px] tw-flex tw-items-center tw-justify-center">
      <p>{{ item.elName }}</p>
    </div>

    <ComponentsEditable :data="item.children" />

    <div
      :class="{ 'tw-hidden': false, 'tw-block tw-w-full tw-h-[3px] tw-bg-blue-700 tw-my-[6px]': overlapItemId == item.id && isDropInside }">
    </div>

    <div
      :class="{ 'tw-hidden': false, 'tw-block tw-absolute -tw-top-[20px] tw-left-0 tw-right-0 tw-h-[3px] tw-bg-blue-700 tw-my-[6px]': overlapItemId == item.id && isDropBefore }">
    </div>
    <div
      :class="{ 'tw-hidden': false, 'tw-block tw-absolute -tw-bottom-[20px] tw-left-0 tw-right-0 tw-h-[3px] tw-bg-blue-700 tw-my-[6px]': overlapItemId == item.id && isDropAfter }">
    </div>
  </Element>
</template>

<style scoped>
.dropTarget {
  outline: 2px blue solid;
  outline-offset: 1px;
  cursor: move;
  position: relative !important;
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
  background: white;
  opacity: 0.60;
  position: absolute;
}
</style>