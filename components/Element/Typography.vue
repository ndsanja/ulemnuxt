<script setup lang="ts">


interface Props {
  data: any
}
const props = defineProps<Props>()

const { getDataById } = useStore()
const item = getDataById(props.data.id)

// const { textarea, triggerResize } = useTextareaAutosize()

// const textarea = ref<any>()

// const resizeTextarea = () => {
//   textarea.value.style.height = 'auto';
//   textarea.value.style.height = textarea.value.scrollHeight + 'px';
// }


const test = ref('loram test')

const resizeTextarea = () => {
  let textarea = document.getElementById(props.data.elId)
  if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}

onMounted(() => {
  watchEffect(() => {
    resizeTextarea()
  })
})


// watch(item.value.content, () => {
//   triggerResize()
// })
</script>


<template>
  <!-- <textarea ref="textarea" v-model="item.content" class="resize-none" /> -->
  <textarea ref="textarea" v-model="item.content" @input="resizeTextarea" rows="1" style="resize: none;"
    class="w-full inline-block focus:outline-none bg-transparent" />
</template>