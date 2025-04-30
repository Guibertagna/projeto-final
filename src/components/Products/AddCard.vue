<template>
    <div class="button-container">
        <button @click="addToCart()" class="add">Add to cart </button>
    </div>
</template>

<script setup>
    import { useCartProducts } from "@/stores/cartStore";
    import { useGetProducts } from "@/stores/getProducts";
    import { useAuthenticateStore } from "@/stores/authenticate";
    import { useRouter } from "vue-router";
    const useAuthenticate = useAuthenticateStore();
    const route = useRouter();
    const props = defineProps({
    prodName:{
        type: String,
        required: true,
    },
    productId: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
});


    const useProducts = useGetProducts();


    const useCart = useCartProducts()

    async function addToCart(){
        if(useAuthenticate.isAuthenticated == false){
            console
           route.push('/userlogin')
           
        }else{
            useCart.nameProd = props.prodName
            useCart.productId = props.productId;
            useCart.quantity = 1
            useCart.unitPrice =  props.unitPrice;
            await useCart.addProducts()
        }
        
    }

</script>

<style scoped>
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
    height: auto;
    width: 150px;
    background-color:var(--primary-color);
    color: white;
}

.add:hover {
    background-color: var(--neutral-color-05);
}

</style>