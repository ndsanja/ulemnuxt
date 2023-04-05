<script setup lang="ts">
import draggable from 'vuedraggable'

const { id, xs, sm, md, lg, xl, getDataById } = useStore()


interface Props {
  data: any
}


const props = defineProps<Props>()
const drag = ref(false)
</script>

<template>
  <draggable class="dragArea" tag="div" :list="props.data" group="elements" item-key="id" delay="300"
    delayOnTouchOnly="true">
    <template #item="{ element }">
      <Element @click.self.prevent="id = element?.id"
        :class="xl ? `${element?.classes?.xs} ${element?.classes?.sm} ${element?.classes?.md} ${element?.classes?.lg} ${element?.classes?.xl}` : lg ? `${element?.classes?.xs} ${element?.classes?.sm} ${element?.classes?.md} ${element?.classes?.lg}` : md ? `${element?.classes?.xs} ${element?.classes?.sm} ${element?.classes?.md}` : sm ? `${element?.classes?.xs} ${element?.classes?.sm}` : element?.classes?.xs">
        <ComponentsEditable :data="element?.children" class="min-h-20px" />
      </Element>
    </template>
  </draggable>
</template>

<style scoped>
.dragArea {
  min-height: 20px;
  outline: 1px dashed;
}
</style>