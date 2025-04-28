<template>
  <div class="all-content">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

    <div class="profile">
      <h1>Meu Perfil</h1>
      <div class="profile-card">
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
            <button class="button-log">Logout</button>
            <button class="button-delete">Deletar Conta</button>
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
  </div>
</template>

<script setup>
import { useAuthenticateStore } from '@/stores/authenticate';
import { onMounted, ref } from 'vue';
const isAdd = ref(false)
const userStore = useAuthenticateStore()
onMounted(()=>{
    console.log(userStore.user.role)
})
  function startEdit() {
    userStore.isEdit = true 
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        userStore.image_user = file; 
        console.log("Arquivo selecionado:", file);
        userStore.addImg()
    }
}

function getImg(imagePath) {
  const baseUrl = 'http://35.196.79.227:8000';
  return `${baseUrl}${imagePath}`;
}

</script>

<style scoped>
  .all-content {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: #f9f9f9;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-card {
  background: white;
  border-radius: 30px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
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
  color: #f39c12;
}

.image-profile {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--secondary-color-orange, #f39c12);
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
  background: #f39c12;
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
  background-color: #3498db;
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
  background-color: #2ecc71;
}

.close-button {
  background-color: #e74c3c;
}

.edit-button:hover, .close-button:hover {
  opacity: 0.9;
}

</style>

