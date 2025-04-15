import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { createCoupom, getAllCoupons, getAllCouponByid, editCoupon, deleteCouponService} from "@/service/HttService";

export const useCoupons = defineStore("coupon", () => {
    const couponPercentage = ref(0);
    const couponEndDate = ref('');
    const couponCode = ref('');
    const couponStartDate = ref('');
    const couponStore = ref([]);
    const couponInformation = computed(() => ({
        code: couponCode.value,
        discount_percentage: couponPercentage.value,
        start_date: couponStartDate.value,
        end_date: couponEndDate.value,
    }));
    const couponInformationEdit = computed(() => ({
        discount_percentage: couponPercentage.value,
        start_date: couponStartDate.value,
        end_date: couponEndDate.value,
    }));
    async function createCouponsStore() {
        try{
            const data = await createCoupom(couponInformation.value);
            console.log(data);
            if (data.status === 201) {
                couponStore.value = [...couponStore.value, { ...data.data }];
                couponPercentage.value = "";
                couponEndDate.value = "";
                couponCode.value = "";  
                couponStartDate.value = "";
            }
            return data;
        }catch(error){
            console.log("não foi possivel criar cupom store" + error);
        }
        
    } 
        async function editCouponStore(idCoupon) {
            try {
                const data = await editCoupon(idCoupon, couponInformationEdit.value); 
                console.log(data);
                return data;
            } catch(error) {
                console.error("Erro ao editar coupon:", error);
            }
        }
    async function  getCouponsStore() {
        try{
            const response = await getAllCoupons();
            couponStore.value = response.data;
            console.log(couponStore.value)
            return response;
        }catch(error){
            console.log(error);
        }
    }
        async function getCouponsId(idCoupon) {
            try{
                const data = await getAllCouponByid(idCoupon);
                return data
            }catch(error){
                console.error(error);
            }
        }
        async function deleteCoupons(idCoupon) {
            try{
                const data = await deleteCouponService(idCoupon);
                if(data.status === 204){
                    const index = couponStore.value.findIndex(coupon => coupon.id === idCoupon);
                    if(index !== -1){
                        couponStore.value.splice(index, 1);
                        couponStore.value = [...couponStore.value];
                    }
                }
                return data
            }catch(error){
                console.error(error);
            }
        }
    return{
        couponStore,
        couponCode,
        couponPercentage,
        couponEndDate,
        couponStartDate,
        deleteCoupons,
        getCouponsId,
        editCouponStore,
        getCouponsStore,
        createCouponsStore,
    }
    
    
});
