<!-- <div class="card">
    <h2>Shopping Cart</h2>
    <div class="cart-items">
      <div
        v-for="(item, index) in groupitems"
        :key="item.product_id"
        class="cart-item"
      >
        <div class="productd">
          <div class="img">
            <img :src="getImg(item.image_path)" alt="Product Image" />
          </div>
          <div class="information">
            <div class="name">{{ item.name }}</div>
            <div class="price">
              Unit Price: <span>R$ {{ item.unit_price.toFixed(2) }}</span>
            </div>
            <div class="total">
              Total: <span>R$ {{ item.total_price.toFixed(2) }}</span>
            </div>
          </div>
          <div class="quantity-container">
            <button class="quantity-btn" :disabled="useCart.isCheckout" @click="removeItemCart(item.product_id)">-</button>
            <div class="quantity">
              <span>{{ item.quantity }}</span>
            </div>
            <button class="quantity-btn" :disabled="useCart.isCheckout" @click="addToCart(item.product_id, item.unit_price)">+</button>
          </div>
        </div>
        <hr v-if="index < groupitems.length - 1" class="divider" />
      </div>
    </div>
    <div class="cart-summary">
      <strong>Cart Total:</strong> R$ <p>Total: R$ {{ totalAmount.toFixed(2)}}</p>
    </div>
    <button class="checkout-btn" :disabled="groupitems.length === 0 " @click="proceedToCheckout()">
      Proceed to Checkout
    </button>
    <div v-if="groupitems.length === 0" class="empty-cart">
      Your cart is empty
    </div>
  </div> -->