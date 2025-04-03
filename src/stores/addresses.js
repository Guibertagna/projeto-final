import { computed, ref} from 'vue';

import { defineStore } from 'pinia';
import { addAddresses, getAllAddresses } from '@/service/HttService';
import { useAuthenticateStore } from './authenticate';
export const useAddresses = defineStore('addresses', ()=>{
    const streetStore = ref()
    const numberStore = ref()
    const zipStore = ref()
    const cityStore = ref()
    const stateStore = ref()
    const countryStore = ref()
    const useAuth = useAuthenticateStore()
    const userAddresses = ref()
    const addressInformation = computed(()=>({
        street : streetStore.value,
        number: numberStore.value,
        zip: zipStore.value,
        city: cityStore.value,
        state: stateStore.value,
        country: countryStore.value,
        id: null,
        user_id: useAuth.user.id,
    }))
    async function addAddress() {
        try{
            const data = await addAddresses(addressInformation.value);
            console.log(data)
            return data
        }catch(error){
            console.log("não foi possivel criar endereço store" + error )
        }
        
    }
    async function  getAddress() {
        try{
            const response = await getAllAddresses()
            userAddresses.value = response.data
            return data
        }catch(error){
            console.log(error)
        }
    }
    return{
    streetStore,
    numberStore,
    zipStore,
    cityStore,
    stateStore,
    userAddresses,
    countryStore,
    getAddress,
    addAddress,
    }
    
})