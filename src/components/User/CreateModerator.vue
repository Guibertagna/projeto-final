<template>
    <div class="login-container">
      <form @submit.prevent="sendModerator" class="login-card">
        <h1 class="login-title">Criar Moderador</h1>
  
        <div class="form-group">
          <label for="name">Nome:</label>
          <input
            id="name"
            type="text"
            v-model="auth.nameModerator"
            @blur="nameTouched = true"
            class="form-input"
            :class="{ 'input-error': nameTouched && nameError }"
          />
          <p v-if="nameTouched && nameError" class="error-message">{{ nameError }}</p>
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            type="email"
            v-model="auth.emailModerator"
            @blur="emailTouched = true"
            placeholder="exemplo@exemplo.com"
            class="form-input"
            :class="{ 'input-error': emailTouched && emailError }"
          />
          <p v-if="emailTouched && emailError" class="error-message">{{ emailError }}</p>
        </div>
  
        <div class="form-group">
          <label for="password">Senha:</label>
          <input
            id="password"
            type="password"
            v-model="auth.passwordModetator"
            @blur="passwordTouched = true"
            class="form-input"
            :class="{ 'input-error': passwordTouched && passwordError }"
          />
          <p v-if="passwordTouched && passwordError" class="error-message">{{ passwordError }}</p>
        </div>
  
        <button class="login-button" type="submit" :disabled="!isFormValid">Criar</button>
      </form>
  
      <LoaderComponent />
      <AlertBoxComponent
        :visible="showSuccess"
        :message="messageOK"
        @close="showSuccess = false"
      />
      <ErrorAlert
        :message="errorMessage"
        :visible="showError"
        @close="showError = false"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useAuthenticateStore } from '@/stores/authenticate'
  import { useLoader } from '@/stores/loader'
  import LoaderComponent from '@/components/Loaders/LoaderComponent.vue'
  import AlertBoxComponent from '@/components/Loaders/AlertBoxComponent.vue'
  import ErrorAlert from '@/components/Loaders/ErrorAlert.vue'
  
  const auth = useAuthenticateStore()
  const loading = useLoader()
  
  const showSuccess = ref(false)
  const showError = ref(false)
  const messageOK = ref('Moderador criado com sucesso.')
  const errorMessage = ref('Erro ao criar moderador.')
  
  const nameTouched = ref(false)
  const emailTouched = ref(false)
  const passwordTouched = ref(false)
  
  const nameError = computed(() => {
    if (!auth.nameModerator) return 'O nome é obrigatório.'
    if (!/[A-Z]/.test(auth.nameModerator)) return 'O nome deve conter ao menos uma letra maiúscula.'
    return ''
  })
  
  const emailError = computed(() => {
    if (!auth.emailModerator) return 'O email é obrigatório.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(auth.emailModerator)) return 'Formato de email inválido.'
    return ''
  })
  
  const passwordError = computed(() => {
    if (!auth.passwordModetator) return 'A senha é obrigatória.'
    if (auth.passwordModetator.length < 6) return 'A senha deve ter pelo menos 6 caracteres.'
    return ''
  })
  
  const isFormValid = computed(() =>
    !nameError.value && !emailError.value && !passwordError.value
  )
  
  async function sendModerator() {
    nameTouched.value = true
    emailTouched.value = true
    passwordTouched.value = true
  
    if (!isFormValid.value) return
  
    try {
      loading.startLoading()
      const result = await auth.createModerator()
      if (result.status === 201) {
        auth.nameModerator = ''
        auth.emailModerator = ''
        auth.passwordModetator = ''
        showSuccess.value = true
      }
    } catch (error) {
      showError.value = true
    } finally {
      loading.endLoading()
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    height: 100vh;
    background-color: var(--secondary-color-orange);
    display: flex;
    justify-content: center;
    align-items: center;
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
    color: var(--neutral-color-01);
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
    color: var(--primary-color);
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
  </style>
  