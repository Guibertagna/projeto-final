<template>
  <div class="container-page">
    <div class="logo-container">
      <img src="@/assets/logo.png" class="logo-img" alt="Logo">
    </div>
<RegisterLoginComponent/>
  </div>
</template>
<script setup>

import RegisterLoginComponent from './RegisterLoginComponent.vue';
</script>

<style scoped>
.container-page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
}

.logo-container {
  background-color: var(--secondary-color-orange);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vh;
}

.logo-img {
  width: 250px;
  height: 250px;
}


</style>
