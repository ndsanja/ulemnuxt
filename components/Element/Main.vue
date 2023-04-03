<script setup lang="ts">
interface Props {
  className?: string
  styles?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: "",
  styles: "",
  id: ""
})
</script>


<template>
  <main :id="props.id" :class="props.className" :style="props.styles">
    <slot />
  </main>
</template>