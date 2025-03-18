<template>
<div>
    aaaaaaaaaaaaaaaaaaaaaaaaa
</div>
</template>
<script setup>
import {login}  from '@/services/HttService';

const userCredentials = {
  email: 'guirogeriobertagna00@gmail.com',
  password: 'batata'
};

login(userCredentials)
  .then((data) => {
    console.log('Login bem-sucedido', data);
  })
  .catch((error) => {
    console.error('Falha no login', error);
  });
</script>
