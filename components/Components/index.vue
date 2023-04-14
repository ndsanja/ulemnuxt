<script setup lang="ts">
const { id, xs, sm, md, lg, xl } = useStore()
interface Props {
  data: any
}

const props = defineProps<Props>()
</script>


<template>
  <Element v-for="(item, index ) in props.data" :key="item?.id" :dataItemProps="item"
    :class="xl ? `${item?.classes?.xs} ${item?.classes?.sm} ${item?.classes?.md} ${item?.classes?.lg} ${item?.classes?.xl}` : lg ? `${item?.classes?.xs} ${item?.classes?.sm} ${item?.classes?.md} ${item?.classes?.lg}` : md ? `${item?.classes?.xs} ${item?.classes?.sm} ${item?.classes?.md}` : sm ? `${item?.classes?.xs} ${item?.classes?.sm}` : item?.classes?.xs">
    <Components :data="item.children" />
  </Element>
</template>

<style></style>
