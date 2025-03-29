<template>
    <div class="all-content">
        <div class="create-category-container">
            <div class="title">
                <h3>Add new category</h3>
            </div>
            <div class="form">
                <label for="nameNewCategory">Name of category</label>
                <input id="nameNewCategory" v-model="categoriesStore.nameCategorie" />
            </div>
            <div class="form">
                <label for="descriptionNewCategory">Description of category</label>
                <input id="descriptionNewCategory" v-model="categoriesStore.descriptionCategorie" />
            </div>
            <button 
                @click="sendCategory"  
                :disabled="isButtonDisabled"
                :class="{ 'disabled': isButtonDisabled }"
            >
                Create Category
            </button>
        </div>

        <div> 
            <button @click="toggleCategories" class="show-category">
                {{ showCategories ? 'Hide categories' : 'Show categories' }}
            </button>
        </div>

        <div class="categories" v-if="showCategories">
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
import { onMounted, computed, ref } from 'vue';

const categoriesStore = useCategoriesStore();
const showCategories = ref(false);

const categoriesComponent = computed(() => categoriesStore.categories.data);

const isButtonDisabled = computed(() => !categoriesStore.nameCategorie.trim());

onMounted(async () => {
    await categoriesStore.getCategoriesStores();
});

const toggleCategories = () => {
    showCategories.value = !showCategories.value;
};

const sendCategory = async () => {
    try {
        const newCategory = await categoriesStore.createCategory();
        
        if (newCategory?.data) {
            categoriesStore.categories.data.push(newCategory.data);
        }

        categoriesStore.nameCategorie = '';
        categoriesStore.descriptionCategorie = '';
    } catch (error) {
        console.error('Error creating category:', error);
        alert('Failed to create category!');
    }
};

const deleteCategorie = async (id) => {
    try {
        await categoriesStore.deleteCategorie(id);
        categoriesStore.categories.data = categoriesStore.categories.data.filter(category => category.id !== id);
    } catch (error) {
        console.error("Erro ao excluir categoria: " + error);
    }
};
</script>

<style scoped>
.all-content {
    align-items: center;
    justify-content: center;
    padding-top: 30px;
    margin: 40px;
}

.create-category-container {
    justify-content: center;
    border: 1px solid gray;
    max-width: 500px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 24px;
}

.title {
    text-align: center;
}

.form {
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--neutral-color-04);
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

button {
    margin-top: 20px;
    padding: 10px 16px;
    background-color: var(--secondary-color-orange);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
}

button.disabled {
    background-color: #ccc;
    color: #666;
    border-color: #aaa;
    cursor: not-allowed;
}
</style>
