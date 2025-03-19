import axios from 'axios';

const apiUrl = axios.create({
  baseURL: 'http://34.138.111.33:8000', 
});
const token = localStorage.getItem('auth-token'); // 'token' é a cha
export async function login(credentials) {
    try {
        const response = await apiUrl.post('/login', credentials, {
            headers: {
                'Content-Type': 'application/json' // Definindo que os dados enviados estão no formato JSON
            }
        }); 
        return response.data;
    }catch (error) {
    console.log(credentials)
    console.error('Erro ao fazer login:', error);
    throw error;
    }
}

export async function getCategories() {
    try{
        const response = await apiUrl.get('/categories',{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch(error){
        console.error('Error ao pegar categorias', error)
    }
    
}

export async function createCategorie (categoryData) {
    try{
        const response = await apiUrl.post('/categories', categoryData,{
            headers: {
                'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
                'Content-Type': 'application/json',
              }
            });
            console.log('Categoria criada com sucesso:', response.data);
    return response.data;
    }catch(error){
        if (error.response) {
            // Se houver um erro de resposta do servidor (exemplo: 422)
            console.error('Erro ao criar categoria:', error.response.data);
            return error.response.data;
          } else {
            console.error('Erro ao fazer requisição:', error.message);
          }
    }
    
}