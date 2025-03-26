<template>
    <div v-if="!isLoginPage" class="container-header" >
        <div class="promotion">
            <img class="ticket" src="@/assets/icons/ticket-percent.svg" > 
            <p>30% off storewide — Limited time! </p>
            <p class="shop-now"> Shosp now  </p>
            <img class="arrow-right" src="@/assets/icons/arrow-right.svg" > 
           
        </div>
        <div class="all-content">
            <div class="content-intern">
                <img class="logo" src="@/assets/loginho.png">
            <nav class="links">
                <li>Home</li>
                <li>Shop</li>
                <li>Product</li>
                <li>Contact Us</li>
            </nav>
            <nav class="icons-header">
                <img src="@/assets/icons/search-02.svg">
                <img src="@/assets/icons/user-circle.svg">
                <img src="@/assets/icons/search.svg">
            </nav>
            </div>
        </div>

    </div>
</template>

<script setup>

</script>
<script setup>
import { computed } from "vue";
import { useRoute } from 'vue-router';
const route = useRoute()

const isLoginPage = computed(() => route.path === "/userlogin"); 
</script>
<style scoped>
.arrow-right {
  filter: brightness(0) saturate(100%) invert(55%) sepia(84%) saturate(479%) hue-rotate(4deg) brightness(102%) contrast(103%);
}

.icons-header img {
    width: 24px;
    height: 24px; 
}
.promotion{
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
.shop-now{
    text-decoration: underline;
    color: var( --secondary-color-orange);
}

.logo{
    height: 16px;
    width: 50px;
}

.all-content{
    background-color: transparent;
    display: flex;
    justify-content: center;
    max-height: 60px;
    align-items: center;
    padding: 20px;
}
.content-intern{
    justify-content: space-between;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.links{
    gap: 20px;
    list-style-type: none;
    display: flex;
}
.icons-header{
    display: flex;
    gap: 10px;
}
.icons-header img{
    margin-left: 10px;
}

</style>

 