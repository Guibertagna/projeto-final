import axios from 'axios';
import { useAuthenticateStore } from '@/stores/authenticate';
import { useRouter } from 'vue-router';
const apiUrl = axios.create({
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
    const authStore = useAuthenticateStore(); 
    const user_id = authStore.user.id; 
    
    try{
        const response = await apiUrl.get(`/categories/user/${user_id}`);
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
        alert("deucerto!!!")
        return response.data; 
    }catch (error) {
    console.log(productsinfo)
    console.error('Erro ao criar produtos:', error);
    throw error;
    }
}

export async function createCategorie (categoryData) {
    try{
        const authStore = useAuthenticateStore(); 
        const token = authStore.token; 
        const response = await apiUrl.post('/categories', categoryData,{
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data',
            }
            });
            console.log('Categoria criada com sucesso:', response.data);
            
    return response;
    }catch(error){
        
            console.error('Erro ao criar categoria:', JSON.stringify(error.response?.data, null, 2));
        
        
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


export async function getProductsByid() {
    const authStore = useAuthenticateStore(); 
    const user_id = authStore.user.id; 
    console.log(user_id)
    try{
        const response = await apiUrl.get(`/products/${user_id}`)
        return response
        
    }catch(error){
        console.log("erro a buscar produtos com id 1" + error)
    }
}
