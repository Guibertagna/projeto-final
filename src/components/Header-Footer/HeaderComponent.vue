<template>
    <div v-if="!isLoginPage" class="container-header">
        <div class="promotion">
            <img class="ticket" src="@/assets/icons/ticket-percent.svg"> 
            <p>30% off storewide — Limited time!</p>
            <p class="shop-now">Shop now</p>
            <img class="arrow-right" src="@/assets/icons/arrow-right.svg"> 
        </div>
        <div class="all-content">
            <div class="content-intern">
                <img class="logo" src="@/assets/loginho.png">
                
                <nav class="links">
                    <router-link to="/" class="back-button">
                        <li >Home</li>
                    </router-link>
                    <li>Shop</li>
                    <li>Product</li>
                    <li>Contact Us</li>
                </nav>
                <nav class="icons-header">
                    <img src="@/assets/icons/search-02.svg">
                    <div class="dropdown-wrapper">
                        <img src="@/assets/icons/user-circle.svg" @click="toggleDropdown" class="user-icon">
                        <div v-if="showDropdown" class="dropdown-menu">
                            <p>Profile</p>
                            <p>Settings</p>
                            <p @click="userStore.logout()">Logout</p>
                            <p v-if="userStore.user.role == 'ADMIN' || 'MODERATOR'"  @click="gotoModerator()"> Moderator Area</p>
                            
                        </div>
                    </div>
                    <router-link to="/cart">
                        <img class="carrinho-icon" src="@/assets/icons/search.svg"  @click="toggleCart()">
                    </router-link>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { useAuthenticateStore } from "@/stores/authenticate";


const router = useRouter()
const isLoginPage = computed(() => router.path === "/userlogin");
const showDropdown = ref(false);
const isCartOpen = ref(false);
const userStore = useAuthenticateStore()
const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};
const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
};

function gotoModerator(){
    showDropdown.value = !showDropdown.value;
    router.push('/moderator')
}


function gotoCreateCategories(){
    showDropdown.value = !showDropdown.value;
    router.push('/createcategories')
}


</script>


<style scoped>
.arrow-right {
  filter: brightness(0) saturate(100%) invert(55%) sepia(84%) saturate(479%) hue-rotate(4deg) brightness(102%) contrast(103%);
}
.icons-header img {
    width: 24px;
    height: 24px; 
    cursor: pointer;
}
.promotion {
    justify-content: center;
    gap: 15px;
    color: var(--neutral-color-01);
    display: flex;
    padding: 10px 20px;
    align-items: center;
    background-color: var(--primary-color);
    max-height: 40px;
}
.ticket {
  filter: invert(1) brightness(100%);
}
.shop-now {
    text-decoration: underline;
    color: var(--secondary-color-orange);
}
.logo {
    height: 16px;
    width: 50px;
}
.all-content {
    background-color: transparent;
    display: flex;
    justify-content: center;
    max-height: 60px;
    align-items: center;
    padding: 20px;
}
.content-intern {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.links {
    gap: 20px;
    list-style-type: none;
    display: flex;
}
.icons-header {
    display: flex;
    gap: 10px;
    align-items: center;
}
.user-icon {
    position: relative;
}
.dropdown-wrapper {
    position: relative;
}
.dropdown-menu {
    position: absolute;
    top: 30px;
    right: 0;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 120px;
}
.dropdown-menu p {
    margin: 0;
    padding: 5px 10px;
    cursor: pointer;
    transition: background 0.2s;
}
.dropdown-menu p:hover {
    background: #f0f0f0;
}
@media (max-width: 768px) {
    .promotion {
    flex-direction: column;
    text-align: center;
    gap: 4px;
    padding: 8px;
    font-size: 14px;
  }

  .promotion img.ticket,
  .promotion img.arrow-right {
    display: none;
  }

  .shop-now {
    display: none;

    font-weight: bold;
  }

  .all-content {
    padding: 10px;
  }

  .content-intern {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .links {
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding-left: 0;
  }

  .icons-header {
    gap: 15px;
  }

  .dropdown-menu {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }
}

</style>
