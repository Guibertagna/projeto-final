<template>
    <div>
        <div class="all-contet">
            <div class="space-y-4">
                <label for="streetStore">Rua</label>
                <input id="streetStore" v-model="useAddress.streetStore" type="text" placeholder="Rua" class="input" />
                
                <label for="numberStore">Número</label>
                <input id="numberStore" v-model="useAddress.numberStore" type="text" placeholder="Número" class="input" />
                
                <label for="zipStore">CEP</label>
                <input id="zipStore" v-model="useAddress.zipStore" type="text" placeholder="CEP" class="input" />
                
                <label for="cityStore">Cidade</label>
                <input id="cityStore" v-model="useAddress.cityStore" type="text" placeholder="Cidade" class="input" />
                
                <label for="stateStore">Estado</label>
                <input id="stateStore" v-model="useAddress.stateStore" type="text" placeholder="Estado" class="input" />
                
                <label for="countryStore">País</label>
                <input id="countryStore" v-model="useAddress.countryStore" type="text" placeholder="País" class="input" />
            </div>
        </div>
        <div class="buttons" >
            <button @click="useAddress.addAddress()">
                Add
            </button>
        </div>
    </div>
</template>

<script setup >
    import { useAddresses } from '@/stores/addresses';
    const useAddress = useAddresses()
    function sendAddresses(){
        useAddress.addAddress
    }
</script>
<style>
    .input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        display: block;
        margin-top: 4px;
    }

    label {
        display: block;
        font-weight: bold;
        margin-top: 8px;
    }
</style>
