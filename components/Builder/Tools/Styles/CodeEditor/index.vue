<script setup lang="ts">
import { UseDraggable as Draggable } from '@vueuse/components'
const { setDisplay, display, isPreview, isFit } = useStateUiBuilder()
const { dataById, xs, sm, md, lg, xl, displaySize } = useStore()

const { width, height } = useWindowSize()

const handle = ref<HTMLElement | null>(null)
const toogleEditor = ref(true)
const toBottom = ref(true)

const clickToBottom = () => {
  toogleEditor.value = false
  toBottom.value = true
}
const clickExpanded = () => {
  toogleEditor.value = true
  toBottom.value = false
}

const positionX = ref()
const positionY = ref()

</script>

<template>
  <BuilderToolsStylesPanelEditor un-cloack v-if="toBottom"
    class="tw-fixed tw-z-40 tw-left-[5px] tw-bottom-[5px] tw-rounded tw-w-[250px]" :class="{ '!tw-hidden': isPreview }">
    <template #title>
      <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
        <p class="tw-flex-1 tw-flex tw-items-center tw-space-x-1 tw-text-[11px]">
          <Icon name="ci:main-component" class="tw-text-[16px]" />
          <span v-if="dataById.id">
            {{
              dataById.elName
            }}
          </span>
          <span v-else>No item Selected</span>
        </p>
        <div v-if="toBottom" @click="clickExpanded" class="tw-cursor-pointer">
          <Icon name="mdi:window-maximize" />
        </div>
      </div>
    </template>
  </BuilderToolsStylesPanelEditor>
  <Draggable un-cloak v-slot="{ x, y }" v-show="!toBottom"
    :style="`left: ${(positionX / width) * 100 <= 100 ? (positionX / width) * 100 : 45}vw; top: ${(positionY / height) * 100 <= 100 ? (positionY / height) * 100 : 60}vh`"
    class="tw-fixed tw-z-40 tw-rounded tw-w-[250px] tw-overflow-y-auto tw-overflow-x-hidden tw-bg-white !tw-min-h-fit !tw-max-h-fit tw-border-2 tw-border-slate-900"
    :class="{ '!tw-hidden': isPreview }" :initial-value="{ x: 80, y: 100 }" :prevent-default="true" :handle="handle">

    <BuilderToolsStylesPanelEditor>
      <template #title>
        <div class="tw-flex tw-items-center tw-w-full" :ondrag="positionX = x">
          <p :ondrag="positionY = y" ref="handle" :class="{ 'tw-cursor-move': true }"
            class="tw-flex-1 tw-flex tw-items-center tw-space-x-1 tw-text-[11px]">
            <Icon name="ci:main-component" class="tw-text-[16px]" />
            <span v-if="dataById.id">
              {{
                dataById.elName
              }}
            </span>
            <span v-else>No item Selected</span>
          </p>
          <div v-if="!toBottom" @click="clickToBottom" class="tw-cursor-pointer">
            <Icon name="heroicons:minus-small-solid" />
          </div>
          <div @click="toogleEditor = !toogleEditor" class="tw-ml-3 tw-cursor-pointer">
            <Icon v-if="toogleEditor" name="heroicons:chevron-up-solid" />
            <Icon v-else name="heroicons:chevron-up-solid" class="tw-rotate-180" />
          </div>
        </div>
      </template>

      <div v-if="toogleEditor" class="tw-text-center tw-text-white tw-text-xs">
        <p v-if="xs" class="">XS Breakpoint </p>
        <p v-if="sm" class="">SM Breakpoint </p>
        <p v-if="md" class="">MD Breakpoint </p>
        <p v-if="lg" class="">LG Breakpoint </p>
        <p v-if="xl" class="">XL Breakpoint </p>
        <!-- <p v-if="xxl" class="">2XL Breakpoint </p> -->

        <p v-if="sm" class="">use prefix <b class="tw-text-base">sm:</b> </p>
        <p v-if="md" class="">use prefix <b class="tw-text-base">md:</b> </p>
        <p v-if="lg" class="">use prefix <b class="tw-text-base">lg:</b> </p>
        <p v-if="xl" class="">use prefix <b class="tw-text-base">xl:</b> </p>
        <!-- <p v-if="xxl" class="text-sm">use prefix <b class="text-base">2xl:</b> </p> -->
      </div>
    </BuilderToolsStylesPanelEditor>

    <BuilderToolsStylesPanelEditor un-cloak v-if="toogleEditor">
      <template #title>
        <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
          <p class="tw-text-xs"> Editor </p>
          <div v-if="!isFit" un-cloak class="tw-text-xs tw-flex tw-items-center tw-justify-end tw-space-x-2">
            <div v-if="dataById?.classes?.xs?.length" @click="setDisplay('xs')"
              :class="{ 'tw-cursor-pointer': true, 'tw-text-sm tw-font-bold tw-text-blue-500': display == 'xs' }">xs</div>
            <div v-if="dataById?.classes?.sm?.length" @click="setDisplay('sm')"
              :class="{ 'tw-cursor-pointer': true, 'tw-text-sm tw-font-bold tw-text-blue-500': display == 'sm' }">sm</div>
            <div v-if="dataById?.classes?.md?.length" @click="setDisplay('md')"
              :class="{ 'tw-cursor-pointer': true, 'tw-text-sm tw-font-bold tw-text-blue-500': display == 'md' }">md</div>
            <div v-if="dataById?.classes?.lg?.length" @click="setDisplay('lg')"
              :class="{ 'tw-cursor-pointer': true, 'tw-text-sm tw-font-bold tw-text-blue-500': display == 'lg' }">lg</div>
            <div v-if="dataById?.classes?.xl?.length" @click="setDisplay('xl')"
              :class="{ 'tw-cursor-pointer': true, 'tw-text-sm tw-font-bold tw-text-blue-500': display == 'xl' }">xl</div>
          </div>
          <div v-if="isFit" un-cloak class="text-xs flex items-center justify-end space-x-2">
            <div v-if="dataById?.classes?.xs?.length" @click="setDisplay('xs')"
              :class="{ 'tw-cursor-pointer': true, 'tw-text-sm tw-font-bold tw-text-blue-500': displaySize < Breakpoints.sm }">
              xs
            </div>
            <div v-if="dataById?.classes?.sm?.length" @click="setDisplay('sm')"
              :class="{ 'tw-cursor-pointer': true, 'tw-text-sm tw-font-bold tw-text-blue-500': displaySize >= Breakpoints.sm && displaySize < Breakpoints.md }">
              sm</div>
            <div v-if="dataById?.classes?.md?.length" @click="setDisplay('md')"
              :class="{ 'tw-cursor-pointer': true, 'tw-text-sm tw-font-bold tw-text-blue-500': displaySize >= Breakpoints.md && displaySize < Breakpoints.lg }">
              md</div>
            <div v-if="dataById?.classes?.lg?.length" @click="setDisplay('lg')"
              :class="{ 'tw-cursor-pointer': true, 'tw-text-sm tw-font-bold tw-text-blue-500': displaySize >= Breakpoints.lg && displaySize < Breakpoints.xl }">
              lg</div>
            <div v-if="dataById?.classes?.xl?.length" @click="setDisplay('xl')"
              :class="{ 'tw-cursor-pointer': true, 'tw-text-sm tw-font-bold tw-text-blue-500': displaySize >= Breakpoints.xl }">
              xl
            </div>
          </div>
        </div>
      </template>

      <div :class="{ 'tw-bg-slate-700 tw-min-h-full': true }">
        <template v-if="dataById.classes">
          <textarea v-if="xs" :class="{ '!tw-min-h-[100px]': true }"
            placeholder="No style in XS Breakpoint, write here..."
            class="tw-min-h-[300px] tw-w-full tw-p-1 tw-mt-1 tw-mb-2 tw-bg-slate-900 tw-text-slate-200 tw-border tw-border-slate-500 tw-rounded-lg tw-text-sm tw-font-mono"
            v-model="dataById.classes.xs"></textarea>
        </template>
        <template v-if="dataById.classes">
          <textarea v-if="sm" :class="{ '!tw-min-h-[100px]': true }"
            placeholder="No style in SM Breakpoint, write here..."
            class="tw-min-h-[300px] tw-w-full tw-p-1 tw-mt-1 tw-mb-2 tw-bg-slate-900 tw-text-slate-200 tw-border tw-border-slate-500 tw-rounded-lg tw-text-sm tw-font-mono"
            v-model="dataById.classes.sm"></textarea>
        </template>
        <template v-if="dataById.classes">
          <textarea v-if="md" :class="{ '!tw-min-h-[100px]': true }"
            placeholder="No style in MD Breakpoint, write here..."
            class="tw-min-h-[300px] tw-w-full tw-p-1 tw-mt-1 tw-mb-2 tw-bg-slate-900 tw-text-slate-200 tw-border tw-border-slate-500 tw-rounded-lg tw-text-sm tw-font-mono"
            v-model="dataById.classes.md"></textarea>
        </template>
        <template v-if="dataById.classes">
          <textarea v-if="lg" :class="{ '!tw-min-h-[100px]': true }"
            placeholder="No style in LG Breakpoint, write here..."
            class="tw-min-h-[300px] tw-w-full tw-p-1 tw-mt-1 tw-mb-2 tw-bg-slate-900 tw-text-slate-200 tw-border tw-border-slate-500 tw-rounded-lg tw-text-sm tw-font-mono"
            v-model="dataById.classes.lg"></textarea>
        </template>
        <template v-if="dataById.classes">
          <textarea v-if="xl" :class="{ '!tw-min-h-[100px]': true }"
            placeholder="No style in XL Breakpoint, write here..."
            class="tw-min-h-[300px] tw-w-full tw-p-1 tw-mt-1 tw-mb-2 tw-bg-slate-900 tw-text-slate-200 tw-border tw-border-slate-500 tw-rounded-lg tw-text-sm tw-font-mono"
            v-model="dataById.classes.xl"></textarea>
        </template>

      </div>
    </BuilderToolsStylesPanelEditor>
  </Draggable>
</template>