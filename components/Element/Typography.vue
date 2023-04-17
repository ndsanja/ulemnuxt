<script setup lang="ts">
interface Props {
  data: any
}
const props = defineProps<Props>()

const { activeId, id, hoverId, dataClasses } = useStore()
const { isDraging } = useDragAndDrop()

const { textarea, triggerResize } = useTextareaAutosize()

const handleCLick = (e: any, elId: any) => {
  id.value = elId
  activeId.value = elId

  if (elId == 'root') {
    isDraging.value = false
  }
}

const handleMouseOver = (e: any, itemId: any) => {
  hoverId.value = itemId
}
</script>


<template>
  <textarea ref="textarea" :data-itemId="props.data.id" v-model="props.data.content" @input="triggerResize" rows="1"
    style="resize: none;" class="focus:outline-none bg-transparent" />
</template>