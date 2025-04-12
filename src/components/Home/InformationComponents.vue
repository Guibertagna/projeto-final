<template>
    <div class="all-contet">
        <div class="squares">
            <div class="square">
                <img src="@/assets/icons/fastdelivery.svg">
                <h4>Free Shipping</h4>
                <h6>Order above $200</h6>
            </div>
            <div  class="square">
                <img src="@/assets/icons/money.png">
                <h4>Money-back</h4>
                <h6>30 days guarantee</h6>
            </div>
            <div  class="square">
                <img src="@/assets/icons/lock01.png">
                <h4>Secure Payments</h4>
                <h6>Secured by Stripe</h6>
            </div>
            <div  class="square">
                <img src="@/assets/icons/phone.png">
                <h4>24/7 Support</h4>
                <h6>Phone and Email support</h6>
            </div>
        </div>

    </div>

</template>

<script setup>

</script>


<style scoped >
    .squares{
        margin: 40px;
        align-items: center;
        display: flex   ;
        gap: 24px;
        flex-direction: row;
        justify-content: center;
    }
    .square{
        font-size: 20px;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        width: 250px;
        height: 250px;
        background-color: var(--neutral-color-03);
    }
</style>