<template>
    <div class="allContent">
        <div class="banner" :style="{ backgroundImage: `url(${bannerImageToUse})` }">
            <div class="content-banner-dad">
                <div class="content-banner">
                    <div class="tittles">
                            <h1 class="text1-banner">Listen to <br> the <span style="color: #377DFF;"> amazing</span>  music sound</h1>
                            <div class="end-banner">
                                <h3 class="text2-banner">Expericence music like never before</h3>
                                <button @click="router.push('/products')" class="button-shop">Shopping Now!</button>
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
                    <h1 class="best">Best Sellers</h1>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import bannerImage from '@/assets/bannerImage.png';
import bannerResponsive from '@/assets/banner-responsive.png';
import { useRouter } from 'vue-router';
import CategoriresCard from './CategoriresCard.vue';
import BestSellers from './BestSellers.vue';
import PromotionCard from './PromotionCard.vue';
import InformationComponents from './InformationComponents.vue';
import NewArrivals from './NewArrivals.vue';
const router = useRouter()
const windowWidth = ref(window.innerWidth);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth);
});

const bannerImageToUse = computed(() =>
  windowWidth.value <= 768 ? bannerResponsive : bannerImage
);
</script>


<style scoped>
.banner{
    display: flex;
    background-color: transparent;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    padding-right: 100px;
    min-height: 100vh;
    background-size: cover;
    background-position: center; /* Posiciona a imagem no centro */
  background-repeat: no-repeat; /* Impede a repetição da imagem */

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

.content-banner {
    display: flex;
    flex-direction: column;
    align-items: end;
}

.end-banner{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

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
@media (max-width: 768px) {
  .banner {
    display: flex;
    justify-content: end;

    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 30px;
    align-items: end;
  }

  .tittles {
    width: 100%;
  }

  .text1-banner {
    font-size: 36px;
    text-align: center;
  }

  .text2-banner {
    font-size: 18px;
    text-align: center;
  }

  .content-banner {
    align-items: center;
  }
}


</style>
