<template>
    <div class="allContent">
        <div class="banner" :style="{ backgroundImage: `url(${bannerImage})` }">
            <div class="content-banner-dad">
                <div class="content-banner">
                    <div class="tittles">
                            <h1 class="text1-banner">Listen to <br> the <span style="color: #377DFF;"> amazing</span>  music sound</h1>
                            <div class="end-banner">
                                <h3 class="text2-banner">Expericence music like never before</h3>
                                <button class="button-shop">Shopping Now!</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="products-containier" >
            <div class="categories">
                <div class="category-conetnt">
                    <h1 class="best">New Arrivals</h1>
                </div>
            </div>
            <div class="products">
                <NewArrivals/>
            </div>
            <div class="morecategories">
                <CategoriresCard/>
            </div>
            <div class="categories">
                <div class="category-conetnt">
                    <h1 class="best">New Arrivals</h1>
                </div>
            </div>
            <div  class="products">
                <BestSellers/>
            </div>
            <div class="promotion-card">
                <PromotionCard/>
            </div>
            <div class="informationComponent">
                <InformationComponents/>
            </div>
        </div>
    </div>
</template>

<script setup>
import bannerImage from '@/assets/bannerImage.png';
import CategoriresCard from './CategoriresCard.vue';
import BestSellers from './BestSellers.vue';
import PromotionCard from './PromotionCard.vue';
import InformationComponents from './InformationComponents.vue';
import NewArrivals from './NewArrivals.vue';

</script>

<style scoped>
.banner{
    display: flex;
    background-color: transparent;
    flex-direction: column;
    justify-content: center;
    padding-right: 100px;
    height: 100vh;
}
.best {
  font-weight: bold;
  padding-left: 40px;
}
.text1-banner{
 
    font-weight: 500;
    color: black;
    text-align: start;
    font-size: 75px;
}

.content-banner{
    display: flex;
    flex-direction: column;
    align-items: end;
}

.tittles{
    width: 600px;

}
.content-banner h1{
    align-items: start;
}

.button-shop{

    color: var( --neutral-color-01);
    padding: 10px;
    border-radius: 10px;
    width: 230px;
    background-color: var(--primary-color);
}
.productsContainer{
    display: flex;
    flex-direction: row;
}
.products{
    margin-bottom: 40px;
}
.category-conetnt{
    padding-top: 40px;
    justify-content: start  ;
    display: flex;
    gap: 20px;
    flex-direction: row;
}

</style>
