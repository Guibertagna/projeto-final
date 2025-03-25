import axios from 'axios';
import { useAuthenticateStore } from '@/stores/authenticate';
import { useRouter } from 'vue-router';
const apiUrl = axios.create({
    baseURL: 'http://34.138.111.33:8000', 
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
        const response = await apiUrl.get('/categories');
        return response;
    }catch(error){
        console.error('Error ao pegar categorias', error)
    }
    
}
export async function createProduct(productsinfo) {
    const authStore = useAuthenticateStore(); 
    console.log(productsinfo)
    
    const token = authStore.token; 
    try {
        console.log(productsinfo)
        const response = await apiUrl.post('/products', productsinfo, { // Corrigido!
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data',
            }
        });
        
        
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
                'Content-Type': 'application/json',
            }
            });
            console.log('Categoria criada com sucesso:', response.data);
    return response;
    }catch(error){
        
            console.error('Erro ao criar categoria:', JSON.stringify(error.response?.data, null, 2));
          
        
    }
    
}