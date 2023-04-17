<script setup lang="ts">
const { dataClasses } = useStore()
interface Props {
  data: any
}

const props = defineProps<Props>()
</script>


<template>
  <Element v-for="(item, index ) in props.data" :key="item?.id" :dataItemProps="item" :class="dataClasses(item)">
    <Components :data="item.children" />
  </Element>
</template>

<style></style>
