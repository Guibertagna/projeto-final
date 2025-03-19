import { ref, computed } from 'vue';

import { defineStore } from 'pinia';
import { login } from '@/service/HttService';
export const useAuthenticateStore = defineStore('authenticate', ()=>{
    const loginEmail = ref('');
    const loginPassword = ref('');
    
    const userCredentials = computed(() => ({
      email: loginEmail.value,
      password: loginPassword.value,
    }));
    
    
      async function loginStore() {
        console.log("ENTRO AQUI TBM")
        console.log(userCredentials)
        try {
          const data = await login(userCredentials.value);
          localStorage.setItem('auth-token', data.token)
          console.log('Login bem-sucedido', data);
          return data
        } catch (error) {
          console.error('Falha no login', error);
        }
        
      }

    return{
      loginStore,
      loginEmail,
      loginPassword,
      userCredentials
      

       
    }
})