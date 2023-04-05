<script setup lang="ts">
import draggable from 'vuedraggable'

const { id, xs, sm, md, lg, xl, getDataById, hoverId, activeId, currentIndex, currentParentId, idFromDrag } = useStore()


interface Props {
  data: any
}

const dataClasses = (element: any) => {
  return xl ? `${element?.classes?.xs} ${element?.classes?.sm} ${element?.classes?.md} ${element?.classes?.lg} ${element?.classes?.xl}` : lg ? `${element?.classes?.xs} ${element?.classes?.sm} ${element?.classes?.md} ${element?.classes?.lg}` : md ? `${element?.classes?.xs} ${element?.classes?.sm} ${element?.classes?.md}` : sm ? `${element?.classes?.xs} ${element?.classes?.sm}` : element?.classes?.xs
}

const props = defineProps<Props>()


const handleCLick = (elId: any) => {
  id.value = elId
  activeId.value = elId
}

const handleDelete = () => {
  const currentItem = getDataById(activeId.value)
  const removeItemFromParentOrigin = getDataById(currentItem.value.parentId);
  removeItemFromParentOrigin.value.children?.splice(currentItem.value.currentIndex, 1);
}

const handleStart = (evt: any) => {
  idFromDrag.value = evt.item.attributes['data-elId'].value
}

const handleEnd = (evt: any) => {
  currentIndex.value = Number(evt.newIndex)
  currentParentId.value = evt.to.parentElement.attributes['data-elId'].value

  const newDropData = getDataById(idFromDrag.value)
  newDropData.value.parentId = currentParentId.value
  newDropData.value.currentIndex = currentIndex.value

  console.log(newDropData.value);

} 
</script>

<template>
  <draggable class="dragArea" tag="div" :list="props.data" group="elements" item-key="id" delay="300" swapThreshold="0.1"
    delayOnTouchOnly="true" @end="handleEnd" @start="handleStart">
    <template #item="{ element }">
      <Element :data-elId="element.id" :data-parentId="element.parentId" :data-index="element.currentIndex"
        @click.self.prevent="handleCLick(element?.id)" @mouseover.self.prevent="hoverId = element.id"
        :class="`${dataClasses(element)} ${hoverId == element.id && `hover:border-green-500 hover:border-2`} ${activeId == element.id && `activeEl`}`"
        class=" p-[8px]">
        <div v-if="activeId == element.id"
          class="absolute min-w-[20px] min-h-[20px] px-1 bg-green-500 border border-white -top-[21px] left-0 z-40 text-[11px] flex items-center justify-center">
          <p>{{ element.elName }}</p>
        </div>
        <div v-if="activeId == element.id"
          class="absolute min-w-[20px] min-h-[20px] px-1 bg-green-500 border border-white -top-[21px] right-0 z-40 text-[11px] flex items-center justify-center space-x-3">
          <div>add</div>
          <div>dup</div>
          <div>cop</div>
          <div @click="handleDelete">del</div>
        </div>
        <ComponentsEditable :data="element.children" class="min-h-[20px] min-w-[20px]" />
      </Element>
    </template>
  </draggable>
</template>

<style scoped>
.dragArea {}

.activeEl {
  border: 1px black solid;
  position: relative
}
</style>