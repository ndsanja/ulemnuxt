<script setup lang="ts">
import { UseDraggable as Draggable } from '@vueuse/components'
const { setDisplay, display, isPreview, isFit } = useStateUiBuilder()
const { dataById, baseClasses, filterClasses, id } = useStore()
const { editorItemSelectedId, editorItemById } = useEditor()


const { width, height } = useWindowSize()

const handle = ref<HTMLElement | null>(null)
const toogleEditor = ref(true)
const toBottom = ref(true)
const styleBreakpoint = ref('xs')


const changeStyleBreakpoint = (breakpoint: any) => {
  styleBreakpoint.value = breakpoint
}

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
          <span v-if="editorItemById.id">
            {{
              editorItemById.elName
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
            <span v-if="editorItemById.id">
              {{
                editorItemById.elName
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
        <p v-if="styleBreakpoint == 'xs'" class="">XS Breakpoint </p>
        <p v-if="styleBreakpoint == 'sm'" class="">SM Breakpoint </p>
        <p v-if="styleBreakpoint == 'md'" class="">MD Breakpoint </p>
        <p v-if="styleBreakpoint == 'lg'" class="">LG Breakpoint </p>
        <p v-if="styleBreakpoint == 'xl'" class="">XL Breakpoint </p>

        <p v-if="styleBreakpoint == 'sm'" class="">use prefix <b class="tw-text-base">sm:</b> </p>
        <p v-if="styleBreakpoint == 'md'" class="">use prefix <b class="tw-text-base">md:</b> </p>
        <p v-if="styleBreakpoint == 'lg'" class="">use prefix <b class="tw-text-base">lg:</b> </p>
        <p v-if="styleBreakpoint == 'xl'" class="">use prefix <b class="tw-text-base">xl:</b> </p>
      </div>
    </BuilderToolsStylesPanelEditor>

    <BuilderToolsStylesPanelEditor un-cloak v-if="toogleEditor">
      <template #title>
        <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
          <p class="tw-text-xs"> Editor </p>
        </div>
      </template>
      <div :class="{ 'tw-bg-slate-700 tw-min-h-full': true }">
        <template v-if="editorItemById.classes">
          <textarea :spellcheck="false" v-if="styleBreakpoint == 'xs'" :class="{ 'tw-min-h-[100px]': true }"
            placeholder="No style write here..."
            class="tw-overflow-hidden tw-w-full tw-p-1 tw-pt-2 tw-pb-3 tw-mt-1 tw-mb-2 tw-bg-slate-900 tw-text-slate-200 tw-border tw-border-slate-500 tw-rounded-lg tw-text-sm tw-font-mono"
            v-model="editorItemById.classes"></textarea>
        </template>
      </div>
    </BuilderToolsStylesPanelEditor>
  </Draggable>
</template>