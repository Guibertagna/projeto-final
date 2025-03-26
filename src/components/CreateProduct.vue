<template>
    <div>
        <input placeholder="name" v-model="products.productName">
        <input placeholder="descrição" v-model="products.productDescription">
        <input placeholder="preço" v-model="products.productPrice">
        <input placeholder="stoque" v-model="products.productStock">
        <input placeholder="category_id" v-model="products.productCategory_id">
        <input type="file" @change="handleFileUpload"> 
        <button @click="sendProduct()" >vaiii</button>
    </div>
 
</template>

<script setup>
import { useCreateProducts } from '@/stores/products';


const products = useCreateProducts()
async function sendProduct(){
    await products.createProductStore()
}


</script>

<style scoped>


</style>