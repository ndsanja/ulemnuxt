<script setup lang="ts">

const { toogleLeft, isPreview } = useStateUiBuilder()
const { addElementData } = useStore()
const { useOnDragEnd, useOnDraging, onDragStart } = useDragAndDrop()

</script>

<template>
  <div un-cloak v-show="toogleLeft" :class="{ '!tw-hidden': isPreview }"
    class="tw-min-h-[calc(100vh-40px)] tw-max-h-[calc(100vh-40px)] tw-w-[250px] tw-fixed tw-top-[40px] tw-right-0 tw-overflow-y-scroll tw-bg-slate-700 tw-text-white tw-border-l-2 tw-border-l-slate-900 tw-z-40">
    <div>
      <div
        class="tw-bg-slate-800 tw-text-white tw-text-sm tw-px-2 h-[30px] tw-flex tw-items-center tw-border-b-2 tw-border-slate-900">
        Layout
      </div>

      <div class="tw-grid tw-grid-cols-3 tw-gap-x-2 tw-gap-y-3 tw-px-2 tw-py-2">

        <div v-for="(item, index) in addElementData" :key="item.id" :data-itemId="item.id"
          :data-item="JSON.stringify(item)" :data-index="index" @mousedown.prevent="onDragStart($event, item, true, 300)"
          @mousemove.prevent="useOnDraging($event, item.id)" @mouseup.prevent="useOnDragEnd"
          @touchstart.prevent="onDragStart($event, item, true, 500)" @touchmove.prevent="useOnDraging($event, item.id)"
          @touchend.prevent="useOnDragEnd">
          <div class="tw-flex-1 tw-border-2 tw-rounded-md tw-border-slate-500 tw-h-[80px] tw-w-[80px] tw-bg-red-500">
            icon
          </div>
          <div class="tw-text-xs tw-text-center tw-mt-1">{{ item.elName }}</div>
        </div>

      </div>

    </div>
    <div>
      <div
        class="tw-bg-slate-800 tw-text-white tw-text-sm px-2 tw-h-[30px] tw-flex tw-items-center tw-border-b-2 tw-border-slate-900">
        Basic
      </div>
      <div>
        <div>Div</div>
        <div>List</div>
        <div>List Item</div>
        <div>Button</div>
        <div>Link Block</div>
        <div>Span</div>
      </div>
    </div>
    <div>
      <div
        class="tw-bg-slate-800 tw-text-white tw-text-sm px-2 tw-h-[30px] tw-flex tw-items-center tw-border-b-2 tw-border-slate-900">
        Typograpy
      </div>
      <div>
        <div>Heading</div>
        <div>Paragraph</div>
        <div>Text Link</div>
        <div>Text Block</div>
        <div>Block Quote</div>
        <div>Rich Block</div>
      </div>
    </div>
    <div>
      <div
        class="tw-bg-slate-800 tw-text-white tw-text-sm px-2 tw-h-[30px] tw-flex tw-items-center tw-border-b-2 tw-border-slate-900">
        Typograpy
      </div>
      <div>
        <div>Image</div>
        <div>Video</div>
        <div>Youtube</div>
      </div>
    </div>
    <div>
      <div
        class="tw-bg-slate-800 tw-text-white tw-text-sm px-2 tw-h-[30px] tw-flex tw-items-center tw-border-b-2 tw-border-slate-900">
        Advanced
      </div>
      <div>
        <div>Search</div>
        <div>Background VIdeo</div>
        <div>Dropdown</div>
        <div>Embed</div>
        <div>Lightbox</div>
        <div>Navbar</div>
        <div>Slider</div>
        <div>Tab</div>
        <div>Back to Top</div>
      <div>Map</div>
      <div>Faceboox</div>
      <div>Twitter</div>
      <div>WA</div>
    </div>
  </div>

</div></template>