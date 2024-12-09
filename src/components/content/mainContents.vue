<script></script>
<template>
  <div>
    <h1 class="fade-in-scale">
      C<span class="video-container">
        <video autoplay loop muted playsinline>
          <source src="/video/exam1.mp4" type="video/mp4" />
        </video> </span
      >DE T
      <span class="video-container">
        <video autoplay loop muted playsinline>
          <source src="/video/exam2.mp4" type="video/mp4" />
        </video> </span
      >UCH
    </h1>
    <p class="fade-in-text">당신의 아이디어를 실현하는 플랫폼</p>
  </div>
</template>
<style>
/* Code Touch 애니메이션 */
.fade-in-scale {
  font-size: 6rem; /* 텍스트 크기 확대 */
  font-weight: bold;
  opacity: 0; /* 처음에 보이지 않음 */
  transform: scale(0.5); /* 작게 시작 */
  animation: fadeInScale 2s ease-out forwards;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* O에 동영상 넣기 */
.video-container {
  display: inline-block;
  width: 1em; /* 글자 크기와 동일한 크기 */
  height: 1em; /* 글자 크기와 동일한 크기 */
  position: relative;
  overflow: hidden;
  border-radius: 50%; /* 기본 원형 */
  border: 5px solid black; /* 테두리 */
  vertical-align: middle;
  transition: all 0.7s ease-in-out; /* 모든 속성을 부드럽게 전환 */
}

/* 마우스를 올렸을 때 동영상 확장 */
.video-container:hover {
  width: 300px; /* 원하는 크기로 확장 */
  height: 200px; /* 원하는 크기로 확장 */
  border-radius: 0; /* 사각형으로 변경 */
  border: 0cap; /* 테두리 지우기 */
  transform: none; /* 확대된 상태 유지 */
}

/* 동영상 스타일 */
.video-container video {
  width: 100%; /* 컨테이너 전체 크기 */
  height: 100%; /* 컨테이너 전체 크기 */
  object-fit: cover; /* 동영상이 컨테이너 크기에 맞도록 */
  display: block; /* 여백 제거를 위해 block 요소로 설정 */
}

/* 부제목 애니메이션 */
.fade-in-text {
  font-size: 1.8rem; /* 부제목 크기 확대 */
  margin-top: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInText 2s 0.5s ease-out forwards;
}

/* 애니메이션 정의 */
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInText {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
