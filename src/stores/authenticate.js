import { ref} from 'vue';

import { defineStore } from 'pinia';
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



    return{
      
      saveUser,
      logout,
      token, user, isAuthenticated, logout, saveUser

    }
    
}, {persist: true})