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
  <draggable class="dragArea" tag="div" :list="props.data" :group="{ name: 'g1' }" item-key="id">
    <template #item="{ element }">
      <Element
        :class="xl ? `${element.classes.xs} ${element.classes.sm} ${element.classes.md} ${element.classes.lg} ${element.classes.xl}` : lg ? `${element.classes.xs} ${element.classes.sm} ${element.classes.md} ${element.classes.lg}` : md ? `${element.classes.xs} ${element.classes.sm} ${element.classes.md}` : sm ? `${element.classes.xs} ${element.classes.sm}` : element.classes.xs">
        <NestedDrag :data="element.children" class="min-h-100px" />
      </Element>
    </template>
  </draggable>
</template>

<style scoped>
.dragArea {
  padding: 8px;
  outline: 1px dashed;
  background: salmon;
}
</style>