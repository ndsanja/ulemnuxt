<script setup lang="ts">
const { dataClasses } = useStore()
interface Props {
  item: any
}

const props = defineProps<Props>()
</script>
<template>
  <h6 :class="dataClasses(props.item.classes)">{{ props.item.content }}</h6>
</template>