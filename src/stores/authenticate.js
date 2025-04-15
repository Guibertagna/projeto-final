import { ref} from 'vue';
import { defineStore } from 'pinia';
import { ferify } from '@/service/HttService';
import { renewToken } from '@/service/HttService';

export const useAuthenticateStore = defineStore('authenticate', ()=>{
  const user = ref({})
  const token = ref(null)
  const isAuthenticated = ref(false)
  
  function logout() {
    token.value = null
    user.value = {}
    isAuthenticated.value = false
  }

  function saveUser(result) {
    user.value = result.user
    isAuthenticated.value = true
    token.value = result.token
    
  }

  async function ferifyMe(){
  try {
    const response = await ferify();
    const expiration = response.data.expires_at;

    console.log("Token expira em:", expiration);

   
    
  }catch (error) {  
    logout();
  }

  }
  return{
    saveUser,
    logout,
    ferifyMe, 
    logout,
    token, 
    user, 
    isAuthenticated,
     
  }
    
},{persist: true}

)