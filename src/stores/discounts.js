import { createDiscounts } from "@/service/HttService";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const useDiscounts = defineStore ("discounts", ()=>{
    const discountPercentage = ref(0);
    const discountEndDate = ref('');
    const discountDescription = ref('');
    const discountStartDate = ref('');
    const discountStore = ref([]);
    const discountProduct_id = ref(0);
   
    const discountInformation = computed(() => ({
        description: discountDescription.value,
        discount_percentage: discountPercentage.value,
        start_date: discountStartDate.value,
        end_date: discountEndDate.value,
        product_id: discountProduct_id.value
    }));
    const couponInformationEdit = computed(() => ({
        description: discountDescription,
        discount_percentage: discountPercentage,
        start_date: discountStartDate,
        end_date: discountEndDate,
        product_id: discountProduct_id
    }));
    async function createDiscountsStore() {
        try{
            
            const response = await createDiscounts(discountInformation.value)
            console.log(response)
            return response
        }catch(error){
            console.log(error)
        }
        
    }
    return{
        discountPercentage,
        discountInformation,
        discountStartDate,
        discountEndDate,
        discountDescription,
        discountProduct_id,
        discountStore,
        createDiscountsStore,
    }



})
