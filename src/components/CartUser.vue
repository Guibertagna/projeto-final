<template>
    <div class="allCart">
        <div class="card">
          <div>  <h2>shopping cart</h2></div>
            <div v-for=" items in useCart.itemsCart.items "  :key="items.product_id">
                {{ items.product_id }}
            </div>
        
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCartProducts } from "@/stores/cartStore";
const useCart = useCartProducts()
function getitens(){
    useCart.getItemsCartStore()
}
onMounted(()=>{
    getitens()
})
</script>

<style scoped>
.card{
 
    background-color: var(--neutral-color-03);
}
.allCart{
    margin-top: 50px ;
    height: 100vh;
    display: flex;
    justify-content: center;
}
</style>

