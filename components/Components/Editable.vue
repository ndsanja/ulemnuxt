<script setup lang="ts">
import draggable from 'vuedraggable'

const { id, xs, sm, md, lg, xl, getDataById, hoverId, activeId, currentIndex, currentParentId } = useStore()
const { isDisabledDragAndDrop } = useDragAndDrop()


interface Props {
  data: any
}

const dataClasses = (element: any) => {
  return xl ? `${element?.classes?.xs} ${element?.classes?.sm} ${element?.classes?.md} ${element?.classes?.lg} ${element?.classes?.xl}` : lg ? `${element?.classes?.xs} ${element?.classes?.sm} ${element?.classes?.md} ${element?.classes?.lg}` : md ? `${element?.classes?.xs} ${element?.classes?.sm} ${element?.classes?.md}` : sm ? `${element?.classes?.xs} ${element?.classes?.sm}` : element?.classes?.xs
}

const props = defineProps<Props>()


const handleCLick = (e: any, elId: any) => {
  id.value = elId
  activeId.value = elId
  currentParentId.value = e.target.parentElement.parentElement.attributes['data-elId'].value
}


const handleDelete = (index: any) => {
  const removeItemFromParentOrigin = getDataById(currentParentId.value);
  removeItemFromParentOrigin.value.children?.splice(Number(index), 1);
}


</script>

<template>
  <draggable class="dragArea" tag="div" :list="props.data" group="elements" item-key="id" swapThreshold="0.08" delay="300"
    :delayOnTouchOnly="true">
    <template #item="{ element, index }">
      <Element :data-elId="element.id" :data-parentId="element.parentId"
        @click.self.prevent="handleCLick($event, element?.id)" @mouseover.self.prevent="hoverId = element.id"
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
          <div @click.self="handleDelete(index)">del</div>
        </div>
        <ComponentsEditable :data="element.children" />
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