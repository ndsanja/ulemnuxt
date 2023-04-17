<script setup lang="ts">
interface Props {
  data: any
}

const props = defineProps<Props>()

const { textarea, triggerResize } = useTextareaAutosize()
</script>


<template>
  <textarea ref="textarea" :data-itemId="props.data.id" v-model="props.data.content" @input="triggerResize" rows="1"
    style="resize: none;" class="focus:outline-none bg-transparent w-full inline-block" />
</template>