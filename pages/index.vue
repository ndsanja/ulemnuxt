<script setup lang="ts">
const { data } = useStore()

// const { textarea, triggerResize } = useTextareaAutosize()

const text = ref("Hello World")

const dataArray = ref([
  {
    id: 1,
    content: 'Hello Content 1'
  },
  {
    id: 2,
    content: 'Hello Content 2'
  },
  {
    id: 3,
    content: 'Hello Content 3'
  },
])

const textarea = ref<any>()

const resizeTextarea = () => {
  textarea.value.style.height = 'auto';
  textarea.value.style.height = textarea.value.scrollHeight + 'px';
}

onMounted(() => {

  watchEffect(() => {
    // resizeTextarea()
    console.log(textarea.value);
    resizeTextarea()

  })
})

// watch(text, () => {
//   triggerResize()
// })
const classes = ref('text-3xl')
</script>

<template>
  <div class="un-cloak">
    <textarea v-model="classes"></textarea>
    <NuxtLink to="/builder">Builder</NuxtLink>
    <!-- <Components :data="data" /> -->
    <!-- <div v-for="item in dataArray" :key="item.id" class="mt-4">
                        <textarea ref="textarea" v-model="item.content" class="resize-none" :class="classes" />
                      </div> -->
    <div>
      <textarea ref="textarea" v-model="text" @input="resizeTextarea" rows="1" class="inline-block w-auto"
        :class="classes"></textarea>
    </div>
  </div>
</template>
