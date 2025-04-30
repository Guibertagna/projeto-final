<template>
  <div class="orders-component">
    <div class="filter-container">
      <label for="statusFilter">
        Filter by state: </label>
      <select id="statusFilter" v-model="selectedStatus" class="filter-select">
        <option value="">ALL</option>
        <option value="PENDING">PENDING</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="COMPLETED">COMPLETED</option>
        <option value="CANCELED">CANCELED</option>
      </select>
    </div>

    <div v-if="filteredOrders.length === 0" class="no-orders-message">
      <p>No orders with this status.</p>
    </div>

    <div v-for="order in filteredOrders" :key="order.id" class="order-card">
      <h2>ORDER #{{ order.id }}</h2>
      <p><strong>Deta:</strong> {{ formatDate(order.order_date) }}</p>
      <p>
        <strong>Status:</strong>
        <span class="status-flag" :style="{ backgroundColor: getStatusColor(order.status) }">
          {{ order.status }}
        </span>
      </p>

      <div class="products">
        <h3>Products:</h3>
        <ul>
          <li 
            v-for="(product, index) in groupProducts(order.products)" 
            :key="index" 
            class="product-item"
          >
            <img :src="getImg(product.image_path)" alt="Imagem do produto" class="product-image" />
            <div class="product-details">
              <p><strong>{{ product.name }}</strong> ({{ product.quantity }}x)</p>
              <p>unt Price:  {{ formatCurrency(parseFloat(product.price).toFixed(2))}}</p>
            </div>
          </li>
        </ul>
        <p class="total-amount">
          <strong>Total:</strong> {{ formatCurrency(calculateTotalAmount(order.products).toFixed(2))}}
        </p>
      </div>
    </div>
  </div>
</template>

  <script setup>
  import { ref, computed } from 'vue';
  import { useOrder } from '@/stores/order';
  const selectedStatus = ref()
  const order = useOrder()
  const totalAmout = ref()

  function groupProducts(products) {
  const grouped = {};

  products.forEach(product => {
    const key = product.name; 
    if (!grouped[key]) {
      grouped[key] = {
        ...product,
        quantity: 1,
      };
    } else {
      grouped[key].quantity += 1;
    }
  });

  return Object.values(grouped);
}
const filteredOrders = computed(() => {
  if (!selectedStatus.value) {
    return order.userOrders;
  }
  return order.userOrders.filter(o => o.status === selectedStatus.value);
});
function calculateTotalAmount(products) {
  const groupedProducts = groupProducts(products);

  return groupedProducts.reduce((total, product) => {
    return total + (parseFloat(product.price) * product.quantity);
  }, 0);
}
function getImg(imagePath) {
  const baseUrl = 'http://35.196.79.227:8000';
  return `${baseUrl}${imagePath}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${year}`;
}

  const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

function getStatusColor(status) {
  switch (status) {
    case 'PENDING':
      return '#FACC15'; // amarelo
    case 'PROCESSING':
      return '#3B82F6'; // azul
    case 'SHIPPED':
      return '#06B6D4'; // ciano
    case 'COMPLETED':
      return '#22C55E'; // verde
    case 'CANCELED':
      return '#EF4444'; // vermelho
    default:
      return '#9CA3AF'; // cinza
  }
}
  </script>
  
  <style scoped>
  .orders-component {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    min-height: 100vh; /* Garantir que ocupe 100% da altura da tela */
    box-sizing: border-box; /* Para garantir que o padding não ultrapasse a altura */
  }
  
  .no-orders-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #888;
    font-size: 1.2em;
  }
  
  .order-card {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
  }
  .filter-container{
    display: flex;
    gap: 16px;
    justify-content: center;
    width: 100%;
  }
  .product-item {
    border-top: 1px solid rgb(153, 149, 149);
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    padding-top: 50px;
  }
  
  .product-item:first-child {
    border-top: none;
  }
  
  .product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 12px;
    border-radius: 4px;
  }
  
  .product-details p {
    margin: 0;
  }
  
  .status-flag {
    padding: 4px 8px;
    border-radius: 12px;
    color: white;
    font-weight: bold;
    font-size: 0.9em;
    margin-left: 8px;
    display: inline-block;
  }
  </style>