<template>
  <div class="container-page">
    <div class="logo-container">
      <img src="@/assets/logo.png" class="logo-img" alt="Logo">
    </div>
    
    <div class="login-container">
      <form v-if="isLoginMode" @submit.prevent="handleLogin" class="login-card">
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







      <form v-else @submit.prevent="handleRegister" class="login-card">
        <h1 class="login-title">Register</h1>

        <div class="form-group">
          <label for="name">Name:</label>
          <input
              @blur="nameTouched = true"
            id="name"
            v-model="nameUserRegister"
            class="form-input"
            :class="{ 'input-error': nameTouched && nameErrorRegister }"
          >
          <p v-if="nameTouched && nameErrorRegister" class="error-message">{{ nameErrorRegister }}</p>
        </div>

        <div class="form-group">
          <label for="emailRegister">Email:</label>
          <input
            id="emailRegister"
            type="email"
            v-model="emailUserRegister"
            @blur="emailTouchedRegister = true"
            placeholder="exemple@exemple"
            class="form-input"
            :class="{ 'input-error': emailTouchedRegister && emailErrorRegister }"
          >
          <p v-if="emailTouchedRegister && emailErrorRegister" class="error-message">{{ emailErrorRegister }}</p>
        </div>

        <div class="form-group">
          <label for="passwordRegister">Password:</label>
          <input
            id="passwordRegister"
            type="password"
            v-model="passwordUserRegister"
            @blur="passwordTouchedRegister = true"
            class="form-input"
            :class="{ 'input-error': passwordTouchedRegister && passwordErrorRegister }"
          >
          <p v-if="passwordTouchedRegister && passwordErrorRegister" class="error-message">{{ passwordErrorRegister }}</p>
        </div>

        <button class="login-button" :disabled="!isFormValidRegister" type="submit">Register</button>
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
      </form>
      <div class="toggle-mode">
        <p v-if="isLoginMode">Don't have an account? <a href="#" @click.prevent="toggleMode">Register</a></p>
        <p v-else>Already have an account? <a href="#" @click.prevent="toggleMode">Login</a></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthenticateStore } from '@/stores/authenticate';
import { login, register } from '@/service/HttService';

const router = useRouter();
const loginStore = useAuthenticateStore();

const emailUser = ref('');
const passwordUser = ref('');
const emailUserRegister = ref('');
const passwordUserRegister = ref('');
const nameUserRegister = ref('');
const loginError = ref('');
const emailTouched = ref(false);
const nameTouched = ref(false)
const emailTouchedRegister = ref(false)
const passwordTouchedRegister = ref (false)
const passwordTouched = ref(false);

// Estado para alternar entre login e registro
const isLoginMode = ref(true);

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
const emailErrorRegister = computed(() => {
  if (!emailUserRegister.value) return 'O e-mail é obrigatório.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailUserRegister.value)) return 'E-mail inválido.';
  return '';
});

const passwordErrorRegister = computed(() => {
  if (!passwordUserRegister.value) return 'A senha é obrigatória.';
  if (passwordUserRegister.value.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
  return '';
});

const nameErrorRegister = computed(() => {
  if (!nameUserRegister.value) return 'o nome é obrigatório.';
  if (!/[A-Z]/.test(nameUserRegister.value)) return 'O nome deve conter pelo menos uma letra maiúscula.';
  return '';
});
const isFormValid = computed(() => !emailError.value && !passwordError.value);
const isFormValidRegister= computed(() => !emailErrorRegister.value && !passwordErrorRegister.value);
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

async function handleRegister() {
  emailTouchedRegister.value = true;
  passwordTouchedRegister.value = true;

  try {
    const result = await register({name: nameUserRegister.value, email: emailUserRegister.value, password: passwordUserRegister.value });
    
    if (result?.data) {
      loginStore.saveUser(result.data);
      router.push('/');
      alert('Registro sucesso');
      console.log(result.data)
    } else {
      throw new Error('Credenciais inválidas.');
    }
  } catch (error) {
    loginError.value = 'Falha no registro. Verifique suas credenciais.';
  }
}

// Função para alternar entre login e registro
function toggleMode() {
  isLoginMode.value = !isLoginMode.value;
}
</script>

<style scoped>
.container-page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
}

.logo-container {
  background-color: var(--secondary-color-orange);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vh;
}

.logo-img {
  width: 250px;
  height: 250px;
}

.login-container {
  height: 100vh;
  background-color: var(--secondary-color-orange);
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-card {
  background-color: var(--primary-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  color: var(--neutral-color-01);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color:  var(--neutral-color-01);
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
  background-color: var(--neutral-color-01);
  color:  var(--primary-color);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: var(--neutral-color-04);
}

.login-button:disabled {
  background-color: #a5a5a5;
  cursor: not-allowed;
}

.toggle-mode {
  text-align: center;
  margin-top: 1rem;
}

.toggle-mode a {
  color: var(--secondary-color-blue);
  font-weight: bold;
  cursor: pointer;
}
</style>
