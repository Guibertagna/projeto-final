import axios from "axios";

const apiUrl = axios.create({
    baseURL: 'http://34.138.111.33:8000/'
})

export async function login(credencials) {
    try{
        const response = axios.post(apiUrl, credencials)
        return response.data
    }catch(error){
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}