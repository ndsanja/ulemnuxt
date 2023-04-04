<script setup >
import Sortable from 'sortablejs';



const { data, displaySize } = useStore()
const classes = ref('bg-red-500 h-10 w-10 rounded-lg')

// const obj = ref<any>('')
// const positionX = ref<any>(null)
// const positionY = ref<any>(null)

// const touchStart = (e: any) => {

//   positionX.value = e.target.clientLeft
//   positionY.value = e.target.clientTop

// e.target.value.style.left = positionX.value
// e.target.value.style.top = positionY.value

//   console.log(e.target.value.style.left);
// }

// const touchMove = (e: any) => {



//   positionX.value = e.changedTouches[0].clientX
//   positionY.value = e.changedTouches[0].clientY
// }
// const touchEnd = (e: any) => {

//   console.log(e);
// }

const list = ref([
  {
    name: "task 1",
    tasks: [
      {
        name: "task 2",
        tasks: []
      }
    ]
  },
  {
    name: "task 3",
    tasks: [
      {
        name: "task 4",
        tasks: []
      }
    ]
  },
  {
    name: "task 5",
    tasks: []
  }
])



</script>

<template>
  <div class="un-cloak">
    <NestedDrag :data="data" />
  </div>
</template>
