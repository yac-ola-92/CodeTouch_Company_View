<template>
  <div ref="throwDiv" class="throw-able" @mousedown="startThrowing">
    <img src="/images/CodeTouchNoText.png" draggable="false" width="200px" height="200px">
  </div>
</template>
<script setup>
import { ref } from "vue";

const emit = defineEmits("ThrowingStart");

const throwDiv = ref(null);
const isThrowing = ref(true);
const currentX = ref(0);
const currentY = ref(0);
const offsetX = ref(0);
const offsetY = ref(0);
const lastX = ref(0);
const lastY = ref(0);

const startThrowing = (event) => {
  isThrowing.value = true;

  // 부모 요소의 경계를 가져옴
  const parentRect = throwDiv.value.parentElement.getBoundingClientRect();
  const rect = throwDiv.value.getBoundingClientRect();

  // 부모 기준으로 offset 계산
  offsetX.value =
    event.clientX - parentRect.left - (rect.left - parentRect.left);
  offsetY.value = event.clientY - parentRect.top - (rect.top - parentRect.top);

  // 현재 X, Y 값 설정
  currentX.value = rect.left - parentRect.left;
  currentY.value = rect.top - parentRect.top;

  emit("ThrowingStart", {
    isThrowing: isThrowing.value,
    currentValue: {
      X: currentX.value,
      Y: currentY.value,
    },
    offset: {
      X: offsetX.value,
      Y: offsetY.value,
    },
    lastValue: {
      X: lastX.value,
      Y: lastY.value,
    },
    divRef: throwDiv.value,
  });
};
</script>
<style>
.throw-able {
  background-color: lightblue;
  width: 200px;
  height: 200px;
  top: 310px;
  text-align: center;
  line-height: 100px;
  border: solid 1px rgb(33, 102, 102);
  position: absolute;
  cursor: pointer;
  /* margin: 10px; */
  user-select: none; /* 텍스트 선택 방지 */
  overflow: hidden; /* 내부 요소가 넘어가지 않도록 설정 */
}
</style>
