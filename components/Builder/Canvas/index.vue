<script setup>
const { display, isPreview } = useStateUiBuilder()
const { displaySize } = useStore()

const el = ref(null)
const { width } = useElementSize(el)

watch(width, () => {
  displaySize.value = width.value
}, { immediate: true })
</script>

<template>
  <div class="flex-1 sticky top-0 overflow-y-scroll min-h-full bg-slate-700" un-cloak>
    <div ref="el" :class="{
      'bg-white min-h-full fixed top-[40px]': true,
      '!top-0': isPreview,
      'w-[393px]': display == 'xs',
      'w-[640px]': display == 'sm',
      'w-[768px]': display == 'md',
      'w-[1024px]': display == 'lg',
      'w-[1280px]': display == 'xl',
      'w-full': display == 'fit',
    }" un-cloak>
      <slot />
    </div>
  </div>
</template>