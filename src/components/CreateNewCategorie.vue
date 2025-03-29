<template>
    <div class="all-content">
        <div class="create-category-container">
            <label for="nameNewCategory">Name of category</label>
            <input id="nameNewCategory" v-model="categoriesStore.nameCategorie" />
            <label for="descriptionNewCategory">Description of category</label>
            <input id="descriptionNewCategory" v-model="categoriesStore.descripitonCategorie" />
            <button @click="sendCategory">Create Category</button>
        </div>
        <div class="categories">
            <h1>All categories</h1>
            <div class="category-content">
                <div v-for="category in categoriesComponent" :key="category.id" class="category">
                    <h4>{{ category.name }}</h4>
                    <button @click="deleteCategorie(category.id)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/categories';
import { onMounted, computed } from 'vue';

const categoriesStore = useCategoriesStore();

// Computed para refletir automaticamente as mudanças no store
const categoriesComponent = computed(() => categoriesStore.categories.data);

onMounted(async () => {
    await categoriesStore.getCategoriesStores();
});

async function sendCategory() {
    try {
        const newCategory = await categoriesStore.createCategory();
        
        if (newCategory && newCategory.data) {
            categoriesStore.categories.data.push(newCategory.data); // Adiciona à lista sem refazer a requisição
        }

        // Resetando os campos
        categoriesStore.nameCategorie = '';
        categoriesStore.descripitonCategorie = '';
    } catch (error) {
        console.error('Error creating category:', error);
        alert('Failed to create category!');
    }
}

async function deleteCategorie(id) {
    try {
        await categoriesStore.deleteCategorie(id);
        // Remove a categoria do store localmente
        categoriesStore.categories.data = categoriesStore.categories.data.filter(category => category.id !== id);
    } catch (error) {
        console.error("Erro ao excluir categoria: " + error);
    }
}
</script>

<style scoped>
.all-content {
    width: auto;
}

.create-category-container {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

label {
    margin-bottom: 8px;
    font-weight: bold;
}

input {
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px 16px;
    background-color: var(--secondary-color-orange);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
