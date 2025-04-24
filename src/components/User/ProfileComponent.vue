<template>
  <div class="all-content">
    <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
/>

    <div class="profile">
      <h1>Profile</h1>
      <div class="profile-card">
        <div class="icon-edit">
          <i @click="startEdit()" class="fas fa-edit edit-icon" ></i>
        </div>
        <div class="image-prfile">

          {{ userStore.user.name.charAt(0) }}
          
        </div>
        <label for="name"></label>
        <h3 id="name">
          {{ userStore.user.name }}
   
        </h3>
        <div class="card-content">
        <div class="email">
          <label for="email">E-mail: </label>
          <p id="email"> {{ userStore.user.email }}
           
          </p>
        </div>
        <div class="logout">
          <button class="button-log">logout</button>
          <button class="button-delete">DELETE ACCONT</button>
        </div>
        </div>
      </div>

    </div>
    <div v-if="userStore.isEdit" class="modal-backdrop" @click.self="isEdit = true">
      <div class="modal-content">
  <h2>Edit Profile</h2>
  
  <input type="text" v-model="userStore.user.name" placeholder="Name" class="input-field">
  <input type="email" v-model="userStore.user.email" placeholder="Email" class="input-field">
  
  <div class="button-group">
    <button @click="userStore.editUserStore" class="edit-button">Edit</button>
    <button @click="userStore.isEdit = false" class="close-button">Close</button>
  </div>
</div>
</div>
  </div>
</template>

<script setup>
import { useAuthenticateStore } from '@/stores/authenticate';
import { onMounted, ref } from 'vue';

const userStore = useAuthenticateStore()
onMounted(()=>{
    console.log(userStore.user.role)
})
  function startEdit() {
    userStore.isEdit = true 
  }



</script>

<style scoped>
  .all-content{
    width: 100%;
    height: 1000px;
  }
  .profile{
    display: flex;
    justify-content: center;  
    align-items: center;
    flex-direction: column;
    }
  .profile-card{
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: auto;
    border: 1px black solid;
    margin: 30px;
  }


  .image-prfile{
    background-color: var(--secondary-color-orange) ;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px ;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 1px black solid;
  }


  .card-content{
    padding: 20px;
    margin-left: 40px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .logout{
    display: flex;
    gap: 40px;
    justify-content: center;
    margin-top: 50px ;
  }
  .button-log{
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
  }
  .button-delete{
    background-color: rgb(247, 38, 38);
    padding: 10px;
    border-radius: 10px;
  }
  .edit-icon {

  cursor: pointer;
  font-size: 16px;
  color: #555;
  transition: color 0.3s;
}
.icon-edit{
  display: flex;
  align-items: end;
  justify-content: end;
  width: 100%;
  margin-top:20px;
  margin-right: 30px;
}
  .edit-icon:hover {
    color: orange;
  }
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
  width: 500px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  min-width: 300px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.input-field {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.edit-button {
  background-color: var(--secondary-color-orange);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

.close-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

.edit-button:hover,
.close-button:hover {
  opacity: 0.9;
}


</style>

