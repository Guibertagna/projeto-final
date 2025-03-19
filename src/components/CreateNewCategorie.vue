<template>
    <div class="create-categorie-container">
        <label for="nameNewCategory"> Name of category</label>
        <input id="nameNewCategory" v-model="categoriesStore.nameCategorie">
        <br>
        <label for="descriptionNewCategory"> Describe of category</label>
        <input  id="descriptionNewCategory" v-model="categoriesStore.descripitonCategorie">
        <button @click="sendCategory()">HAHAHAHA</button>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useCategoriesStore } from '@/stores/categories';

const categoriesStore = useCategoriesStore();
async function sendCategory() {
    await categoriesStore.createCategory(); // Sem precisar passar dados diretamente
}
</script>
<style scoped>

</style>