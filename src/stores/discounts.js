import { createDiscounts, getAllDiscounts, editDiscountsService, deleteDiscountsService } from "@/service/HttService";
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
        description: discountDescription.value,
        discount_percentage: discountPercentage.value,
        start_date: discountStartDate.value,
        end_date: discountEndDate.value,
        product_id: discountProduct_id.value
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
    async function getDiscounts() {
        try{
            const response = await getAllDiscounts()
            console.log(response)
            discountStore.value = response.data
    
        }catch(error){
            console.log(error)
        }
    }
    async function deleteDiscounts (id){
            try{
                const response = await deleteDiscountsService(id)
                if(response.status === 204){
                    discountStore.value = discountStore.value.filter(discount => discount.id !== id)
                    console.log("Produto deletado do pinia com sucesso")
                }
                
            }catch(error){
                console.error("erro ao deletar produto " + idProduct + error)
            }
        }
    async function editDiscounts(id) {
        try{
            const response = await editDiscountsService(couponInformationEdit.value, id)
            return response.data
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
        deleteDiscounts,
        editDiscounts,
        getDiscounts,
        createDiscountsStore,
    }



})
