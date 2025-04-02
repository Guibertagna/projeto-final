import axios from 'axios';
import { useAuthenticateStore } from '@/stores/authenticate';
import { useRouter } from 'vue-router';
export const apiUrl = axios.create({
    baseURL: 'http://35.196.79.227:8000', 
});

export async function login(credentials) {
    try {
        const response = await apiUrl.post('/login', credentials); 
        
        return response;
    }catch (error) {
    console.log(credentials)
    console.error('Erro ao fazer login:', error);
    throw error;
    }
}
export async function register(credentialsRegister) {
    try {
        const response = await apiUrl.post('/register', credentialsRegister); 
        return response;
    }catch (error) {
    console.log(credentialsRegister)
    console.error('Erro ao fazer registro:', error);
    throw error;
    }
}
export async function getCategories() {
    
    try{
        const response = await apiUrl.get(`/categories/user/10`);
        return response;
  
    }catch(error){
        console.error('Error ao pegar categorias', error)
    }
    
}
export async function createProduct(productsinfo) {
   
    console.log(productsinfo)
    const authStore = useAuthenticateStore(); 
    const token = authStore.token; 
    try {
        console.log(productsinfo)
        const response = await apiUrl.post('/products', productsinfo, { 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data',
            }
        });
        alert("!!!")
        return response.data; 
    }catch (error) {
    console.log(productsinfo)
    console.error('Erro ao criar produtos:', error);
    throw error;
    }
}

export async function createCategorie (categoryData) {
    try{
        if(categoryData.name != ""){const authStore = useAuthenticateStore(); 
            const token = authStore.token; 
            const response = await apiUrl.post('/categories', categoryData,{
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'multipart/form-data',
                }
                });
                console.log('Categoria criada com sucesso:', response.data);
                alert('categoria criada com sucesso!')
        return response;
    }else{
        alert("campo nome invalido")
    }
        
    }catch(error){
        console.error('Erro ao criar categoria:', JSON.stringify(error.response?.data, null, 2));
    }
    
}


export async function editCategoryService (category_id, categoryData) {
    try{
            const authStore = useAuthenticateStore(); 
            const token = authStore.token; 
            const response = await apiUrl.put(`/categories/${category_id}`, categoryData,{
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                }
                });
                console.log('Categoria editada com sucesso ', response.data);
                alert("Categoria editada com sucesso!");
        return response;
        
    }catch(error){
        console.error('Erro ao EDITAR categoria:', JSON.stringify(error.response?.data, null, 2));
    }
    
}






export async function deleteCategorieService(category_id) {
    try{
        const authStore = useAuthenticateStore(); 
        const token = authStore.token; 
        const response = await apiUrl.delete(`/categories/${category_id}`,{
            headers: {
                'Authorization': `Bearer ${token}`, 
                
            }
        })
    }catch(error){
        console.log("erro ao deletar categoria")
    }
}
export async function getProductsService() {
    try{
        const response = await apiUrl.get(`/products/user/10`)
        return response
        
    }catch(error){
        console.log("erro a buscar produtos com id 1" + error)
    }
}
export async function getProductsById(product_id) {
    try{
        const response = await apiUrl.get(`/products/${product_id}`)
        return response
        
    }catch(error){
        console.log("erro a buscar produtos com id 1" + error)
    }
}



export async function getProductsServiceCategory(category_id) {
    const authStore = useAuthenticateStore(); 
    const token = authStore.token; 
    try{
        const response = await apiUrl.get(`/products/category/${category_id}`,{
            headers: {
                'Authorization': `Bearer ${token}`, 
                
            }
        })
        return response
        
    }catch(error){
        console.log("erro a buscar produtos com id 1" + error)
    }
}
export async function getCategoryById(category_id) {
    try{
        const authStore = useAuthenticateStore(); 
        const token = authStore.token; 
        const response = await apiUrl.get(`/categories/${category_id}`,{
            headers: {
                'Authorization': `Bearer ${token}`, 
                
            }
        })
        return response
    }catch(error){
        console.log("erro ao deletar categoria")
    }
}

export async function addItemCart(item) {
    const authStore = useAuthenticateStore(); 
    const token = authStore.token; 
    console.log("Dados enviados:", JSON.stringify(item));
    try{
        const response = await apiUrl.post('/cart/items', item,{
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            }
        })
        console.log('Categoria editada com sucesso ', response.data);
        alert("Categoria editada com sucesso!");
        return response;
    }catch(error){
        console.error(error)

    }
    
}

export async function createCart() {
    const authStore = useAuthenticateStore(); 
    const token = authStore.token; 
    console.log(token)    
    try{
        const response = await apiUrl.post('/cart',null,{
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        })
        return response.data; 
    }catch(error){
        console.error("Erro ao criar o carrinho:", error);
        return null; 

    }
    
}
export async function getItemsCart() {
    const authStore = useAuthenticateStore(); 
    const token = authStore.token; 
    console.log(token)    
    try{
        const response = await apiUrl.get('/cart/items',{
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        })
        return response.data; 
    }catch(error){
        console.error("Erro ao criar o carrinho:", error);
        return null; 

    }
    
}

export async function deleteProductcart(product_id) {
    try{
        const authStore = useAuthenticateStore(); 
        const token = authStore.token; 
        console.log(product_id)
        const response = await apiUrl.delete('/cart/items',{
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            data: product_id
        })
        return response
    }catch(error){
        console.log("erro ao deletar produto da categoria" + error)
    }
}


