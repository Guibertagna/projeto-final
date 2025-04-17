<template>
    <div class="all-content">
        <div class="card-create">
           <div class="title">
                <h3 >Add new product</h3>
            </div>
            <div class="form">
                <label for="name">Name of product</label>
                <input placeholder="name" v-model="getProducts.productName" id="name" type="text">
            </div>
            <div class="form" >
                <label for="description">Description of product</label>
                <textarea  placeholder=" Describe the product" id="description" v-model="getProducts.productDescription"> </textarea>
            </div>
            <div class="form-price" >
                <div class="price"> 
                    <label for="price">Price of product</label> 
                    <input type="number" placeholder="Price" v-model="getProducts.productPrice" id="price">
                        
                </div>
                    
                <div class="stock">
                    <label for="stock">Stock of product</label>
                    <input placeholder="stock" v-model="getProducts.productStock" id="stock" type="number">
                </div>
            </div>
                
            <div class="form">
                <label for="category">Category of product</label>
                <select placeholder="category name" v-model="getProducts.productCategory_id" id="category">
                    <option v-for="category in category.categories.data " :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
                
            <div class="image-container" style="padding-top: 30px; padding-bottom: 30px;">
                <label for="image">Image of product</label>
                <div class="image">
                    <label for="image" class="upload-area">
                        <div>
                            <svg width="32" height="32" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                            </svg>
                        </div>
                        <p>click to upload an image</p>
                        <p class="upload-hint">PNG, JPG ou JPEG</p>
                    </label>
                    <input type="file" @change="handleFileUpload" id="image" style="display: none;" accept=".png, .jpg, .jpeg">
                </div>
                <p v-if="getProducts.productImg" class="selected-file">
                    Selected file: {{ getProducts.productImg.name }}
                </p>
            </div>
            <button  :disabled="isFormValid " :class="{ 'disabled': isFormValid }" @click="sendProduct()" class="submit">Create Product</button>
        </div> 
        <div class="card-products-container">
  <div class="title">
    <h1>All Products</h1>
  </div>
  <div class="card-products-grid">
    <div v-for="product in getProducts.products" :key="product.id" class="card-product">
      <img :src="getImg(product.image_path)" alt="Product Image" class="product-image" />
      <div class="card-body">
        <h4>{{ product.name.slice(0, 50) }}{{ product.name.length > 50 ? '...' : '' }}</h4>
        <p class="description">{{ product.description.slice(0, 50) }}{{ product.description.length > 50 ? '...' : '' }}</p>

        <p class="price"><strong>Price:</strong> ${{ product.price }}</p>
        <p class="stock"><strong>Stock:</strong> {{ product.stock }}</p>
      </div>
      <div class="buttons"> 
      <button class="delete-btn" @click="startEditProduct(product) ">
        Edit
      </button>
      <button class="delete-btn" style="background-color: red;" @click="getProducts.deleteProduct(product.id)">
        Delete
      </button>
    </div>
    
    </div>
  </div>
</div>
<div class="modal-products" v-if="isEdit">
         <div class="modal-content">
            <div class="title">
                <h3 >Edit product</h3>
            </div>
            <div class="form">
                <label for="name">Name of product</label>
                <input placeholder="name" v-model="getProducts.productName" id="name" type="text">
            </div>
            
            <div class="form-price" >
                <div class="price"> 
                    <label for="price">Price of product</label> 
                    <input type="number" placeholder="Price" v-model="getProducts.productPrice" id="price">
                        
                </div>
                    
                
            </div>
                
            <div class="form">
                <label for="category">Category of product</label>
                <select placeholder="category name" v-model="getProducts.productCategory_id" id="category">
                    <option v-for="category in category.categories.data " :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
                
            
            <div class="modal-buttons">
                <button @click="sendEditProduct(getProducts.productId)">Save</button>
                <button @click="cancelEdit">Cancel</button>
            </div>
        </div> 
        </div>
    </div>
    
</template>

<script setup>

import { useCategoriesStore } from '@/stores/categories';
import {  computed, ref } from 'vue';
import { useGetProducts } from '@/stores/getProducts';
const category = useCategoriesStore()
const isEdit = ref(false)
const getProducts = useGetProducts()
function getImg(imagePath) {
  const baseUrl = 'http://35.196.79.227:8000';
  return `${baseUrl}${imagePath}`;
}
const isFormValid = computed(() => {
    return !getProducts.productName.trim() || 
           !getProducts.productDescription.trim() || 
           !getProducts.productPrice || 
           !getProducts.productStock || 
           !getProducts.productCategory_id;
});

async function startEditProduct(product) {
  console.log("Iniciando edição do prdoduto:", product);
  if (product) {
    isEdit.value = true;
    getProducts.productId = product.id;
    getProducts.productName = product.name;
    getProducts.productDescription = product.description;
    getProducts.productPrice = product.price;
    getProducts.productStock = product.stock;
    getProducts.productCategory_id = product.category_id;
    getProducts.productImg = product.image_path;

}
}
async function sendEditProduct(product_id) {
    if (!product_id || typeof product_id !== "number") {
        console.error("ID inválido:", product_id);
        return;
    }
    try {
        const response = await getProducts.updateProduct(product_id);
        
        if (response?.status === 200) {
            const index = getProducts.products.findIndex(product => product.id === product_id);
            
            if (index !== -1) {
                getProducts.products[index] = response.data;
                console.log("Produto atualizado no estado local.");
                cancelEdit()
            } else {
                console.warn("Produto com o ID não encontrado na lista local.");
            }
        }
    } catch (error) {
        console.error("Erro ao editar produto:", error);
    }
}
async function sendProduct(){
    await getProducts.createProductStore()
} 
function cancelEdit (){
    isEdit.value = false;
    getProducts.productName = '';
    getProducts.productDescription = '';
    getProducts.productPrice = '';
    getProducts.productStock = '';
    getProducts.productCategory_id = '';
    getProducts.productImg = null;
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        getProducts.productImg = file; 
        console.log("Arquivo selecionado:", file);
    }
}
</script>

<style scoped>


.all-content{
    align-items: center;
    justify-content: center;
    padding-top: 30px;
    width: 100%;
    margin: 40px;
}

.card-create{
    justify-content: center;
    border: 1px solid gray;
    max-width: 500px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 24px;
}
.title{
    text-align: center;
}

.form{
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}


.form-price{
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}
.form-price input{
    width: 100%;
}
input{
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
    height:  40px;
    border: 1px solid var(--neutral-color-04);
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;
}
.submit{
    width: 100%;
    background-color:var(--primary-color);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 12px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
}
.image{
    border: 2px dashed var(--neutral-color-04);
    margin-top: 10px;
    border-radius: 9px;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 150px;
    width: 100%;
    background-color: var(--neutral-color-03);
}
.upload-area{
    display: flex;
    flex-direction:column ;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.selected-file {
    font-size: 13px;
    color: #666;
    margin-top: 4px;
}
.disabled {
    background-color: #ccc;
    color: #666;
    border-color: #aaa;
    cursor: not-allowed;
}
.cardPtoducts-content{
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
}
.card-products-container {
    display: grid;
    flex-direction: column;
    align-content: center;
    padding: 20px;
    width: 100%;
}

.title h3 {
  font-size: 24px;

  margin-bottom: 20px;
}

.card-products-grid {
    padding-top: 40px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.card-product {
    width: 300px ;
    background-color: #fff;
    border-radius: 12px;
    border: 1px var(--primary-color) solid;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease;
}

.card-product:hover {
    transform: translateY(-5px);
}

.product-image {
    margin-top: 25px;
    width: 100%;
    height: 180px;
    object-fit:contain;
}

.card-body {
    padding: 15px;
    flex-grow: 1;
}

.card-body h4 {
    font-size: 18px;
    margin-bottom: 10px;
}

.description {
    font-size: 14px;
    color: #555;
    margin-bottom: 10px;
}

.price, .stock {
    font-size: 14px;
    margin-bottom: 5px;
}

.delete-btn {
    margin-top: 20px;
    padding: 10px 16px;
    background-color: var(--secondary-color-orange);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
}

.buttons {
    margin-bottom:30px ;
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.modal-products {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4); /* fundo escuro */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 20px;
    box-sizing: border-box;
}
.modal-content{
    
    overflow-y: auto; /* adiciona o scroll vertical */
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
    max-height: 90vh; /* limite máximo de altura */
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