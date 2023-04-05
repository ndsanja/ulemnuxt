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
  <div class="wrapper bg-slate-700" un-cloak>
    <div ref="el" :class="{
      'responsive': true,
      'isPreviePosition': isPreview,
      'dXs': display == 'xs',
      'dSm': display == 'sm',
      'dMd': display == 'md',
      'dLg': display == 'lg',
      'dXl': display == 'xl',
      'dFit': display == 'fit',
    }" un-cloak>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  flex-grow: 1;
  position: sticky;
  top: 0;
  overflow-y: auto;
  min-height: 100%;

}

.responsive {
  background-color: white;
  min-height: 100%;
  height: 100%;
  position: fixed;
  top: 40px;
  overflow-y: auto;
}

.isPreviePosition {
  top: 0;
}

.dXs {
  width: 393px;
}

.dSm {
  width: 640px;
}

.dMd {
  width: 768px;
}

.dLg {
  width: 1024px;
}

.dXl {
  width: 1280px;
}

.dFit {
  width: 100%;
}
</style>