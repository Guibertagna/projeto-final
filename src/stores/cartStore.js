import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {addItemCart, deleteProductcart,getAllCart,getItemsCart,} from "@/service/HttService";
import { useCoupons } from "@/stores/cupons";
import { useOrder } from "./order";
export const useCartProducts = defineStore("cart",() => {
    const productId = ref();
    const quantity = ref();
    const nameProd = ref()
    const cuponCart = ref();
    const unitPrice = ref();
    const discountCoupon = ref(0);
    const discountCouponView = ref(null);
    const itemsCart = ref({
      items: [],
      total_amount: 0
    });
    const isCheckout = ref(false);
    const shipping = ref(0);
    const cart = ref(0);
    const isApplyCupon = ref(false);
    const useCouponsStore = useCoupons();
    const discount = ref(0)
    const orderStore = useOrder();
    const finalPriceShipping = computed(() => {
      if(isApplyCupon.value === false){
        const total = Number(finalPrice.value) + Number(shipping.value);
        return total
      }if(isApplyCupon.value === true){
        discount.value = (Number(discountCoupon.value) / 100 * Number(finalPrice.value));
        const total = (Number(finalPrice.value) + Number(shipping.value)) - Number(discount.value) ;
        return total
      }
      
    });
    const finalPrice = computed(() => {
      const total = itemsCart.value.items?.reduce((acc, item) => {
        return acc + item.unit_price * item.quantity;
      }, 0);
      return total ;
    });
    const productInformation = computed(() => ({
      name: nameProd,
      product_id: productId.value,
      quantity: quantity.value,
      unit_price: unitPrice.value,
    }));
    const productInformationCopy = computed(() => ({
      product_id: productId.value,
      quantity: quantity.value,
      unit_price: unitPrice.value,
    }));
    
    async function addProducts() {
      try {
        const response = await addItemCart(productInformationCopy.value);
        
        // Verifique a estrutura da resposta para garantir que é o que você espera
        console.log("Resposta do addItemCart:", response);
        
        if (response.status === 204) {
          // Verifique se itemsCart.value é um objeto com a estrutura correta
          if (!itemsCart.value.items) {
            itemsCart.value.items = []; // Inicializa se não houver
          }
    
          // Adiciona o produto corretamente
          itemsCart.value.items = [
            ...itemsCart.value.items,
            { ...productInformation.value },
          ];
          itemsCart.value.total_amount = finalPrice.value;
        }
        
        console.log("Itens no carrinho:", itemsCart.value.items);
        return response;
      } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
      }
    }

    async function deleteProductfromcart() {
      const idDelete = { product_id: productId.value };
      try {
        const response = await deleteProductcart(idDelete);
        console.log(itemsCart.items);
        if (response.status === 204) {
          const index = itemsCart.value.items.findIndex(
            (item) => item.product_id === productId.value
          );
          if (index !== -1) {
            itemsCart.value.items.splice(index, 1);
            itemsCart.value = { ...itemsCart.value };
          }
        }
        return response;
      } catch (error) {
        console.error("Erro ao excluir produto do carrinho:", error);
      }
    }

    async function getItemsCartStore() {
      try {
        const response = await getItemsCart();
        itemsCart.value = response;
        console.log(itemsCart)
      } catch (error) {
        console.error("Não foi possível pegar itens do carrinho:", error);
      }
    }
    async function getCartStore() {
      try {
        const response = await getAllCart();
        cart.value = response;
        return response;
      } catch (error) {
        console.log(error);
      }
    }
      function applyCoupon() {
      const couponFound = useCouponsStore.couponStore.find(coupon => coupon.code === cuponCart.value);
      if(couponFound){
        isApplyCupon.value = true;
        discountCouponView.value = couponFound.code;
        discountCoupon.value = couponFound.discount_percentage;
        orderStore.coupom = couponFound.id;

      } else{
        isApplyCupon.value = false;
        discountCouponView.value = '';
        orderStore.coupom = '';
        discountCoupon.value = '';
      }
    }
    return {
      addProducts,
      applyCoupon,
      getCartStore,
      getItemsCartStore,
      deleteProductfromcart,
      addProducts,
      nameProd,
      isApplyCupon,
      discountCoupon,
      discount,
      cuponCart,
      finalPrice,
      shipping,
      cart,
      finalPriceShipping,
      isCheckout,
      itemsCart,
      productId,
      quantity,
      unitPrice,
      discountCouponView,
    };
  },
  {
    persist: true,
  }
);