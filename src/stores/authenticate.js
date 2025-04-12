import { ref} from 'vue';
import { defineStore } from 'pinia';
import { getUser } from '@/service/HttService';
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
async function getMe(){
  try {
    const response = await getUser();
    if(response.data.active === false){
        if(user.value.isAuthenticated = true){ 
          try{
            const response = await renewToken()
            console.log(token.value);
            token.value = response.data.new_token 
            console.log(token.value);
          }catch(error){
            console.error('Error renewing token:', error);
          }
    }else{
      console.log('User is not authenticated: dando logout.....', user.value.isAuthenticated);
      logout();
    }
    
  } else{
    console.log('User is active:', response.data.active);}
  }catch (error) {  
    console.error('Error fetching user data:', error);
}
}
    return{
      saveUser,
      logout,
      getMe,
      token, user, isAuthenticated, logout, saveUser
    }
    
}, {persist: true})