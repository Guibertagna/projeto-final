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
                <input v-if="!isEdit" id="nameNewCategory" v-model="categoriesStore.nameCategorie" />
                <input v-if="isEdit" id="nameNewCategory" />
            </div>
            <div class="form">
                <label for="descriptionNewCategory">Description of category</label>
                <textarea v-if="!isEdit" id="descriptionNewCategory" v-model="categoriesStore.descriptionCategorie" />
                <textarea v-if="isEdit" id="descriptionNewCategory" />
            </div>
            <button class="create-button"
                @click="sendCategory"  
                :disabled="isButtonDisabled "
                :class="{ 'disabled': isButtonDisabled || isEdit}"
            
            >
                Create Category
            </button>
    
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
                <button class="delete-btn" @click="confirmDelete(category)">Delete</button>
            </div>
            <p v-else class="not-delete">You cannot delete or change this category. </p>
        </div>
    </div>

    <div v-if="isEdit" class="modal-overlay">
  <div class="modal-content">
    <h2>Edit Category</h2>
    <label>Name</label>
    <input  v-model="categoriesStore.nameCategorie" type="text" />

    <label>Description</label>
    <textarea v-model="categoriesStore.descriptionCategorie" rows="4"></textarea>

    <div class="modal-buttons">
      <button @click="sendEditCategory(selectedCategoryId)">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
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
<LoaderComponent/>
<AlertBoxComponent :visible="showAlert" :message="massageOK" @close="showAlert = false"/>
<ConfirmComponent
:nameconfirm="confirMessage"
  :visible="showConfirm"
  @cancel="showConfirm = false"
  @confirm="deleteCategorie(), showConfirm = false"
/>
    </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/categories';
import { computed, ref } from 'vue';

import { useLoader } from '@/stores/loader';
import LoaderComponent from '../Loaders/LoaderComponent.vue';
import AlertBoxComponent from '../Loaders/AlertBoxComponent.vue';
import ConfirmComponent from '../Loaders/ConfirmComponent.vue';
const categoryToDelete = ref(null);
const confirMessage = ref('')

const categoriesStore = useCategoriesStore();
const showCategories = ref(false);
const isEdit = ref(false)
const categoriesComponent = computed(() => categoriesStore.categories.data);
const selectedCategoryId = ref(null);
const isButtonDisabled = computed(() => !categoriesStore.nameCategorie.trim());
const loading = useLoader()
const showConfirm = ref(false)
const showAlert = ref(false)
const massageOK = ref('')
const toggleCategories = () => {
    showCategories.value = !showCategories.value;
};
function confirmDelete(category) {
    categoryToDelete.value = category.id;
    confirMessage.value = category.name;
    showConfirm.value = true;
}
async function sendCategory() {
    try {
        loading.startLoading()
        const newCategory = await categoriesStore.createCategory();
        
        if (newCategory.status === 201) {
            categoriesStore.categories.data.push(newCategory.data);
        }
        categoriesStore.nameCategorie = '';
        categoriesStore.descriptionCategorie = '';
        loading.endLoading()
        massageOK.value = "Category created successfully!"
        showAlert.value = true
    } catch (error) {
        console.error('Error creating category:', error);
        loading.endLoading()
        massageOK.value = "Error creating category try again"
        showAlert.value = true
        alert('Failed to create category!');
    }
}

async function sendEditCategory(id) {
    if (!id || typeof id !== "number") {
        console.error("ID inválido:", id);
        return;
    }
    try {
        loading.startLoading()
        const categoryEdit = await categoriesStore.editCategoryEdit(id);
        
        if (categoryEdit.status === 200) {
            const index = categoriesStore.categories.data.findIndex(category => category.id === id);
            if (index !== -1) {
                categoriesStore.categories.data[index] = categoryEdit.data;
            }
        }
        cancelEdit()
        loading.endLoading()
        massageOK.value ="Category edited successfully!"
        showAlert.value = true
        selectedCategoryId.value = null;

    } catch (error) {
        console.error("Erro ao editar categoria:", error);
    }
}

async function deleteCategorie() {
    try {
        loading.startLoading()
        await categoriesStore.deleteCategorie(categoryToDelete.value);
        categoriesStore.categories.data = categoriesStore.categories.data.filter(function(category) {
            loading.endLoading()
            massageOK.value ="Category deleted successfully!"
            showAlert.value = true
            return category.id !== categoryToDelete.value;
        });

    } catch (error) {
        loading.endLoading()
        
    }
}
async function startEditCategory(category) {
        
        if (category) {
            categoriesStore.nameCategorie = category.name;
            categoriesStore.descriptionCategorie = category.description;
            selectedCategoryId.value = category.id;  
            isEdit.value = true; 

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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
    width: 300px;
  height: 260px;
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
textarea{
    min-width: 100%;
    max-width: 100%;
    height:  100px;
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;

}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.modal-buttons button {
  margin-left: 0.5rem;
}
</style>
