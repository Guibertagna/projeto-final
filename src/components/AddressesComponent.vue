<template>
    <div class="address-section">
        <div class="all-contet">
            <div class="space-y-4">
                <label for="streetStore">Street</label>
                <input id="streetStore" v-model="useAddress.streetStore" type="text" placeholder="Street" class="input" />
                
                <label for="numberStore">Number</label>
                <input id="numberStore" v-model="useAddress.numberStore" type="text" placeholder="Number" class="input" />
                
                <label for="zipStore">Zip Code</label>
                <input id="zipStore" v-model="useAddress.zipStore" type="text" placeholder="Zip Code" class="input" />
                
                <label for="cityStore">City</label>
                <input id="cityStore" v-model="useAddress.cityStore" type="text" placeholder="City" class="input" />
                
                <label for="stateStore">State</label>
                <input id="stateStore" v-model="useAddress.stateStore" type="text" placeholder="State" class="input" />
                
                <label for="countryStore">Country</label>
                <input id="countryStore" v-model="useAddress.countryStore" type="text" placeholder="Country" class="input" />
            </div>
        </div>
        <div class="buttons" >
            <button class="button" @click="useAddress.addAddress()">
                Add
            </button>
            <button v-if="useAddress.userAddresses.length != 0" class="button-cancel" @click="useAddress.isCreateAddress = false">
                Cancel
            </button>
        </div>
    </div>
</template>

<script setup >
    import { useAddresses } from '@/stores/addresses';
    const useAddress = useAddresses()
    
</script>
<style scoped>
.address-section{
    border-radius: 5px;
    border: 1px solid var(--primary-color);
    padding: 20px;
    margin-top: 20px; 
    
    display: flex;
    flex-direction: column;
}
    .input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        display: block;
        margin-top: 4px;
    }
    .buttons{
        margin: 20px;
        display: flex;
        justify-content: space-between;
    }
    .button{
        background-color: green;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    .button-cancel{
        background-color: red;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    label {
        display: block;
        font-weight: bold;
        margin-top: 8px;
    }
</style>
