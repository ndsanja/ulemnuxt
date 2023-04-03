<script setup lang="ts">
const tooglePanel = ref(true)
</script>

<template>
  <div>
    <div
      class="flex items-center justify-start w-full h-[25px] bg-slate-800 border-b-2 border-slate-900  px-2 text-white">
      <slot name="title" />
    </div>
    <div v-if="tooglePanel" class="px-2 bg-slate-700">
      <slot />
    </div>
  </div>
</template>