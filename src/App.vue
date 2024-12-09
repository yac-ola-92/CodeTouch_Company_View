<template>
  <div class="app-container">
    <HeaderComponent />
    <div class="content-wrapper">
      <main class="main-content">
        <router-view></router-view>
      </main>
      <footer-component />
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from './components/Header.vue'
import FooterComponent from './components/Footer.vue'
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 20px;
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>