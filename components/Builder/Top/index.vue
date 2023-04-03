<script setup lang="ts">
const { isPreview, setDisplay, toogleLeft, toogleRight, openPreview, display, isFit } = useStateUiBuilder()
const { displaySize } = useStore()

const clickBrekpoints = (display: string, fit: boolean) => {
  setDisplay(display)
  isFit.value = fit
}
</script>

<template>
  <header :class="{
    'flex items-center justify-between h-[40px] w-full bg-slate-800 border-b-2 border-slate-900 px-4 text-white': true,
    '!hidden': isPreview,
  }">
    <NuxtLink to="/" class="mr-2">Ulem</NuxtLink>

    <div class="flex items-center justify-center space-x-2 text-xs">
      <div v-if="!isPreview" @click="openPreview" class="cursor-pointer">preview</div>
      <div @click="clickBrekpoints('fit', true)"
        :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'fit' }">FIT
      </div>
      <div @click="clickBrekpoints('xs', false)"
        :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'xs' }">XS
      </div>
      <div @click="clickBrekpoints('sm', false)"
        :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'sm' }">SM
      </div>
      <div @click="clickBrekpoints('md', false)"
        :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'md' }">MD
      </div>
      <div @click="clickBrekpoints('lg', false)"
        :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'lg' }">LG
      </div>
      <div @click="clickBrekpoints('xl', false)"
        :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'xl' }">XL
      </div>
      <div class="font-bold">{{ displaySize.toFixed() }}px</div>
    </div>
    <div class="flex justify-end items-center">
      <div @click="toogleLeft = !toogleLeft" class="cursor-pointer">icon</div>
    </div>
  </header>
</template>