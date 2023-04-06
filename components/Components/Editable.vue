<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
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

const handleDuplicate = (elId: any) => {
  let currentData = getDataById(elId)
  let parrentData = getDataById(currentParentId.value)

  parrentData.value.children.push({ ...currentData.value, id: uuidv4() })
}


</script>

<template>
  <draggable class="dragArea" tag="div" :list="props.data" group="elements" item-key="id" swapThreshold="0.08" delay="300"
    :delayOnTouchOnly="true">
    <template #item="{ element, index }">
      <Element :data-elId="element.id" :data-parentId="element.parentId"
        @click.self.prevent="handleCLick($event, element?.id)" @mouseover.self.prevent="hoverId = element.id"
        :class="`${dataClasses(element)} ${hoverId == element.id && `hover:outline hover:outline-offset-1 hover:outline-2 hover:outline-green-500`} ${activeId == element.id && `outline outline-offset-1 outline-2 outline-green-500 relative`}`"
        class=" p-[8px]">
        <div v-if="activeId == element.id"
          class="absolute min-w-[20px] min-h-[20px] px-1 bg-green-500 border border-white -top-[21px] left-0 z-40 text-[11px] flex items-center justify-center">
          <p>{{ element.elName }}</p>
        </div>
        <div v-if="activeId == element.id"
          class="absolute min-w-[20px] h-[28px] px-1 bg-green-500 border border-white -top-[29px] right-0 z-40 flex items-center justify-between gap-2">
          <div>
            <Icon name="fluent:add-square-24-regular" class="text-24px cursor-pointer"
              @click.self="handleDuplicate(element.id)" />
          </div>
          <div class="h-28px w-1px bg-white"></div>
          <div>
            <Icon name="fluent:settings-24-regular" class="text-24px cursor-pointer" @click.self="handleDelete(index)" />
          </div>
        </div>
        <ComponentsEditable :data="element.children" />
      </Element>
    </template>
  </draggable>
</template>

<style scoped>
.dragArea {}
</style>