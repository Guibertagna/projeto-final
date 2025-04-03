import { computed, ref} from 'vue';

import { defineStore } from 'pinia';
import { sendOrders } from '@/service/HttService';
import { useAuthenticateStore } from './authenticate';
export const useOrder = defineStore('order', ()=>{
    const address = ref()
    const cupom = ref()
    const informationOrder = computed(()=>({
        address_id: address.value,
        coupon_id: cupom.value
    }))
    
    async function addOrder() {
        try{
            const data = await sendOrders(informationOrder)

            return data
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