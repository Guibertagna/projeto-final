<template>
  <div class="all-content">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <h1>My Profile</h1>
    <div class="profile">
 
      <div class="profile-card">
        <h3>Personal data</h3>
        <div class="icon-edit">
          <i @click="startEdit()" class="fas fa-edit edit-icon"></i>
        </div>
        <div class="image-profile">
          <template v-if="userStore.user.image_path === '/uploads/defaults/no_profile_image.png'">
            <div class="initials">{{ userStore.user.name.charAt(0) }}</div>
          </template>
          <template v-else>
            <img :src="getImg(userStore.user.image_path)" alt="Profile Picture" />
          </template>
        </div>

        <h3 id="name">{{ userStore.user.name }}</h3>

        <div class="upload-container">
          <label class="upload-label">
            Trocar imagem
            <input type="file" @change="handleFileUpload" style="display: none;" accept=".png, .jpg, .jpeg" />
          </label>
        </div>

        <div class="card-content">
          <div class="email">
            <label for="email">E-mail:</label>
            <p id="email">{{ userStore.user.email }}</p>
          </div>

          <div class="logout">
            <button class="button-log" @click="userStore.logout()">Logout</button>
            <button class="button-delete">Deletar Conta</button>
          </div>
        </div>
      </div>
      <div class="address">
        <h3>Addresses</h3>
        <div v-if="useAddress.userAddresses.length === 0">
  <p>You do not have any registered address yet, go to checkout to register.</p>
  
</div>
<div v-else>
  <div v-for="address in useAddress.userAddresses" :key="address.id">
    <div class="information">
      <ul>
        <li class="liInformation">
          {{ address.street }}, {{ address.number }}, {{ address.zip }} - {{ address.city }}, {{ address.state }}, {{ address.country }}  
          <i @click="confirmDelete(address)" class="fas fa-trash trash-icon"></i>
          <i @click="startEditAddress(address)" class="fas fa-edit edit-icon"></i>
        </li>
      </ul>
    </div>
  </div>
</div>
      </div>
    </div>
    
    <div v-if="userStore.isEdit" class="modal-backdrop" @click.self="userStore.isEdit = false">
      <div class="modal-content">
        <h2>Editar Perfil</h2>
        <input type="text" v-model="userStore.user.name" placeholder="Nome" class="input-field" />
        <input type="email" v-model="userStore.user.email" placeholder="Email" class="input-field" />

        <div class="button-group">
          <button @click="userStore.editUserStore" class="edit-button">Salvar</button>
          <button @click="userStore.isEdit = false" class="close-button">Cancelar</button>
        </div>
      </div>
    </div>
    <di v-if="isEditAddresses" class="modal-backdrop">
      <div class="address-section">
        <div class="all-contet">
            <div class="">
                <label for="streetStore">Street</label>
                <input id="streetStore" v-model="useAddress.streetStore" type="text" placeholder="Street" class="input" />
                
                <label for="numberStore">Number</label>
                <input id="numberStore" v-model="useAddress.numberStore" type="text" placeholder="Number" class="input" />
                
                <label for="zipStore">Zip Code</label>
                <input id="zipStore" v-model="useAddress.zipStore" type="text" placeholder="Zip Code" class="input" />
                
                <label for="cityStore">City</label>
                <input id="cityStore" v-model="useAddress.cityStore" type="text" placeholder="City" class="input" />
                
                <label for="stateStore">State</label>
                <input id="stateStore" v-model="useAddress.stateStore" type="text" placeholder="State" class="input" />
                
                <label for="countryStore">Country</label>
                <input id="countryStore" v-model="useAddress.countryStore" type="text" placeholder="Country" class="input" />
            </div>
        </div>
        <div class="buttons" >
            <button class="button" @click="editAddress()">
                Send
            </button>
            <button class="button-cancel" @click="cancelEdit()">
                Cancel
            </button>
        </div>
    </div>
    </di>
    <LoaderComponent/>
<AlertBoxComponent :visible="showAlert" :message="massageOK" @close="showAlert = false"/>
<ConfirmComponent
:nameconfirm="confirMessage"
  :visible="showConfirm"
  @cancel="showConfirm = false"
@confirm="() => { hendleDelete(addressDelete); showConfirm = false }"
/>
  </div>
</template>

<script setup>
import { useAddresses } from '@/stores/addresses';
import { useAuthenticateStore } from '@/stores/authenticate';
import { useLoader } from '@/stores/loader';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import LoaderComponent from '../Loaders/LoaderComponent.vue';
  import AlertBoxComponent from '../Loaders/AlertBoxComponent.vue';
  import ConfirmComponent from '../Loaders/ConfirmComponent.vue';
const useAddress = useAddresses()
const isEditAddresses = ref(false)
const addressDelete = ref()
const loading = useLoader()

const showConfirm = ref(false)
  const confirMessage = ref()
  const showAlert = ref(false)
  const massageOK = ref('')
  const idEdited = ref()
const userStore = useAuthenticateStore()
onMounted(()=>{
  window.addEventListener('keydown', handleKeyDown);
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
})
function handleKeyDown(event) {
  if (event.key === 'Escape') {
    cancelEdit(); 
  }
}
  function startEdit() {
    userStore.isEdit = true 
   
  }
  function cancelEdit() {
    isEditAddresses.value = false
    userStore.isEdit = false 
  }
  function confirmDelete(address) {
    addressDelete.value = address;
  console.log(addressDelete.value.id)
  showConfirm.value = true;
}
async function hendleDelete(addressDelete){
  try{
    loading.startLoading()
    const response = await useAddress.deleteStoreAddress(addressDelete.id)
    loading.endLoading()
    massageOK.value =` deleted successfully!` 
    showAlert.value = true
    return response

  }catch(error){
    console.log(error)
  }
}
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        userStore.image_user = file; 
        console.log("Arquivo selecionado:", file);
        userStore.addImg()
    }
}
async function editAddress (){
  loading.startLoading()
  try{

    const response = await useAddress.updateAddress(idEdited)
    if (response?.status === 200) {
            const index = useAddress.userAddresses.findIndex(address => address.id === idEdited.value);
            
            if (index !== -1) {
              console.log(response)
              useAddress.userAddresses[index] = response.data;
                console.log("Produto atualizado no estado local.");
                cancelEdit()
                loading.endLoading()
            } else {
                console.warn("Produto com o ID não encontrado na lista local.");
            }
        }
    cancelEdit()
  
    showAlert.value = true
    massageOK.value = 'Address edited successfully'
    loading.endLoading()
  }catch(error){
   

  }

}
function getImg(imagePath) {
  const baseUrl = 'http://35.196.79.227:8000';
  return `${baseUrl}${imagePath}`;
}
function startEditAddress(address){
  useAddress.streetStore = address.street
  useAddress.numberStore = address.number 
  useAddress.zipStore = address.zip 
  useAddress.cityStore = address.city
  useAddress.stateStore = address.state
  useAddress.countryStore = address.country
  useAddress.addAddress_id = address.id
  idEdited.value = address.id
  isEditAddresses.value = true
}

</script>

<style scoped>
  .all-content {

    align-content: center;
    text-align: center;

    display: flex;
  flex-direction:column ;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: #f9f9f9;
}

.profile {
  align-items: stretch;
  margin-top: 20px ;
  gap: 30px;
  display: flex;
  flex-direction: row ;
  text-align: center;
  width: 100%;

}

.profile-card {
  background: white;
  border-radius: 30px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 90%;
  text-align: center;
  position: relative
}

.icon-edit {
  position: absolute;
  top: 20px;
  right: 20px;
}

.edit-icon {
  cursor: pointer;
  font-size: 18px;
  color: #888;
  transition: color 0.3s;
}

.edit-icon:hover {
  color: var(--secondary-color-orange)
}

.image-profile {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--secondary-color-orange, var(--secondary-color-orange));
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 20px auto;
  border: 3px solid #ddd;
}

.image-profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initials {
  font-size: 48px;
  color: white;
}

h3#name {
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
}

.upload-container {
  margin: 10px 0;
}

.upload-label {
  display: inline-block;
  padding: 8px 16px;
  background: var(--secondary-color-orange);
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.upload-label:hover {
  background: #e67e22;
}

.card-content {
  margin-top: 20px;
}

.email {
  margin-bottom: 20px;
}

.logout {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.button-log, .button-delete {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.button-log {
  background-color: var(--primary-color);
}

.button-delete {
  background-color: #e74c3c;
}

.button-log:hover, .button-delete:hover {
  opacity: 0.9;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 400px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
}

.input-field {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.edit-button, .close-button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.edit-button {
  background-color: var(--secondary-color-orange)
}

.close-button {
  background-color: #e74c3c;
}

.edit-button:hover, .close-button:hover {
  opacity: 0.9;
}
.address{
  background: white;
  border-radius: 30px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 90%;
  text-align: center;
  position: relative
}
.icon-edit-eddress{
  align-content: end
}
.liInformation{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: start;
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
}

.address-section{
    border-radius: 5px;
    border: 1px solid var(--primary-color);
    padding: 20px;
    width: 450px;  
    background-color: white;
    align-content: start;
    text-align: start;
    display: flex;
    flex-direction: column;
}

    .input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        display: block;
        margin-top: 4px;
    }
    .buttons{
        margin: 20px;
        display: flex;
        justify-content: space-between;
    }
    .button{
        background-color: var(--secondary-color-orange);
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    .button-cancel{
        background-color: red;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    label {
        display: block;
        font-weight: bold;
        margin-top: 8px;
    }
    @media (max-width: 768px) {
      .profile{
        display: flex;
        flex-direction: column;
      }
      
    }
</style>

