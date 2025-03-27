import { ref} from 'vue';
import { createProduct } from '@/service/HttService';
import { defineStore } from 'pinia';
export const useCreateProducts = defineStore('products', ()=>{
    const productName = ref('')
    const productDescription = ref(''); 
    const productPrice = ref(0)
    const productStock = ref(0)
    const productCategory_id = ref(0)
    const productImg = ref('')
  


 function getFormData(){
    const formData = new FormData();
    formData.append('name', productName.value)
    formData.append('description', productDescription.value);
    formData.append('price', productPrice.value);
    formData.append('stock', productStock.value);
    formData.append('category_id', productCategory_id.value);
    formData.append('image', productImg.value);
   
    
    return formData;
}
    
    
    async function createProductStore() {
        try {
            
            const formData = getFormData()
        formData.forEach((value, key) => {
            console.log("Enviando:", key, value);
        });
           const data = await createProduct(formData);
           console.log(data)
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