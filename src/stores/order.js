import { computed, ref} from 'vue';
import { defineStore } from 'pinia';
import { sendOrders } from '@/service/HttService';
import { useCartProducts } from './cartStore';
export const useOrder = defineStore('order', ()=>{
    const address = ref()
    const cupom = ref()
    const useCart = useCartProducts()
    const informationOrder = computed(() => ({
        address_id: address.value, 
        coupon_id: null
    }));
    
    async function addOrder() {
        try{
            console.log(informationOrder.value)
            const response = await sendOrders(informationOrder.value)
            if(response.status === 201 ){
                useCart.itemsCart = {
                    items: [],
                    total_amount: 0
                };
                
                useCart.isCheckout = false
            }
            return response
        }catch(error){
            console.log("não foi possivel criar endereço store" + error )
        }
    }
    return{
        address,
        cupom,
        addOrder,
    }
    
})