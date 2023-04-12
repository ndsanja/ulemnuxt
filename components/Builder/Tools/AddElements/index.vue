<script setup lang="ts">

const { toogleLeft, isPreview } = useStateUiBuilder()
const { addElementData } = useStore()
const { drag, dragOver, drop, useOnDragStart, useOnDragEnd, useOnDraging, isDraging, overlapItemId, dragItemId, onDragStart } = useDragAndDrop()

const handleClick = (e: any) => {
  // console.log(e);

}
</script>

<template>
  <div un-cloak v-show="toogleLeft" :class="{ '!hidden': isPreview }"
    class="min-h-[calc(100vh-40px)] max-h-[calc(100vh-40px)] w-[250px] fixed top-[40px] right-0 overflow-y-scroll bg-slate-700 text-white border-l-2 border-l-slate-900 z-40">
    <div>
      <div class="bg-slate-800 text-white text-sm px-2 h-[30px] flex items-center border-b-2 border-slate-900">Layout
      </div>

      <div class="grid grid-cols-3 gap-x-2 gap-y-3 px-2 py-2">

        <div v-for="(item, index) in addElementData" :key="item.id" :data-itemId="item.id"
          :data-item="JSON.stringify(item)" :data-index="index" @mousedown.prevent="onDragStart($event, item, true, 300)"
          @mousemove.prevent="useOnDraging($event, item.id)" @mouseup.prevent="useOnDragEnd"
          @touchstart.prevent="onDragStart($event, item, true, 500)" @touchmove.prevent="useOnDraging($event, item.id)"
          @touchend.prevent="useOnDragEnd">
          <div class="flex-1 border-2 rounded-md border-slate-500 h-80px w-80px bg-red">
            icon
          </div>
          <div class="text-xs text-center mt-1">{{ item.elName }}</div>
        </div>

      </div>

    </div>
    <div>
      <div class="bg-slate-800 text-white text-sm px-2 h-[30px] flex items-center border-b-2 border-slate-900">Basic
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
      <div class="bg-slate-800 text-white text-sm px-2 h-[30px] flex items-center border-b-2 border-slate-900">Typograpy
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
      <div class="bg-slate-800 text-white text-sm px-2 h-[30px] flex items-center border-b-2 border-slate-900">Typograpy
      </div>
      <div>
        <div>Image</div>
        <div>Video</div>
        <div>Youtube</div>
      </div>
    </div>
    <div>
      <div class="bg-slate-800 text-white text-sm px-2 h-[30px] flex items-center border-b-2 border-slate-900">Advanced
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

  </div>
</template>