<script setup lang="ts">

const { id, hoverId, activeId, dataClasses, textWidth, textContent, fontContent, getTextWidth } = useStore()
const { drag, useOnDragStart, useOnDragEnd, useOnDraging, isDraging, overlapItemId, isTouch, isDropAfter, isDropBefore, isDropInside, handleDelete, isDragStart } = useDragAndDrop()


interface Props {
  data: any
}

const props = defineProps<Props>()



const handleCLick = (e: any, elId: any) => {
  id.value = elId
  activeId.value = elId
  window.blur()

  let activeEl = document.querySelector(`[data-itemId="${activeId.value}"]`)
  // @ts-ignore
  drag.value.parentId = activeEl?.parentNode?.attributes?.['data-itemId']?.value;

  toogleParent.value = false

  if (elId == 'root') {
    isDraging.value = false
  }
}


const handleTouch = (e: any, elId: any) => {
  id.value = elId
  activeId.value = elId
  isTouch.value = true
  window.blur()

  let activeEl = document.querySelector(`[data-itemId="${activeId.value}"]`)

  // @ts-ignore
  drag.value.parentId = activeEl?.parentNode?.attributes?.['data-itemId']?.value;

  toogleParent.value = false


  if (elId == 'root') {
    isDraging.value = false
  }
}


const handleMouseOver = (e: any, itemId: any) => {
  hoverId.value = itemId

}

const toogleParent = ref(false)
const parentId = ref<any>('')
const grantParentId = ref<any>('')
const grandGrandParentId = ref<any>('')
const parentElName = ref<any>('')
const grantParentElName = ref<any>('')
const grandGrandParentElName = ref<any>('')

const handleClickElName = () => {
  let activeEl = document.querySelector(`[data-itemId="${activeId.value}"]`)

  let parrent = activeEl?.parentNode
  let granParrent = parrent?.parentNode
  let granGrandParrent = granParrent?.parentNode

  // @ts-ignore
  parentId.value = parrent?.attributes?.['data-itemId']?.value

  // @ts-ignore
  grantParentId.value = granParrent?.attributes?.['data-itemId']?.value

  // @ts-ignore
  grandGrandParentId.value = granGrandParrent?.attributes?.['data-itemId']?.value

  // @ts-ignore
  parentElName.value = parrent?.attributes?.['data-itemName']?.value

  // @ts-ignore
  grantParentElName.value = granParrent?.attributes?.['data-itemName']?.value

  // @ts-ignore
  grandGrandParentElName.value = granGrandParrent?.attributes?.['data-itemName']?.value

  toogleParent.value = !toogleParent.value
}

const handleToParent = (parentId: any) => {
  activeId.value = parentId
  id.value = parentId

  let activeEl = document.querySelector(`[data-itemId="${parentId}"]`)
  // @ts-ignore
  drag.value.parentId = activeEl?.parentNode?.attributes?.['data-itemId']?.value;


  toogleParent.value = false
}

watchEffect(() => {
  textContent.value
  fontContent.value
  textWidth.value
})

const testTouch = (e: any) => {
  console.log(e);

}

</script>

<template>
  <ElementEditable v-for="(item, index) in props.data" :key="item.id" :dataItemProps="item" :data-itemId="item.id"
    :data-itemName="item.elName" :data-item="JSON.stringify(item)" :data-index="index" draggable="true"
    @mouseover.self.prevent="handleMouseOver($event, item.id)" @click.self.prevent="handleCLick($event, item.id)"
    @touchstart.self.passive="handleTouch($event, item.id)"
    @mousedown.self.prevent="useOnDragStart($event, item, index, false, 300)"
    @mousemove.self.prevent="useOnDraging($event, item.id)" @mouseup.self.prevent="useOnDragEnd"
    :class="`${item.id} ${dataClasses(item.classes)} ${hoverId == item.id && `hover:tw-outline hover:tw-outline-offset-1 hover:tw-outline-2 hover:tw-outline-green-500 tw-relative tw-text-black`} ${activeId == item.
      id && `tw-outline tw-outline-offset-1 tw-outline-2 tw-outline-green-500 tw-relative tw-text-black`
      } ${overlapItemId == item.id && 'dropTarget tw-text-black'} ${drag.itemId == item.id && isDragStart ? 'dragItem' : ''} ${overlapItemId == item.id && isDropBefore ? 'tw-mt-[12px]' : ''} ${overlapItemId == item.id && isDropAfter ? 'tw-mb-[12px]' : ''}`"
    :style="item.elKind == 'p' || item.elKind == 'h1' || item.elKind == 'h2' || item.elKind == 'h3' || item.elKind == 'h4' || item.elKind == 'h5' || item.elKind == 'h6' ? `width: calc(${getTextWidth(item.content, '30px Arial')}px + 2ch); max-width: 100% ; min-width: 1ch` : ''">

    <!-- Active toots Handle Start -->
    <div v-show="activeId == item.id"
      style="position: absolute; top: -21px; left: 0; z-index: 40; min-width: 24px; height: 20px; padding: 0 4px; background-color: #22c55e; border: 1px solid white; font-size: 11px; display: flex; align-items: center; justify-content: start; gap: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; overflow: hidden">

      <div @click="handleClickElName" class="tw-flex tw-items-center tw-justify-center tw-cursor-pointer">
        <p>{{ item.elName }}</p>
      </div>

      <div @click="handleDelete(index)"
        style="display: flex; align-items: center; justify-content: center; border-left: 1px white solid; padding-left: 4px;">
        <Icon name="fluent:settings-24-regular" style="font-size: 16px; cursor: pointer;" />
      </div>

      <div @touchstart.stop.prevent="useOnDragStart($event, item, index, false, 300)"
        @touchmove.prevent="useOnDraging($event, item.id)" @touchend.prevent="useOnDragEnd"
        @mousedown.stop.prevent="useOnDragStart($event, item, index, false, 300)"
        @mousemove.self.prevent="useOnDraging($event, item.id)" @mouseup.self.prevent="useOnDragEnd"
        style=" display: flex; align-items: center; justify-content: center; border-left: 1px white solid; padding-left: 4px;">
        <Icon name="fluent:arrow-move-24-regular" style="font-size: 16px; cursor: move;" />
      </div>

    </div>

    <!-- Get Parent Element Start -->
    <div @click="handleToParent(parentId)" v-if="(toogleParent && activeId == item.id) && parentId"
      class="tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-absolute -tw-top-[40px] tw-left-0 tw-min-w-[24px] tw-px-1 tw-text-[11px] tw-h-[20px] tw-bg-green-500 tw-border tw-border-white">
      <p> {{ parentElName }}</p>
    </div>
    <div @click="handleToParent(grantParentId)" v-if="(toogleParent && activeId == item.id) && grantParentId"
      class="tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-absolute -tw-top-[60px] tw-left-0 tw-min-w-[24px] tw-px-1 tw-text-[11px] tw-h-[20px] tw-bg-green-500 tw-border tw-border-white">
      <p> {{ grantParentElName }}</p>
    </div>
    <div @click="handleToParent(grandGrandParentId)" v-if="(toogleParent && activeId == item.id) && grandGrandParentId"
      class="tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-absolute -tw-top-[80px] tw-left-0 tw-min-w-[24px] tw-px-1 tw-text-[11px] tw-h-[20px] tw-bg-green-500 tw-border tw-border-white">
      <p> {{ grandGrandParentElName }}</p>
    </div>
    <!-- Get Parent Element End -->
    <!-- Active toots Handle Start -->


    <div v-if="hoverId == item.id && activeId != item.id"
      style="position: absolute; top: -21px; left: 0; z-index: 40; min-width: 24px; height: 20px; padding: 0 4px; background-color: transparent; color: #052e16; font-size: 11px; display: flex; align-items: center; justify-content: start; gap: 4px; border-top-left-radius: 4px; border-top-right-radius: 4px; overflow: hidden">

      <p style="width: 100%;">{{ item.elName }}</p>
    </div>

    <div v-if="overlapItemId == item.id"
      class="tw-absolute tw-min-w-[20px] tw-min-h-[20px] tw-px-1 tw-bg-blue-500 tw-border tw-border-white -tw-top-[21px] tw-left-0 tw-z-40 tw-text-[11px] tw-flex tw-items-center tw-justify-center">
      <p>{{ item.elName }}</p>
    </div>


    <ElementTypography
      v-show="item.elKind == 'p' || item.elKind == 'h1' || item.elKind == 'h2' || item.elKind == 'h3' || item.elKind == 'h4' || item.elKind == 'h5' || item.elKind == 'h6'"
      :data="item" class="bg-transparent focus:outline-none inline-block"
      :class="`${item.id} ${dataClasses(item.classes)} ${drag.itemId == item.id && 'dragItem'} ${isDraging && 'm-3'} `"
      @mouseover.self="handleMouseOver($event, item.id)" @click.stop="handleCLick($event, item.id)"
      :style="`width:auto; max-width: 100% ; min-width: 1ch; resize: none; `" />


    <div
      :class="{ 'tw-hidden': false, 'tw-block tw-w-full tw-h-[3px] tw-bg-blue-700 tw-my-[6px]': overlapItemId == item.id && isDropInside && (item.elKind != 'p' || item.elKind != 'h1' || item.elKind != 'h2' || item.elKind != 'h3' || item.elKind != 'h4' || item.elKind != 'h5' || item.elKind != 'h6') }">
    </div>

    <div
      :class="{ 'tw-hidden': false, 'tw-block tw-absolute -tw-top-[15px] tw-left-0 tw-right-0 tw-h-[3px] tw-bg-blue-700 tw-my-[6px]': overlapItemId == item.id && isDropBefore }">
    </div>
    <div
      :class="{ 'tw-hidden': false, 'tw-block tw-absolute -tw-bottom-[15px] tw-left-0 tw-right-0 tw-h-[3px] tw-bg-blue-700 tw-my-[6px]': overlapItemId == item.id && isDropAfter }">
    </div>
    <ComponentsEditable :data="item.children" />
  </ElementEditable>
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
