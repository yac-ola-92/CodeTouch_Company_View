<template lang="">
  <div>
    <h1>당신이 원하는대로 꾸며보세요!</h1>
    <div class="container">
      <div class="left-container"></div>
      <div class="right-container" ref="dragAreaRef">
        <dragdiv
          @DragStart="startDragging"
          @ResizeStart="startResizing"
          imgName="/images/CodeTouchBWNoText.png"
          positionX="0"
          positionY="0"
        ></dragdiv>
        <dragdiv
          @DragStart="startDragging"
          @ResizeStart="startResizing"
          imgName="/images/CodeTouchNoText.png"
          positionX="310"
          positionY="0"
        ></dragdiv>
        <throwdiv @ThrowingStart="startThrowing"></throwdiv>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, provide } from "vue";
import dragdiv from "./child/dragdiv.vue";
import throwdiv from "./child/throwdiv.vue";

const dragAreaRef = ref(null); // 드래그 가능 영역, div 포함 영역
const draggableRef = ref(null); // 여러 div 중 클릭한 요소를 가져옴
const isDragging = ref(false);
const isThrowing = ref(false);
const isResizing = ref(false);
const position = ref({ x: 0, y: 0 }); // 초기 위치
const currentValue = ref({ X: 0, Y: 0 });
const offset = ref({ X: 0, Y: 0 });
const lastValue = ref({ X: 0, Y: 0 });
const velocity = ref({ X: 0, Y: 0 });
let offsetX = 0,
  offsetY = 0;
let animationFrame;

const startDragging = (event) => {
  isDragging.value = event.isDragging;

  // 클릭한 위치와 부모 요소의 좌상단 간의 차이를 계산하여 오프셋 저장
  offsetX = event.offset.x;
  offsetY = event.offset.y;
  draggableRef.value = event.dragRef;
  position.value = event.position;
};

const startResizing = (event) => {
  isResizing.value = event.isResizing;
  draggableRef.value = event.dragRef;
  //event.stopPropagation(); // 드래그 이벤트와 충돌 방지
};

const startThrowing = (event) => {
  isThrowing.value = event.isThrowing;
  currentValue.value = event.currentValue;
  offset.value = event.offset;
  lastValue.value = event.lastValue;
  draggableRef.value = event.divRef;
};

const handleMouseMove = (event) => {
  if (isDragging.value) {
    // 부모 요소의 경계 계산
    const parentRect = dragAreaRef.value.getBoundingClientRect();
    const elementWidth = draggableRef.value.offsetWidth;
    const elementHeight = draggableRef.value.offsetHeight;

    // 새 위치 계산
    let newX = event.clientX - parentRect.left - offsetX;
    let newY = event.clientY - parentRect.top - offsetY;

    // 경계 체크 및 고정
    if (newX < 0) {
      position.value.x = 0; // 왼쪽 경계
    } else if (newX + elementWidth > parentRect.width) {
      position.value.x = parentRect.width - elementWidth; // 오른쪽 경계
    } else {
      position.value.x = newX; // 제한 범위 내에서는 자유 이동
    }

    if (newY < 0) {
      position.value.y = 0; // 위쪽 경계
    } else if (newY + elementHeight > parentRect.height) {
      position.value.y = parentRect.height - elementHeight; // 아래쪽 경계
    } else {
      position.value.y = newY; // 제한 범위 내에서는 자유 이동
    }
  }


  if (isResizing.value) {
    const parentRect = dragAreaRef.value.getBoundingClientRect();

    // 새 크기 계산 (최대 500px, 최소 200px 제한)
    const newWidth = Math.min(
      Math.max(event.clientX - draggableRef.value.getBoundingClientRect().left, 200),
      Math.min(500, parentRect.width - draggableRef.value.offsetLeft)
    );
    const newHeight = Math.min(
      Math.max(event.clientY - draggableRef.value.getBoundingClientRect().top, 200),
      Math.min(500, parentRect.height - draggableRef.value.offsetTop)
    );

    // 크기를 부모 경계와 최대/최소 크기 내로 제한
    draggableRef.value.style.width = `${newWidth}px`;
    draggableRef.value.style.height = `${newHeight}px`;
  }

  if (isThrowing.value) {
    const parentRect = draggableRef.value.parentElement.getBoundingClientRect();
    const elementWidth = draggableRef.value.offsetWidth;
    const elementHeight = draggableRef.value.offsetHeight;

    // 새 위치 계산
    let x = event.clientX - parentRect.left - offset.value.X;
    let y = event.clientY - parentRect.top - offset.value.Y;

    // 경계 체크 및 제한
    if (x < 0) {
      x = 0; // 왼쪽 경계
    } else if (x + elementWidth > parentRect.width) {
      x = parentRect.width - elementWidth; // 오른쪽 경계
    }

    if (y < 0) {
      y = 0; // 위쪽 경계
    } else if (y + elementHeight > parentRect.height) {
      y = parentRect.height - elementHeight; // 아래쪽 경계
    }

    // 속도 계산
    velocity.value.X = event.clientX - lastValue.value.X;
    velocity.value.Y = event.clientY - lastValue.value.Y;

    // 이전 값 업데이트
    lastValue.value.X = event.clientX;
    lastValue.value.Y = event.clientY;

    // 현재 위치 업데이트
    currentValue.value.X = x;
    currentValue.value.Y = y;

    draggableRef.value.style.left = `${x}px`;
    draggableRef.value.style.top = `${y}px`;
  }
};

const stopInteraction = () => {
  isDragging.value = false;
  isResizing.value = false;
  if (isThrowing.value) {
    isThrowing.value = false;

    applyInertia(draggableRef.value, velocity.value.X, velocity.value.Y);
  }
};

const applyInertia = (div, vx, vy) => {
  const friction = 0.95; // 마찰 계수
  const divWidth = div.offsetWidth;
  const divHeight = div.offsetHeight;
  const parentRect = dragAreaRef.value.getBoundingClientRect();

  function animation() {
    vx *= friction;
    vy *= friction;

    currentValue.value.X += vx;
    currentValue.value.Y += vy;

    if (currentValue.value.X < 0) {
      currentValue.value.X = 0;
      vx = -vx * 0.5;
    } else if (currentValue.value.X + divWidth > parentRect.width) {
      currentValue.value.X = parentRect.width - divWidth;
      vx = -vx * 0.5;
    }

    if (currentValue.value.Y < 0) {
      currentValue.value.Y = 0;
      vy = -vy * 0.5;
    } else if (currentValue.value.Y + divHeight > parentRect.height) {
      currentValue.value.Y = parentRect.height - divHeight;
      vy = -vy * 0.5;
    }

    div.style.left = `${currentValue.value.X}px`;
    div.style.top = `${currentValue.value.Y}px`;

    if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
      animationFrame = requestAnimationFrame(animation);
    } else {
      cancelAnimationFrame(animationFrame);
    }
  }
  animation();
};

// 전역 이벤트 리스너 추가 및 제거
onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", stopInteraction);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", stopInteraction);
});
</script>
<style scoped>
.container {
  display: flex;
  height: 600px;
  width: 1200px;
  border: solid 2px black;
}

.left-container {
  flex: 2;
  border-right: solid 2px black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  overflow: hidden; /* 내부 요소가 넘어가지 않도록 설정 */
}

.right-container {
  flex: 8;
  display: block;
  position: relative;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  overflow: hidden; /* 내부 요소가 넘어가지 않도록 설정 */
}
</style>
