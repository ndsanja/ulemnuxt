<script setup>
const { isPreview, setDisplay, display, closePreview } = useStateUiBuilder()
const { displaySize } = useStore()
</script>

<template>
  <div v-if="isPreview"
    class="tw-fixed tw-z-50 tw-top-0 tw-left-1/2 -tw-translate-x-1/2 tw-inline-flex tw-items-center tw-justify-center tw-space-x-4 tw-px-4 tw-text-[18px] tw-bg-white/30">
    <div @click="closePreview" class="tw-cursor-pointer">
      <Icon name="heroicons:eye-slash-solid" style="font-size: 24px" />
    </div>
    <div @click="setDisplay('fit')"
      :class="{ 'tw-cursor-pointer tw-text-[20px]': true, 'tw-text-2xl tw-font-bold tw-text-blue-500': display == 'fit' }">
      <Icon name="fluent:auto-fit-width-24-regular" />
    </div>
    <div @click="setDisplay('xs')"
      :class="{ 'tw-cursor-pointer': true, 'tw-text-2xl tw-font-bold tw-text-blue-500': display == 'xs' }">
      <Icon name="heroicons:device-phone-mobile-solid" />
    </div>
    <div @click="setDisplay('sm')"
      :class="{ 'tw-cursor-pointer': true, 'tw-text-2xl tw-font-bold tw-text-blue-500': display == 'sm' }">
      <Icon name="heroicons:device-phone-mobile-solid" class="rotate-90" />
    </div>
    <div @click="setDisplay('md')"
      :class="{ 'tw-cursor-pointer': true, 'tw-text-2xl tw-font-bold tw-text-blue-500': display == 'md' }">
      <Icon name="heroicons:device-tablet-solid" />
    </div>
    <div @click="setDisplay('lg')"
      :class="{ 'tw-cursor-pointer': true, 'tw-text-xl tw-font-bold tw-text-blue-500': display == 'lg' }">
      <Icon name="material-symbols:laptop-mac-outline" />
    </div>
    <div @click="setDisplay('xl')"
      :class="{ 'tw-cursor-pointer': true, 'tw-text-xl tw-font-bold tw-text-blue-500': display == 'xl' }">
      <Icon name="heroicons:computer-desktop-solid" />
    </div>
    <div class="tw-font-bold tw-text-xs">{{ displaySize.toFixed() }}px</div>
  </div>
</template>