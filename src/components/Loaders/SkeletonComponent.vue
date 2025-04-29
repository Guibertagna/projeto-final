<template>
  <div class="skeleton-wrapper">
    <div class="skeleton-card-1">
      <div class="skeleton-img"></div>
      <div class="skeleton-text title"></div>
      <div class="skeleton-text price"></div>
      <div class="skeleton-button"></div>
      <div class="skeleton-rating"></div>
    </div>
    <div class="skeleton-card-2">
      <div class="skeleton-img"></div>
      <div class="skeleton-text title"></div>
      <div class="skeleton-text price"></div>
      <div class="skeleton-button"></div>
      <div class="skeleton-rating"></div>
    </div>
    <div class="skeleton-card-3">
      <div class="skeleton-img"></div>
      <div class="skeleton-text title"></div>
      <div class="skeleton-text price"></div>
      <div class="skeleton-button"></div>
      <div class="skeleton-rating"></div>
    </div>
    <div class="skeleton-card-4">
      <div class="skeleton-img"></div>
      <div class="skeleton-text title"></div>
      <div class="skeleton-text price"></div>
      <div class="skeleton-button"></div>
      <div class="skeleton-rating"></div>
    </div>
    <div class="skeleton-card-5">
      <div class="skeleton-img"></div>
      <div class="skeleton-text title"></div>
      <div class="skeleton-text price"></div>
      <div class="skeleton-button"></div>
      <div class="skeleton-rating"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.skeleton-wrapper{
  display: flex;

}
.skeleton-card-1, .skeleton-card-2, .skeleton-card-3, .skeleton-card-4, .skeleton-card-5, .skeleton-card-6{
  width: 250px;
  min-height: 300px;
  background: var(--neutral-color-01);
  border: 1px solid var(--neutral-color-03);
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: pulse 1.5s infinite;
}

.skeleton-img {
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.skeleton-text {
  height: 16px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-top: 10px;
}

.skeleton-text.title {
  width: 80%;
}

.skeleton-text.price {
  width: 50%;
}

.skeleton-button {
  width: 100%;
  height: 40px;
  background-color: #d0d0d0;
  border-radius: 6px;
  margin-top: 20px;
}

.skeleton-rating {
  width: 60%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin: 10px auto 0;
}

@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
@media (max-width: 768px) {
  .skeleton-card-3, .skeleton-card-4, .skeleton-card-5, .skeleton-card-6{
    display: none;
  }

}
</style>
