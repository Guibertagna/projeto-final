import { ref} from 'vue';
import { defineStore } from 'pinia';
import { editUser, ferify, uploadImage } from '@/service/HttService';
import { renewToken } from '@/service/HttService';

export const useAuthenticateStore = defineStore('authenticate', ()=>{
  const user = ref({})
  const token = ref(null)
  const isAuthenticated = ref(false)
  const isEdit = ref(false)
  const image_user = ref()
    function getFormData(){
    const formData = new FormData();
    formData.append('image', image_user.value);
    return formData;
}

  function logout() {
    token.value = null
    user.value = {}
    isAuthenticated.value = false
  }
  async function addImg(){
    const formData = getFormData()
    try{
      const response = await uploadImage(formData)
    }catch(error){
      console.log(error)
    }
  }

  async function editUserStore() {
    try{
      const response = await editUser(user.value)
      isEdit.value = false
      return response
    }catch(error){
      console.log(error)

    }
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
    editUserStore,
    image_user,
    isEdit,
    token, 
    user, 
    isAuthenticated,
     
  }
    
},{persist: true}

)