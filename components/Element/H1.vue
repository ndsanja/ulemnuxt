<script setup lang="ts">
const { dataClasses } = useStore()
interface Props {
  item: any
}

const props = defineProps<Props>()
</script>
<template>
  <h1 :class="dataClasses(props.item.classes)">{{ props.item.content }}</h1>
</template>