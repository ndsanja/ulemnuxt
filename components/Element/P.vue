<script setup lang="ts">
const { dataClasses } = useStore()
interface Props {
  item: any
}

const props = defineProps<Props>()
</script>
<template>
  <p :class="dataClasses(props.item.classes)">{{ props.item.content }}</p>
</template>