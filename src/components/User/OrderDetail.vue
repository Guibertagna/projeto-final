
<template>
  <div class="order-detail">
    <div class="order-header">
      <h1>🎉 Thank you for your purchase!</h1>
      <p>Your order has been successfully placed.</p>
    </div>
    <div v-if="isLoading" class="skeleton-container">
  <div class="skeleton-header"></div>
  <div class="skeleton-meta"></div>
  <div class="skeleton-products">
    <div class="skeleton-product" v-for="n in 3" :key="n"></div>
  </div>
</div>
<div v-else-if="order" class="order-info">
      <div class="order-meta">
        <p><strong>Order ID:</strong> {{ order.id }}</p>
        <p><strong>Date:</strong> {{ formattedDate }}</p>
        <p><strong>Status:</strong> {{ order.status }}</p>
      </div>

      <h2 class="section-title">Products</h2>
      <ul class="product-list">
        <li v-for="(product, index) in groupedProducts" :key="index" class="product-card">
          <img :src="getImg(product.image_path)" alt="Product Image" />
          <div class="product-info">
            <p class="product-name">{{ product.name }} <span class="product-qty">(x{{ product.quantity }})</span></p>
            <p class="product-price">Price: ${{ product.price }}</p>
            <p class="product-subtotal">Subtotal: ${{ (parseFloat(product.price) * product.quantity).toFixed(2) }}</p>
            <p class="product-description">{{ product.description }}</p>
          </div>
        </li>
      </ul>

      <div class="order-total">
        <h3>Total: ${{ totalAmount.toFixed(2) }}</h3>
        <button class="button" @click="router.push('/orders')">Go to all Orders</button>
      </div>
    </div>
  </div>
</template>  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useOrder } from '@/stores/order'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const orderStore = useOrder()
  const route = useRoute()
  const id = ref(route.params.id)
  const isLoading = ref(true)

  
  const order = computed(() => {
    return orderStore.userOrders.find(p => p.id === Number(id.value))
  })
  
  const formattedDate = computed(() => {
    if (!order.value?.order_date) return ''
    return new Date(order.value.order_date).toLocaleString()
  })
  
  function groupProducts(products) {
    const grouped = {}
  
    products?.forEach(product => {
      const key = product.name
      if (!grouped[key]) {
        grouped[key] = {
          ...product,
          quantity: 1,
        }
      } else {
        grouped[key].quantity += 1
      }
    })
  
    return Object.values(grouped)
  }
  function getImg(imagePath) {
        const baseUrl = "http://35.196.79.227:8000";
        return `${baseUrl}${imagePath}`;
    }
  
  const groupedProducts = computed(() => {
    return order.value ? groupProducts(order.value.products) : []
  })
  
  const totalAmount = computed(() => {
    return groupedProducts.value.reduce((total, product) => {
      return total + parseFloat(product.price) * product.quantity
    }, 0)
  })
  onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
  </script>
  
  <style scoped>
.order-detail {
  padding: 24px;
  background-color: var(--neutral-color-02);
  color: var(--neutral-color-07);
}

.order-header h1 {
  font-size: 28px;
  color: var(--secondary-color-green);
  margin-bottom: 8px;
}

.order-header p {
  color: var(--neutral-color-05);
}

.order-meta p {
  margin: 4px 0;
}

.section-title {
  margin-top: 24px;
  margin-bottom: 12px;
  font-size: 20px;
  color: var(--primary-color);
  border-bottom: 2px solid var(--neutral-color-03);
  padding-bottom: 4px;
}

.product-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-card {
  display: flex;
  background-color: var(--neutral-color-01);
  border: 1px solid var(--neutral-color-03);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.04);
  align-items: flex-start;
  gap: 16px;
}

.product-card img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-weight: bold;
  font-size: 16px;
  color: var(--neutral-color-07);
}

.product-qty {
  font-weight: normal;
  color: var(--neutral-color-04);
}

.product-price,
.product-subtotal,
.product-description {
  font-size: 14px;
  margin-top: 4px;
  color: var(--neutral-color-05);
}

.order-total {
    display: flex;
    justify-content: space-between;
  margin-top: 24px;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
}
.button {
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: var(--neutral-color-01);
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button:hover {
  background-color: var(--secondary-color-orange); /* um tom mais escuro do azul */
  transform: translateY(-2px);
}
.skeleton-container {
  animation: pulse 1.5s infinite;
}

.skeleton-header,
.skeleton-meta,
.skeleton-product {
  background-color: var(--neutral-color-03);
  border-radius: 8px;
  margin: 12px 0;
}

.skeleton-header {
  height: 32px;
  width: 60%;
}

.skeleton-meta {
  height: 16px;
  width: 40%;
}

.skeleton-product {
  height: 100px;
  width: 100%;
  margin-top: 16px;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}

  </style>
  