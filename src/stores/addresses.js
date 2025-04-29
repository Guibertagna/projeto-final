import { computed, ref } from "vue";

import { defineStore } from "pinia";
import { addAddresses, editAddressService, getAllAddresses } from "@/service/HttService";
import { useAuthenticateStore } from "./authenticate";
export const useAddresses = defineStore("addresses", () => {
  const streetStore = ref();
  const isCreateAddress = ref(false);
  const numberStore = ref();
  const zipStore = ref();
  const cityStore = ref();
  const stateStore = ref();
  const countryStore = ref();
  const useAuth = useAuthenticateStore();
  const userAddresses = ref([]);
  const addAddress_id = ref()
  const addressInformation = computed(() => ({
    street: streetStore.value,
    number: numberStore.value,
    zip: zipStore.value,
    city: cityStore.value,
    state: stateStore.value,
    country: countryStore.value,
    id: null,
    user_id: useAuth.user.id,
  }));

async function updateAddress(idEdited) {
  try{
    console.log(idEdited)
    const response = await editAddressService(idEdited, addressInformation)

    return response
  }catch(error){
    throw error
  }
}

  async function addAddress() {
    try {
      const data = await addAddresses(addressInformation.value);
      console.log(data);
        if (data.status === 201) {
            userAddresses.value = [...userAddresses.value, { ...data.data }];
            streetStore.value = "";
            numberStore.value = "";
            zipStore.value = "";
            cityStore.value = "";
            stateStore.value = "";
            countryStore.value = "";
        }
      return data;
    } catch (error) {
      console.log("não foi possivel criar endereço store" + error);
    }
  }

  async function getAddress() {
    try {
      const response = await getAllAddresses();
      userAddresses.value = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }

  }
  return {
    streetStore,
    numberStore,
    zipStore,
    cityStore,
    stateStore,
    userAddresses,
    countryStore,
    isCreateAddress,
    addAddress_id,
    updateAddress,
    getAddress,
    addAddress,
  };
});
