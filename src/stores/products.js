import { computed, ref} from 'vue';
import { createProduct } from '@/service/HttService';
import { defineStore } from 'pinia';
export const useCreateProducts = defineStore('products', ()=>{
    const productName = ref('')
    const productDescription = ref(''); // Corrigindo a digitação
    const productPrice = ref(0)
    const productStock = ref(0)
    const productCategory_id = ref(0)
    const productImg = ref('')
    
    const productsData = computed(() => ({
        name: productName.value,
        description: productDescription.value || null,
        price: Number(productPrice.value),
        stock: parseInt(productStock.value), 
        category_id: parseInt(productCategory_id.value),

        image_path: productImg.value || null,
    }));
    
    
    async function createProductStore() {
        try {
        
            const data = await createProduct(productsData.value);
            return data;
        } catch (error) {
            console.error("Erro ao criar produto:", JSON.stringify(error.response?.data, null, 2));
        }
    }
    
 
   
return {
    productName,
    productDescription,
    productPrice,
    productStock,
    productCategory_id,
    productImg,
    createProductStore


}

    
})