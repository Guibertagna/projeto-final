import { ref, computed} from 'vue';
import { defineStore } from 'pinia';
import { editUser, ferify, getUser, registerModerator, uploadImage } from '@/service/HttService';
import { useRouter } from 'vue-router';
import { useCartProducts } from './cartStore';
export const useAuthenticateStore = defineStore('authenticate', ()=>{
  const router = useRouter()
  const user = ref({})
  const token = ref(null)
  const isAuthenticated = ref(false)
  const isEdit = ref(false)
  const image_user = ref()
  const nameModerator = ref()
  const emailModerator = ref()
  const passwordModetator = ref()

  const cartProducts = useCartProducts()
function getFormData(){
    const formData = new FormData();
    formData.append('image', image_user.value);
    return formData;
}
const infoModerator = computed(() => ({
  name: nameModerator.value,
  email: emailModerator.value,
  password: passwordModetator.value,
  role: "MODERATOR"

}));
  function logout() {
    token.value = null
    user.value = {}
    cartProducts.itemsCart = {}
    isAuthenticated.value = false
    router.push('/userlogin')
  }
  
  async function addImg(){
    const formData = getFormData()
    try{
      const response = await uploadImage(formData)
      getUserMe()
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
  
  async function getUserMe(){
    try{
      const response = await getUser()
      user.value =  response.data
      
    }catch(error){
      console.log(error)
    }
    
  }
  async function createModerator() {
    try{
      const response = await  registerModerator(infoModerator)
      return response
    }catch(error){
      throw error
    }
 
  }
  return{
    createModerator,
    saveUser,
    logout,
    ferifyMe, 
    logout,
    editUserStore,
    addImg,
    getUserMe,
    image_user,
    isEdit,
    token, 
    user, 
    isAuthenticated,
    nameModerator, 
    emailModerator,
    passwordModetator,
     
  }
    
},{persist: true}

)