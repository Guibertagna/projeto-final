import { ref} from 'vue';
import { getProductsById, getProductsService, getProductsServiceCategory } from '@/service/HttService';
import { defineStore } from 'pinia';
export const useGetProducts = defineStore('allroducts', ()=>{
    const products = ref([])
    const productId =ref([])
    const filtredProcducts = ref([])

    async function getProducts() {
        try{
            const storeProducts = await getProductsService();
            products.value = storeProducts
            
        }catch(error){
            console.error("erro ao obter produtos do id 1" + error)
        }
        
    }
    async function getProductsId(idProduct) {
        try{
            const productsId = await getProductsById(idProduct);
            productId.value = productsId
            
        }catch(error){
            console.error("erro ao obter produtos do id " + idProduct + error)
        }
        
    }

    async function getProductsCategory(idCategory) {
        try{
            const storeProductsFiltred = await getProductsServiceCategory(idCategory);
            filtredProcducts.value = storeProductsFiltred
            console.log(filtredProcducts.value.data)
        }catch(error){
            console.error("erro ao obter produtos do id 1" + error)
        }
        
    }
    return{
        getProducts,
        getProductsCategory,
        getProductsId,
        productId,
        filtredProcducts,
        products,
    }
})