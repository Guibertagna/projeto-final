import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { addItemCart, deleteProductcart, getAllCart, getItemsCart } from '@/service/HttService';

export const useCartProducts = defineStore('cart', () => {
    const productId = ref();
    const quantity = ref();
    const unitPrice = ref();
    const itemsCart = ref([]);
    const cart = ref()
    const productInformation = computed(() => ({
        product_id: productId.value,
        quantity: quantity.value,
        unit_price: unitPrice.value
    }));
    async function addProducts() {
        try {
            const response = await addItemCart(productInformation.value);
            return response;
        } catch (error) {
            console.error("Erro ao adicionar produto ao carrinho:", error);
        }
    }
    async function deleteProductfromcart() {
        const idDelete = { product_id: productId.value }; 
        try{
            const response = await deleteProductcart (idDelete)
            getItemsCartStore()
            return response
        }catch (error) {
            console.error("Erro ao excluir produto do carrinho:", error);
        }
        
    }
    async function getItemsCartStore() {
        try {
            const response = await getItemsCart();
            itemsCart.value = response; 
            return response;
        } catch (error) {
            console.error("Não foi possível pegar itens do carrinho:", error);
        }
    }
    async function getCartStore() {
        try{
            const response = await getAllCart();
            cart.value = response
            return response
        }catch(error){
            console.log(error)
        }
    }
    return {
        addProducts,
        getCartStore,
        getItemsCartStore,
        deleteProductfromcart,
        cart,
        itemsCart,
        productId,
        quantity,
        unitPrice,
    };
});