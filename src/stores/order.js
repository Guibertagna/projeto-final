import { computed, ref} from 'vue';
import { defineStore } from 'pinia';
import { getOrdersService, sendOrders } from '@/service/HttService';
import { useCartProducts } from './cartStore';
export const useOrder = defineStore('order', ()=>{
    const address = ref()
    const coupom = ref(null)
    const order_socket = ref([])
    const useCart = useCartProducts()
    const userOrders = ref([])
    const informationOrder = computed(() => ({
        address_id: address.value, 
        coupon_id: coupom.value
    }));
    
    async function addOrder() {
        try {
            console.log(informationOrder.value)
            const response = await sendOrders(informationOrder.value)
          
            if (response.status === 201) {
                userOrders.value = [...userOrders.value, response.data]
                getOrders()
                useCart.itemsCart = {
                    items: [],
                    total_amount: 0
                };
                useCart.isApplyCupon = false
                useCart.discountCouponView = null
                useCart.isCheckout = false
            }
            return response
        } catch (error) {
            console.log("não foi possível realizar o pedido: " + error)
        }
    }

    async function  getOrders() {
        try{
            const response = await getOrdersService()
            userOrders.value = response.data
            console.log(response)
        }catch(error){
            console.log(error)
        }

    }




    return{
        address,
        coupom,
        order_socket,
        userOrders,
        getOrders,
        addOrder,
    }
    
})