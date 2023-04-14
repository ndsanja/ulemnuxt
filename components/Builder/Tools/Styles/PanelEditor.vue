<script setup lang="ts">
const tooglePanel = ref(true)
</script>

<template>
  <div>
    <div
      class="tw-flex tw-items-center tw-justify-start tw-w-full tw-h-[25px] tw-bg-slate-800 tw-border-b-2 tw-border-slate-900 tw-px-2 tw-text-white">
      <slot name="title" />
    </div>
    <div v-if="tooglePanel" class="tw-px-2 tw-bg-slate-700">
      <slot />
    </div>
  </div>
</template>