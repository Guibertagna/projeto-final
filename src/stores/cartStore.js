import { computed, ref} from 'vue';

import { defineStore } from 'pinia';
import { addItemCart, createCart } from '@/service/HttService';
export const useCartProducts = defineStore('cart', ()=>{
    const productId = ref()
    const quantity = ref()
    const unitPrice = ref()
    const prodcstInformation= computed(()=>({
        product_id: productId.value,
        quantity: quantity.value,
        unit_price: unitPrice.value
    }))
    async function addProducs() {
        createCart()
        try{
            const response = await addItemCart(prodcstInformation.valueprodcstInformation)
            return response;
        }catch(error){
            console.error(error)
            
        }
    }
    return{
        addProducs,
        productId,
        quantity,
        unitPrice,

    }
})