<script setup>

</script>

<template>
    <div class="all-content">
        <div class="tille">
            <h1>Best Categories</h1>
        </div>
       <div class="card-container">
        <div class="headphone">
            <img src="@/assets/p_56021_alta_1.png" alt="">
            <div class="button-text">
                    <h2>Headphone</h2>
                <div class="button-product">
                    <button>Collection <img class="arrow-right" src="@/assets/icons/arrow-right.svg" alt="arrow"></button>
                </div>
            </div>
        </div>
        <div class="buds-acessories"> 
            <div class="earbuds">
                <div class="button-text">
                    <h2>Earbuds</h2>
                <div class="button-product">
                    <button>Collection <img class="arrow-right" src="@/assets/icons/arrow-right.svg" alt="arrow"></button>
                </div>
                </div>
                <img src="@/assets/black-01-solobuds.jpg" >
            </div>
            <div class="accessories">
                <div class="button-text">
                    <h2>Assesories</h2>
                <div class="button-product">
                    <button>Collection <img class="arrow-right" src="@/assets/icons/arrow-right.svg" alt="arrow"></button>
                </div>
                </div>
                <img src="@/assets/HPSA2.jpg">
            </div>
        </div>
       </div>
    </div>


</template>



<style scoped>
.all-content {

    text-align: center;
}
.card-container{

    justify-content: space-around;
    display: flex;
}
.headphone{
   
    max-width: 400px
}
.buds-acessories{
    
    max-width: 300px;
}
.accessories, .earbuds{
    display: flex;
    align-items: center;
    justify-content: center;

}
h2{
    font-weight: bold;
}

.button-product {
  display: flex;
  justify-content: center;
}

.button-product button {
  text-decoration: underline;
  color: var(--primary-color);
  display: flex;
  align-items: center;  
  justify-content: center; 
}


.arrow-right {
  margin-left: 10px;  /* Ajuste o espaçamento entre o texto e a seta */

}


</style>