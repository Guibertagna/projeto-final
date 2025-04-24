import { ref} from 'vue';
import { getProductsById, getProductsService, getProductsServiceCategory, createProduct, deleteProductService, editProduct } from '@/service/HttService';
import { defineStore } from 'pinia';
export const useGetProducts = defineStore('allroducts', ()=>{
    const products = ref([])
    const productId =ref([])
    const filtredProcducts = ref([])
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
                
                const data = await createProduct(formData);
                products.value.push(data);
                console.log(data)
            }catch (error) {
                console.error("Erro ao criar produto:", error);
            }
        }
    
    async function getProducts() {
        try{
            const storeProducts = await getProductsService();
            products.value = storeProducts.data
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
    async function deleteProduct (idProduct){
        try{
            const response = await deleteProductService(idProduct)
            if(response.status === 204){
                products.value = products.value.filter(product => product.id !== idProduct)
                console.log("Produto deletado do pinia com sucesso")
            }
            
        }catch(error){
            console.error("erro ao deletar produto " + idProduct + error)
        }
    }
    async function updateProduct(idProduct){
    const formData = getFormData()
    try {
        const response = await editProduct(idProduct, formData)
        return response
    } catch(error) {
        console.error("Erro ao editar produto " + idProduct + ":", error)
    }
}
    return{
        getProducts,
        getProductsCategory,
        getProductsId,
        createProductStore,
        deleteProduct,
        updateProduct,
        productName,
        productDescription,
        productPrice,
        productStock,
        productCategory_id,
        productImg,
        productId,
        filtredProcducts,
        products,
    }
})