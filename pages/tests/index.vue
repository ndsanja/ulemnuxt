<script setup>

const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const currentX = ref(0)
const currentY = ref(0)
// get the draggable element


const onStartDrag = (e) => {
  isDragging.value = true

}

const onDragMove = (e) => {
  if (!isDragging.value) return
  $(function () {
    $("#draggable").draggable({ snap: true });
    $("#draggable2").draggable({ snap: ".ui-widget-header" });
    $("#draggable3").draggable({ snap: ".ui-widget-header", snapMode: "outer" });
    $("#draggable4").draggable({ grid: [4, 4] });
    $("#draggable5").draggable({ grid: [8, 8] });
  });


  e.preventDefault();

}


const onDragEnd = (e) => {

  isDragging.value = false

}


</script>

<template>
  <div id="snaptarget" class="ui-widget-header">
    <p>I'm a snap target</p>
  </div>

  <br style="clear:both">

  <div @mousedown="onStartDrag" @mousemove="onDragMove" @mouseup="onDragEnd" @touchstart="onStartDrag"
    @touchmove="onDragMove" @touchend="onDragEnd" id="draggable" class="draggable ui-widget-content">
    <p>Default (snap: true), snaps to all other draggable elements</p>
  </div>

  <div @mousedown="onStartDrag" @mousemove="onDragMove" @mouseup="onDragEnd" @touchstart="onStartDrag"
    @touchmove="onDragMove" @touchend="onDragEnd" id="draggable2" class="draggable ui-widget-content">
    <p>I only snap to the big box</p>
  </div>

  <div @mousedown="onStartDrag" @mousemove="onDragMove" @mouseup="onDragEnd" @touchstart="onStartDrag"
    @touchmove="onDragMove" @touchend="onDragEnd" id="draggable3" class="draggable ui-widget-content">
    <p>I only snap to the outer edges of the big box</p>
  </div>

  <div @mousedown="onStartDrag" @mousemove="onDragMove" @mouseup="onDragEnd" @touchstart="onStartDrag"
    @touchmove="onDragMove" @touchend="onDragEnd" id="draggable4" class="draggable ui-widget-content">
    <p>I snap to a 20 x 20 grid</p>
  </div>

  <div @mousedown="onStartDrag" @mousemove="onDragMove" @mouseup="onDragEnd" @touchstart="onStartDrag"
    @touchmove="onDragMove" @touchend="onDragEnd" id="draggable5" class="draggable ui-widget-content">
    <p>I snap to a 80 x 80 grid</p>
  </div>
</template>


<style scoped>
.draggable {
  width: 90px;
  height: 80px;
  padding: 5px;
  float: left;
  margin: 0 10px 10px 0;
  font-size: .9em;
  background-color: salmon;
  cursor: move;
}

.ui-widget-header p,
.ui-widget-content p {
  margin: 0;
}

#snaptarget {
  height: 140px;
}
</style>