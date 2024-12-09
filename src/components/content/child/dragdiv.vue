<template lang="">
  <div
    class="draggable"
    ref="draggableRef"
    @mousedown="startDragging"
    :style="{
      top: position.y + 'px',
      left: position.x + 'px',
    }"
  >
    <img :src="props.imgName">
    <div class="resizer" @mousedown="startResizing"></div>
  </div>
</template>
<script setup>
import { ref, onMounted  } from "vue";

const props = defineProps({
  imgName: String,
  positionX: Number, // 부모로부터 X 좌표
  positionY: Number, // 부모로부터 Y 좌표
});

const emit = defineEmits(["DragStart", "ResizeStart"]);
const draggableRef = ref(null);
const isDragging = ref(false);
const isResizing = ref(false);
const position = ref({ x: 0, y: 0 }); // 초기 위치
const size = ref({ width: 300, height: 300 }); // 초기 크기
let offsetX = 0,
  offsetY = 0;

// 컴포넌트 초기화 시 부모로부터 받은 값으로 위치 설정
onMounted(() => {
  position.value.x = props.positionX; // 초기 X 좌표 설정
  position.value.y = props.positionY; // 초기 Y 좌표 설정
});
const startDragging = (event) => {
  isDragging.value = true;

  // 부모 요소의 상대적인 위치를 계산
  const parentRect = draggableRef.value.parentElement.getBoundingClientRect();

  // 부모 요소도 그냥 바로 보내주기

  //divParent.value = parentRect;
  // 클릭한 위치와 부모 요소의 좌상단 간의 차이를 계산하여 오프셋 저장
  offsetX = event.clientX - parentRect.left - position.value.x;
  offsetY = event.clientY - parentRect.top - position.value.y;
  //emit("Drag", offsetX, offsetY);
  emit("DragStart", {
    dragRef: draggableRef.value,
    isDragging: isDragging.value,
    position: position.value,
    offset: {
      x: offsetX,
      y: offsetY,
    },
  });
};

const startResizing = (event) => {
  event.stopPropagation(); // 드래그 이벤트와 충돌 방지
  isResizing.value = true;

  emit("ResizeStart", {
    dragRef: draggableRef.value,
    isResizing: isResizing.value,
    size: size.value,
  });
};
</script>

<style>
.draggable {
  background-color: lightblue;
  width: 300px;
  height: 300px;
  text-align: center;
  line-height: 100px;
  border: solid 1px rgb(33, 102, 102);
  position: absolute;
  cursor: pointer;
  /* margin: 10px; */
  user-select: none; /* 텍스트 선택 방지 */
  overflow: hidden; /* 내부 요소가 넘어가지 않도록 설정 */
}

.resizer {
  width: 10px;
  height: 10px;
  background-color: gray;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: se-resize; /* 리사이즈 커서 */
  z-index: 9999;
}

.draggable img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지를 영역에 맞게 조정 */
  pointer-events: none; /* 이미지를 클릭해도 이벤트가 발생하지 않도록 설정 */
  user-select: none; /* 이미지 선택 방지 */
}
</style>
