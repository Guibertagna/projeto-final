<template>
    <div class="all-content">
      <div class="details">
        <DetailPdroduct :id-props="route.params" />
      </div>
  
      <div class="recommended-section">
        <div class="heading">
          <h3 class="title">Recommended Products</h3>
        </div>
  
        <div class="card-products">
          <Recomendation />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import DetailPdroduct from '@/components/Products/DetailPdroduct.vue';
  import Recomendation from '@/components/Products/Recomendation.vue';
  
  const route = useRoute();
  </script>
  
  <style scoped>
  .all-content {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .details {
    width: 100%;
    margin-bottom: 40px;
  }
  
  .recommended-section {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #f9f9f9;
    padding: 30px 20px;

  }
  
  .heading {
    width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;

}
  
  .title {
    font-size: 24px;
    font-weight: 700;
    color: #333;
  }
  


.card-products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
  </style>
  