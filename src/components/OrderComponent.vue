<template>
    <div class="content-container">
        <div>
            <div v-for="address in useAddress.userAddresses" :key="address.id" class="address">

                {{ address.number }}
                {{ address.zip }}
                {{ address.city }}
                {{ address.state }}
                {{ address.country }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAddresses } from '@/stores/addresses';
import { useCartProducts } from '@/stores/cartStore';
import { onMounted } from 'vue';
const useAddress = useAddresses()
const useCart = useCartProducts()
onMounted(async () => {

    await useAddress.getAddress();
    console.log("Endereços carregados:", useAddress.userAddresses);
    console.log("CArrinho do usuário", useCart.cart)
});

</script>

<style>
.content-container{
    height: 100vh;
}
</style>