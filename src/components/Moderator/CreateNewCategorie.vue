<template>
    <div class="all-content">
        <div class="create-category-container">
            <div class="title" v-if="!isEdit">
                <h3>Add new category</h3>
            </div>
            <div class="title" v-if="isEdit">
                <h3>Edit category</h3>
            </div>
            <div class="form">
                <label for="nameNewCategory">Name of category</label>
                <input id="nameNewCategory" v-model="categoriesStore.nameCategorie" />
            </div>
            <div class="form">
                <label for="descriptionNewCategory">Description of category</label>
                <input id="descriptionNewCategory" v-model="categoriesStore.descriptionCategorie" />
            </div>
            <button class="create-button"
                @click="sendCategory"  
                :disabled="isButtonDisabled"
                :class="{ 'disabled': isButtonDisabled }"
                v-if="!isEdit"
            >
                Create Category
            </button>
            <div class="buttons">
                <button 
                @click="sendEditCategory(selectedCategoryId)"
                :disabled="isButtonDisabled"
                :class="{ 'disabled': isButtonDisabled }"
                v-if="isEdit"
            >
                Edit Category
            </button>
            <button v-if="isEdit" class="delete-btn" @click="cancelEdit"> Cancel </button>
            </div>
        
        </div>

        <div style="align-items: center; display: flex; justify-content: center;" > 
            <button @click="toggleCategories" class="show-category">
                {{ showCategories ? 'Hide categories' : 'Show categories' }}
            </button>
        </div>

        <div class="categories" v-if="showCategories && categoriesStore.categories.data?.length > 0">
        <h1>All Categories</h1>
    <div class="category-content" >
        <div v-for="category in categoriesStore.categories.data" :key="category.id" class="category-card"  >
            <div class="category-info" >
                <h4>{{ category.name }}</h4>
                <p class="category-description">{{ category.description || "No description available" }}</p>
            </div>
            <div class="category-actions" v-if="category.name != 'Best Sellers'">
                <button class="edit-btn" @click="startEditCategory(category)">Edit</button>
                <button  class="delete-btn" @click="deleteCategorie(category.id)">Delete</button>
            </div>
            <p v-else class="not-delete">You cannot delete or change this category. </p>
        </div>
    </div>
    
</div>
<div v-if="Array.isArray(categoriesComponent) && categoriesComponent.length === 0 && !showCategories" class="empty-categories">
    <div class="empty-icon">
        <i class="fas fa-folder-open"></i> <!-- Ícone de pasta aberta -->
    </div>
    <p>No categories available.</p>
    <p class="subtext">Start by adding a new category!</p>
</div>

    </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/categories';
import { onMounted, computed, ref } from 'vue';

const categoriesStore = useCategoriesStore();
const showCategories = ref(false);
const isEdit = ref(false)
const categoriesComponent = computed(() => categoriesStore.categories.data);
const selectedCategoryId = ref(null);
const isButtonDisabled = computed(() => !categoriesStore.nameCategorie.trim());


const toggleCategories = () => {
    showCategories.value = !showCategories.value;
};
async function sendCategory() {
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
}
async function sendEditCategory(id) {
    if (!id || typeof id !== "number") {
        console.error("ID inválido:", id);
        return;
    }
    try {
        const categoryEdit = await categoriesStore.editCategoryEdit(id);
        
        if (categoryEdit?.data) {
            const index = categoriesStore.categories.data.findIndex(category => category.id === id);
            if (index !== -1) {
                categoriesStore.categories.data[index] = categoryEdit.data;
            }
        }
        cancelEdit()
        console.log("Categoria editada:", categoryEdit);

        selectedCategoryId.value = null;

    } catch (error) {
        console.error("Erro ao editar categoria:", error);
    }
}

async function deleteCategorie(id) {
    try {
        await categoriesStore.deleteCategorie(id);
        categoriesStore.categories.data = categoriesStore.categories.data.filter(function(category) {
            return category.id !== id;
        });
    } catch (error) {
        console.error("Erro ao excluir categoria: " + error);
    }
}
async function startEditCategory(category) {
 
        
        if (category) {
            categoriesStore.nameCategorie = category.name;
            categoriesStore.descriptionCategorie = category.description;
            selectedCategoryId.value = category.id;  
            isEdit.value = true; 
            window.scrollTo({ top: 200, behavior: "smooth" });
        }
   
}

function cancelEdit (){
    categoriesStore.nameCategorie = '';
        categoriesStore.descriptionCategorie = '';
        isEdit.value = false;

}
</script>

<style scoped>
.all-content {
    width: 100%;
    height: auto;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
    margin: 40px;
}

.create-category-container {
    justify-content: center;
    border: 1px solid gray;
    width: 500px;
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
.not-delete{
    
    font-size: 15px;
}
.categories {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: auto;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
}

.category-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-content: start;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 20px;
}

.category-card {
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    width: 250px;
    height: 200px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--primary-color);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
    transform: translateY(-5px);
}

.category-info h4 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.category-description {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
}

.category-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.edit-btn {
    background-color: var(--secondary-color-orange);
    color: white;
}

.edit-btn:hover {
    background-color: var(--secondary-color-orange);
}

.delete-btn {
    background-color: #f44336;
    color: white;
}

.delete-btn:hover {
    background-color: #d32f2f;
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
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
}
.buttons{
    display: flex;
    justify-content: space-between;
}
button.disabled {
    background-color: #ccc;
    color: #666;
    border-color: #aaa;
    cursor: not-allowed;
}
.create-button{
    width: 100%;
   

}
.empty-categories {
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
}
.empty-icon {
    font-size: 50px;
    color: #ccc;
    margin-bottom: 10px;
}
.subtext {
    color: #6c757d;
    font-size: 14px;
}
.show-category{
    background-color: var(--secondary-color-orange);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px 20px;
    transition: 0.3s;
}

</style>
