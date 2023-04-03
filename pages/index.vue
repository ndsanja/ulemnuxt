<script setup lang="ts">

const { data, displaySize } = useStore()
const classes = ref('bg-red-500 h-10 w-10 rounded-lg')

const obj = ref<any>('')
const positionX = ref<any>(null)
const positionY = ref<any>(null)

// const touchStart = (e: any) => {

//   positionX.value = e.target.clientLeft
//   positionY.value = e.target.clientTop

// e.target.value.style.left = positionX.value
// e.target.value.style.top = positionY.value

//   console.log(e.target.value.style.left);
// }

const touchMove = (e: any) => {



  positionX.value = e.changedTouches[0].clientX
  positionY.value = e.changedTouches[0].clientY
}
const touchEnd = (e: any) => {

  console.log(e);
}



</script>

<template>
  <div class="un-cloak">
    <NuxtLink to="/builder">Builder</NuxtLink>

    <div class="h-10 w-[100px] bg-blue-500 fixed" :style="`left: ${positionX}px; top: ${positionY}px;`" :draggable="true"
      @touchmove.self.prevent="touchMove($event)" @touchend="touchEnd($event)">

    </div>
    <div :class="classes"></div>
    <input type="text" v-model="classes" />
  </div>
</template>
