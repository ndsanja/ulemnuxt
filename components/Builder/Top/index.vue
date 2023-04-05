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
    'flex items-center justify-between h-[40px] w-full bg-slate-800 border-b-2 border-slate-900 text-white': true,
    '!hidden': isPreview,
  }">
    <NuxtLink to="/" class="px-2">Ulem</NuxtLink>

    <div class="flex items-center justify-center space-x-4 text-[18px]">
      <div v-if="!isPreview" @click="openPreview" class="cursor-pointer">
        <Icon name="heroicons:eye-solid" style="font-size: 24px;" />
      </div>
      <div @click="clickBrekpoints('fit', true)"
        :class="{ 'cursor-pointer text-[20px]': true, 'text-2xl font-bold text-blue-500': display == 'fit' }">
        <Icon name="fluent:auto-fit-width-24-regular" />
      </div>
      <div @click="clickBrekpoints('xs', false)"
        :class="{ 'cursor-pointer': true, 'text-2xl font-bold text-blue-500': display == 'xs' }">
        <Icon name="heroicons:device-phone-mobile-solid" />
      </div>
      <div @click="clickBrekpoints('sm', false)"
        :class="{ 'cursor-pointer': true, 'text-2xl font-bold text-blue-500': display == 'sm' }">
        <Icon name="heroicons:device-phone-mobile-solid" class="rotate-90" />
      </div>
      <div @click="clickBrekpoints('md', false)"
        :class="{ 'cursor-pointer': true, 'text-2xl font-bold text-blue-500': display == 'md' }">
        <Icon name="heroicons:device-tablet-solid" />
      </div>
      <div @click="clickBrekpoints('lg', false)"
        :class="{ 'cursor-pointer': true, 'text-xl font-bold text-blue-500': display == 'lg' }">
        <Icon name="material-symbols:laptop-mac-outline" />
      </div>
      <div @click="clickBrekpoints('xl', false)"
        :class="{ 'cursor-pointer': true, 'text-xl font-bold text-blue-500': display == 'xl' }">
        <Icon name="heroicons:computer-desktop-solid" />
      </div>
      <div class="font-bold text-xs">{{ displaySize.toFixed() }}px</div>
    </div>
    <div class="flex justify-end items-center px-2">
      <div @click="toogleLeft = !toogleLeft" class="cursor-pointer">
        <Icon style="font-size: 24px;" name="heroicons:plus-circle-solid" />
      </div>
    </div>
  </header>
</template>