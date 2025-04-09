<template>
    <div class="all-content">
        <div class="card-coupon">
            <div>
                <label for="code">Code of coupon</label>
                <input id="code" v-model="useCoupon.couponCode" type="text" >
            </div>
            <div>
                <label for="percentage">Discount Percentage</label>
                <input id="percentage" v-model="useCoupon.couponPercentage" type="number">
            </div>
            <div>
                <label for="start">Start date discount</label>
                <input id="start" v-model="useCoupon.couponStartDate" type="date" >
            </div>
            <div>
                <label for="end">End date discount</label>
                <input id="end" v-model="useCoupon.couponEndDate" type="date" >
            </div>
        </div>
        <div v-if="useCoupon.couponCode && useCoupon.couponPercentage && useCoupon.couponStartDate && useCoupon.couponEndDate">
            <button @click="useCoupon.createCouponsStore">Create coupon</button>
            
        </div>
        <div >
            <div v-for="(coupons, index) in useCoupon.couponStore" :key="index">

            <div class="card-coupon">
                <h3>Code: {{ coupons.code}}</h3>AAA
                <p>Percentage: {{ coupons.discount_percentage }}%</p>
                <p>Start date: {{ coupons.start_date }}</p>
                <p>End date: {{ coupons.end_date}}</p>
            </div>

        </div>
        
        </div>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { useCoupons } from '@/stores/cupons';
import { onMounted } from 'vue';
const useCoupon = useCoupons();

</script>

<style >

</style>

