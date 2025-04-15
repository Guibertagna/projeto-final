<template>
    <div class="all-content">
        <div class="card-create">
           <div class="title">
                <h3 >Add new product</h3>
           </div>
            <div class="form">
                <label for="name">Name of product</label>
                <input placeholder="name" v-model="products.productName" id="name" type="text">
            </div>
            <div class="form" >
                <label for="description">Descripition of product</label>
                 <textarea  placeholder=" Describe the product" id="description" v-model="products.productDescription"> </textarea>
            </div>
            <div class="form-price" >
                <div class="price"> 
                    <label for="price">Price of product</label> 
                    <input type="number" placeholder="Price" v-model="products.productPrice" id="price">
                        
                </div>
                    
                <div class="stock">
                    <label for="stock">Stock of product</label>
                    <input placeholder="stock" v-model="products.productStock" id="stock" type="number">
                </div>
            </div>
                
            <div class="form">
                <label for="category">Category of product</label>
                <select placeholder="category name" v-model="products.productCategory_id" id="category">
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
                <p v-if="products.productImg" class="selected-file">
                    Selected file: {{ products.productImg.name }}
              
                </p>
            </div>

            <button  :disabled="isFormValid" :class="{ 'disabled': isFormValid }" @click="sendProduct()" class="submit">Create Product</button>
        
        </div> 
        
    </div>
 
</template>

<script setup>
import { useCreateProducts } from '@/stores/products';
import { useCategoriesStore } from '@/stores/categories';
import {  computed } from 'vue';
const category = useCategoriesStore()
const products = useCreateProducts()
const isFormValid = computed(() => {
    return !products.productName.trim() || 
           !products.productDescription.trim() || 
           !products.productPrice || 
           !products.productStock || 
           !products.productCategory_id;
});

async function sendProduct(){
    await products.createProductStore()
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        products.productImg = file; 
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
    height:  100px;
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

</style>