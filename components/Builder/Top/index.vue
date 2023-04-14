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
    'tw-flex tw-items-center tw-justify-between tw-h-[40px] tw-w-full tw-bg-slate-800 tw-border-b-2 tw-border-slate-900 tw-text-white': true,
    '!hidden': isPreview,
  }">
    <NuxtLink to="/" class="px-2">Ulem</NuxtLink>

    <div class="tw-flex tw-items-center tw-justify-center tw-space-x-4 tw-text-[18px]">
      <div v-if="!isPreview" @click="openPreview" class="tw-cursor-pointer">
        <Icon name="heroicons:eye-solid" style="font-size: 24px;" />
      </div>
      <div @click="clickBrekpoints('fit', true)"
        :class="{ 'tw-cursor-pointer tw-text-[20px]': true, 'tw-text-2xl tw-font-bold tw-text-blue-500': display == 'fit' }">
        <Icon name="fluent:auto-fit-width-24-regular" />
      </div>
      <div @click="clickBrekpoints('xs', false)"
        :class="{ 'tw-cursor-pointer': true, 'tw-text-2xl tw-font-bold tw-text-blue-500': display == 'xs' }">
        <Icon name="heroicons:device-phone-mobile-solid" />
      </div>
      <div @click="clickBrekpoints('sm', false)"
        :class="{ 'tw-cursor-pointer': true, 'tw-text-2xl tw-font-bold tw-text-blue-500': display == 'sm' }">
        <Icon name="heroicons:device-phone-mobile-solid" class="rotate-90" />
      </div>
      <div @click="clickBrekpoints('md', false)"
        :class="{ 'tw-cursor-pointer': true, 'tw-text-2xl tw-font-bold tw-text-blue-500': display == 'md' }">
        <Icon name="heroicons:device-tablet-solid" />
      </div>
      <div @click="clickBrekpoints('lg', false)"
        :class="{ 'tw-cursor-pointer': true, 'tw-text-xl tw-font-bold tw-text-blue-500': display == 'lg' }">
        <Icon name="material-symbols:laptop-mac-outline" />
      </div>
      <div @click="clickBrekpoints('xl', false)"
        :class="{ 'tw-cursor-pointer': true, 'tw-text-xl tw-font-bold tw-text-blue-500': display == 'xl' }">
        <Icon name="heroicons:computer-desktop-solid" />
      </div>
      <div class="tw-font-bold tw-text-xs">{{ displaySize.toFixed() }}px</div>
    </div>
    <div class="tw-flex tw-justify-end tw-items-center tw-px-2">
      <div @click="toogleLeft = !toogleLeft" class="tw-cursor-pointer">
        <Icon style="font-size: 24px;" name="heroicons:plus-circle-solid" />
      </div>
    </div>
  </header>
</template>