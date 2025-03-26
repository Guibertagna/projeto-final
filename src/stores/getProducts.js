import { ref} from 'vue';
import { getProductsByid } from '@/service/HttService';
import { defineStore } from 'pinia';
export const useGetProducts = defineStore('allroducts', ()=>{
    const products = ref([])
  

    async function getProducts() {
        try{
            const storeProducts = await getProductsByid();
            products.value = storeProducts
            
        }catch(error){
            console.error("erro ao obter produtos do id 1" + error)
        }
        
    }
    return{
        getProducts,
        products,
    }
})