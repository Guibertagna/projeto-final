<template>
  <div class="all-content">
    <div v-if="userStore.user.role == 'ADMIN'">
        <button class="button-create">Create new product</button>
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

</style>

