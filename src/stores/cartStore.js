import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { addItemCart, getItemsCart } from '@/service/HttService';

export const useCartProducts = defineStore('cart', () => {
    const productId = ref();
    const quantity = ref();
    const unitPrice = ref();
    const itemsCart = ref([]);

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

    async function getItemsCartStore() {
        try {
            const response = await getItemsCart();
            itemsCart.value = response; 
            return response;
        } catch (error) {
            console.error("Não foi possível pegar itens do carrinho:", error);
        }
    }

    return {
        addProducts,
        getItemsCartStore,
        itemsCart,
        productId,
        quantity,
        unitPrice,
    };
});
