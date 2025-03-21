<template>
  <div class="login-container">
    <div class="logo-container">
      <img src="@/assets/logo.png" class="logo-img" alt="Logo">
    </div>
    
    <form @submit.prevent="handleLogin" class="login-card">
      <h1 class="login-title">Login</h1>
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          v-model="emailUser"
          @blur="emailTouched = true"
          placeholder="exemple@exemple"
          class="form-input"
          :class="{ 'input-error': emailTouched && emailError }"
        >
        <p v-if="emailTouched && emailError" class="error-message">{{ emailError }}</p>
      </div>
      
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="passwordUser"
          @blur="passwordTouched = true"
          class="form-input"
          :class="{ 'input-error': passwordTouched && passwordError }"
        >
        <p v-if="passwordTouched && passwordError" class="error-message">{{ passwordError }}</p>
      </div>
      
      <button class="login-button" type="submit" :disabled="!isFormValid">Login</button>
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthenticateStore } from '@/stores/authenticate';
import { login } from '@/service/HttService';

const router = useRouter();
const loginStore = useAuthenticateStore();

const emailUser = ref('');
const passwordUser = ref('');
const loginError = ref('');
const emailTouched = ref(false);
const passwordTouched = ref(false);

const emailError = computed(() => {
  if (!emailUser.value) return 'O e-mail é obrigatório.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailUser.value)) return 'E-mail inválido.';
  return '';
});

const passwordError = computed(() => {
  if (!passwordUser.value) return 'A senha é obrigatória.';
  if (passwordUser.value.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
  return '';
});

const isFormValid = computed(() => !emailError.value && !passwordError.value);

async function handleLogin() {
  emailTouched.value = true;
  passwordTouched.value = true;

  if (!isFormValid.value) return;

  try {
    const result = await login({ email: emailUser.value, password: passwordUser.value });
    
    if (result?.data) {
      loginStore.saveUser(result.data);
      router.push('/');
      alert('Login sucesso');
    } else {
      throw new Error('Credenciais inválidas.');
    }
  } catch (error) {
    loginError.value = 'Falha no login. Verifique suas credenciais.';
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Big Shoulders', sans-serif;
}

.logo-container {
  max-width: 150px;
  margin-bottom: 1rem;
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

.input-error {
  border-color: #dc2626;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--second-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: var(--hover-second-color);
}

.login-button:disabled {
  background-color: #a5a5a5;
  cursor: not-allowed;
}
</style>