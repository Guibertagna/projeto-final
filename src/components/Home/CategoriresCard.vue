<script setup>

</script>

<template>
    <div class="all-content">
        <div class="tille">
            <h1>Best Categories</h1>
        </div>
       <div class="card-container">
        <div class="headphone">
            <img src="@/assets/p_56021_alta_1-Photoroom.png" alt="">
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
                <img src="@/assets/black-01-solobuds-Photoroom.png" class="phone" >
            </div>
            <div class="accessories">
                <div class="button-text">
                    <h2>Assesories</h2>
                <div class="button-product">
                    <button>Collection <img class="arrow-right" src="@/assets/icons/arrow-right.svg" alt="arrow"></button>
                </div>
                </div>
                <img src="@/assets/HPSA2-Photoroom.png" class="cabe">
            </div>
        </div>
       </div>
    </div>


</template>



<style scoped>
.tille{
    display: flex;
    flex-direction: row;
    justify-content: start;
    padding-left:30px ;
}
.tille h1{
    font-weight: bold;
}
.all-content {
    padding-top: 100px;
 
}
.card-container{
    justify-content: space-around;
    display: flex;
}
.headphone{
    text-align: center;
    background-color:#F3F5F7 ;
    max-width: 500px
}
.buds-acessories {
    background-color: #F3F5F7;
    width: 500px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.accessories, .earbuds {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 15px 0; 
}

.accessories img, .earbuds img {
    max-width: 300px;
    height: auto;
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

@media (max-width: 768px) {
  .tille {
    justify-content: center;
    padding-left: 0;
    text-align: center;
  }

  .card-container {
    flex-direction: column;
    align-items: center;
  }

  .headphone,
  .buds-acessories {
    max-width: 100%;
  }

  .accessories,
  .earbuds {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}


</style>