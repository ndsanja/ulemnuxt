<script setup lang="ts">
import { UseDraggable as Draggable } from '@vueuse/components'
const { setDisplay, display, isPreview, isFit } = useStateUiBuilder()
const { dataById, xs, sm, md, lg, xl, displaySize } = useStore()

const { width, height } = useWindowSize()

const handle = ref<HTMLElement | null>(null)
const toogleEditor = ref(true)
const toBottom = ref(false)

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
  <BuilderToolsStylesPanelEditor un-cloack v-if="toBottom" class="fixed z-40 left-[5px] bottom-[5px] rounded w-[250px]"
    :class="{ '!hidden': isPreview }">
    <template #title>
      <div class="flex items-center w-full">
        <p class="flex-1">Element
          {{
            dataById?.id
          }}
        </p>
        <div v-if="toBottom" @click="clickExpanded" class="cursor-pointer">
          <Icon name="mdi:window-maximize" />
        </div>
      </div>
    </template>
  </BuilderToolsStylesPanelEditor>
  <Draggable un-cloak v-slot="{ x, y }" v-show="!toBottom"
    :style="`left: ${(positionX / width) * 100 <= 100 ? (positionX / width) * 100 : 45}vw; top: ${(positionY / height) * 100 <= 100 ? (positionY / height) * 100 : 60}vh`"
    class="fixed z-40 rounded w-[250px] overflow-y-auto overflow-x-hidden bg-white !min-h-fit !max-h-fit border-2 border-slate-900"
    :class="{ '!hidden': isPreview }" :initial-value="{ x: 80, y: 100 }" :prevent-default="true" :handle="handle">

    <BuilderToolsStylesPanelEditor>
      <template #title>
        <div class="flex items-center w-full" :ondrag="positionX = x">
          <p :ondrag="positionY = y" ref="handle" :class="{ 'cursor-move': true }"
            class="flex-1 flex items-center space-x-1 text-[11px]">
            <Icon name="ci:main-component" class="text-[16px]" />
            <span v-if="dataById.id">

              {{
                dataById.id
              }}
            </span>
            <span v-else>No item Selected</span>
          </p>
          <div v-if="!toBottom" @click="clickToBottom" class="cursor-pointer">
            <Icon name="heroicons:minus-small-solid" />
          </div>
          <div @click="toogleEditor = !toogleEditor" class="ml-3 cursor-pointer">
            <Icon v-if="toogleEditor" name="heroicons:chevron-up-solid" />
            <Icon v-else name="heroicons:chevron-up-solid" class="rotate-180" />
          </div>
        </div>
      </template>

      <div v-if="toogleEditor" class="text-center text-white text-xs">
        <p v-if="xs" class="">XS Breakpoint </p>
        <p v-if="sm" class="">SM Breakpoint </p>
        <p v-if="md" class="">MD Breakpoint </p>
        <p v-if="lg" class="">LG Breakpoint </p>
        <p v-if="xl" class="">XL Breakpoint </p>
        <!-- <p v-if="xxl" class="">2XL Breakpoint </p> -->

        <p v-if="sm" class="">use prefix <b class="text-base">sm:</b> </p>
        <p v-if="md" class="">use prefix <b class="text-base">md:</b> </p>
        <p v-if="lg" class="">use prefix <b class="text-base">lg:</b> </p>
        <p v-if="xl" class="">use prefix <b class="text-base">xl:</b> </p>
        <!-- <p v-if="xxl" class="text-sm">use prefix <b class="text-base">2xl:</b> </p> -->
      </div>
    </BuilderToolsStylesPanelEditor>

    <BuilderToolsStylesPanelEditor un-cloak v-if="toogleEditor">
      <template #title>
        <div class="flex items-center justify-between w-full">
          <p class="text-xs"> Editor </p>
          <div v-if="!isFit" un-cloak class="text-xs flex items-center justify-end space-x-2">
            <div v-if="dataById?.classes?.xs?.length" @click="setDisplay('xs')"
              :class="{ 'cursor-pointer': true, 'text-sm font-bold text-blue-500': display == 'xs' }">xs</div>
            <div v-if="dataById?.classes?.sm?.length" @click="setDisplay('sm')"
              :class="{ 'cursor-pointer': true, 'text-sm font-bold text-blue-500': display == 'sm' }">sm</div>
            <div v-if="dataById?.classes?.md?.length" @click="setDisplay('md')"
              :class="{ 'cursor-pointer': true, 'text-sm font-bold text-blue-500': display == 'md' }">md</div>
            <div v-if="dataById?.classes?.lg?.length" @click="setDisplay('lg')"
              :class="{ 'cursor-pointer': true, 'text-sm font-bold text-blue-500': display == 'lg' }">lg</div>
            <div v-if="dataById?.classes?.xl?.length" @click="setDisplay('xl')"
              :class="{ 'cursor-pointer': true, 'text-sm font-bold text-blue-500': display == 'xl' }">xl</div>
          </div>
          <div v-if="isFit" un-cloak class="text-xs flex items-center justify-end space-x-2">
            <div v-if="dataById?.classes?.xs?.length" @click="setDisplay('xs')"
              :class="{ 'cursor-pointer': true, 'text-sm font-bold text-blue-500': displaySize < Breakpoints.sm }">xs
            </div>
            <div v-if="dataById?.classes?.sm?.length" @click="setDisplay('sm')"
              :class="{ 'cursor-pointer': true, 'text-sm font-bold text-blue-500': displaySize >= Breakpoints.sm && displaySize < Breakpoints.md }">
              sm</div>
            <div v-if="dataById?.classes?.md?.length" @click="setDisplay('md')"
              :class="{ 'cursor-pointer': true, 'text-sm font-bold text-blue-500': displaySize >= Breakpoints.md && displaySize < Breakpoints.lg }">
              md</div>
            <div v-if="dataById?.classes?.lg?.length" @click="setDisplay('lg')"
              :class="{ 'cursor-pointer': true, 'text-sm font-bold text-blue-500': displaySize >= Breakpoints.lg && displaySize < Breakpoints.xl }">
              lg</div>
            <div v-if="dataById?.classes?.xl?.length" @click="setDisplay('xl')"
              :class="{ 'cursor-pointer': true, 'text-sm font-bold text-blue-500': displaySize >= Breakpoints.xl }">xl
            </div>
          </div>
        </div>
      </template>

      <div :class="{ 'bg-slate-700 min-h-screen !min-h-full': true }">
        <template v-if="dataById.classes">
          <textarea v-if="xs" :class="{ '!min-h-[100px]': true }" placeholder="No style in XS Breakpoint, write here..."
            class="min-h-[300px] w-full p-1 mt-1 mb-2 bg-slate-900 text-slate-200 border border-slate-500 rounded-lg text-sm font-mono"
            v-model="dataById.classes.xs"></textarea>
        </template>
        <template v-if="dataById.classes">
          <textarea v-if="sm" :class="{ '!min-h-[100px]': true }" placeholder="No style in SM Breakpoint, write here..."
            class="min-h-[300px] w-full p-1 mt-1 mb-2 bg-slate-900 text-slate-200 border border-slate-500 rounded-lg text-sm font-mono"
            v-model="dataById.classes.sm"></textarea>
        </template>
        <template v-if="dataById.classes">
          <textarea v-if="md" :class="{ '!min-h-[100px]': true }" placeholder="No style in MD Breakpoint, write here..."
            class="min-h-[300px] w-full p-1 mt-1 mb-2 bg-slate-900 text-slate-200 border border-slate-500 rounded-lg text-sm font-mono"
            v-model="dataById.classes.md"></textarea>
        </template>
        <template v-if="dataById.classes">
          <textarea v-if="lg" :class="{ '!min-h-[100px]': true }" placeholder="No style in LG Breakpoint, write here..."
            class="min-h-[300px] w-full p-1 mt-1 mb-2 bg-slate-900 text-slate-200 border border-slate-500 rounded-lg text-sm font-mono"
            v-model="dataById.classes.lg"></textarea>
        </template>
        <template v-if="dataById.classes">
          <textarea v-if="xl" :class="{ '!min-h-[100px]': true }" placeholder="No style in XL Breakpoint, write here..."
            class="min-h-[300px] w-full p-1 mt-1 mb-2 bg-slate-900 text-slate-200 border border-slate-500 rounded-lg text-sm font-mono"
            v-model="dataById.classes.xl"></textarea>
        </template>

      </div>
    </BuilderToolsStylesPanelEditor>
  </Draggable>
</template>