<script setup lang="ts">


interface Props {
  data: any
}
const props = defineProps<Props>()

const { getDataById } = useStore()
const { typographyFocus } = useDragAndDrop()

const { activeId, id, hoverId } = useStore()
const { isDraging } = useDragAndDrop()

const resizeTextarea = () => {
  let textarea = document.querySelector(`[data-itemId="${props.data.id}"]`)
  typographyFocus.value = textarea
  if (textarea) {
    // @ts-ignore
    textarea.style.height = 'auto';
    // @ts-ignore
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}

onMounted(() => {

  watchEffect(() => {
    resizeTextarea()
  })
})

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
  <textarea :data-itemId="props.data.id" @mouseover.self.prevent="handleMouseOver($event, props.data.id)"
    @click.stop.prevent="handleCLick($event, props.data.id)" v-model="props.data.content" @input="resizeTextarea" rows="1"
    style="resize: none;" class="w-full focus:outline-none bg-transparent" />
</template>