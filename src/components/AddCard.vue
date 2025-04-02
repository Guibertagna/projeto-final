<template>
                <div class="button-container">
                    <button @click="addToCart()" class="add">Add to cart </button>
                
                </div>
</template>

<script setup>
    import { useCartProducts } from "@/stores/cartStore";
    import { useGetProducts } from "@/stores/getProducts";



    const useProducts = useGetProducts();


    const useCart = useCartProducts()

    async function addToCart(){
        useCart.productId = useProducts.productId.data.id
        useCart.quantity = 1
        useCart.unitPrice =  Number(useProducts.productId.data.price);
        await useCart.addProducts()
    }

</script>

<style>
.button-container {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}

.add, .buy-now {
    padding: 10px 20px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s ease;
} 

.add {
    background-color: #4CAF50;
    color: white;
}

.add:hover {
    background-color: #45a049;
}

</style>