import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  addItemCart,
  deleteProductcart,
  getAllCart,
  getItemsCart,
} from "@/service/HttService";

export const useCartProducts = defineStore(
  "cart",
  () => {
    const productId = ref();
    const quantity = ref();
    const unitPrice = ref();
    const itemsCart = ref([]);
    const isCheckout = ref(false);
    const shipping = ref(0);
    const cart = ref(0);

    const finalPrice = computed(() => {
      const total = itemsCart.value.items.reduce((acc, item) => {
        return acc + item.unit_price * item.quantity;
      }, 0);
      return total + Number(shipping.value);
    });

    const productInformation = computed(() => ({
      product_id: productId.value,
      quantity: quantity.value,
      unit_price: unitPrice.value,
    }));
    async function addProducts() {
      try {
        const response = await addItemCart(productInformation.value);
    console.log(response.data + "RESPONSEEEE");
        if (response.status === 204) {
          itemsCart.value.items = [
            ...itemsCart.value.items,
            { ...productInformation.value },
          ];
        }
        console.log(response);
        console.log(itemsCart.value.items);
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

    return {
      addProducts,
      getCartStore,
      getItemsCartStore,
      deleteProductfromcart,
      finalPrice,
      shipping,
      cart,
      isCheckout,
      itemsCart,
      productId,
      quantity,
      unitPrice,
    };
  },
  {
    persist: true,
  }
);
