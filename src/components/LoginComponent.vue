<template>
  <div class="login-container">
   <div class="logo-container">
    <img src="@/assets/logo.png" class="logo-img" >
   </div>
    <div class="login-card">
      <h1 class="login-title">Login</h1>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="loginEmail"
          placeholder="exemple@exemple"
          class="form-input"
        >
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="loginPassword"
          class="form-input"
        >
      </div>
      
      <button 
        class="login-button" 
        @click="handleLogin()"

      >
        Login
      </button>
 
    </div>
  </div>
</template>


<script setup>
import router from '@/router';
import { login } from '@/service/HttService';
import { ref } from 'vue';
const loginEmail = ref('');
const loginPassword = ref('');


const handleLogin = async () => {
  const userCredentials = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  try {
    const data = await login(userCredentials);
    localStorage.setItem('auth-token', data.token)
    console.log('Login bem-sucedido', data);
    router.push('/')
  } catch (error) {
    console.error('Falha no login', error);
  }
};
</script>
<style scoped>
.login-container {
  font-family: 'Big Shoulders', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}
.logo-container{
    max-width: 150px;
}
.login-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color:var(--second-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: var(--hover-second-color)
}

.login-button:disabled {
  background-color: #a5a5a5;
  cursor: not-allowed;
}

.error-message {
  color: #dc2626;
  margin-top: 1rem;
  text-align: center;
}
</style>