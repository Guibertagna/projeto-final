<template>
  <div class="all-content">
    <div class="profile">
      <h1>Profile</h1>
      <div class="profile-card">

        <p>{{ userStore.user.name }}</p>
        <p>{{ userStore.user.email }}</p>
    
      </div>

    </div>
  </div>
</template>

<script setup>
import { useAuthenticateStore } from '@/stores/authenticate';
import { onMounted } from 'vue';

const userStore = useAuthenticateStore()
onMounted(()=>{
    console.log(userStore.user.role)
})




</script>

<style scoped>
  .all-content{
    width: 100%;
    height: auto;
  }
  .profile{
    display: flex;
    justify-content: center;  
    align-items: center;
    flex-direction: column;
    }
    .profile-card{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 70%;
      border: 1px black solid;
      margin: 30px;
    }
</style>

