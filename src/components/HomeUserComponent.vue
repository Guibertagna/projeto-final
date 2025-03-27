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
                        <h4 v-for="category in categoriesComponent" :key="category.id" class="category">
                            {{ category.name }}
                        </h4>
                </div>
            </div>
            <div class="Products">
                <CardComponentProducts/>
            </div>
            <div class="morecategories">
                <CategoriresCard/>
            </div>
        </div>
    </div>
</template>

<script setup>
import bannerImage from '@/assets/bannerImage.png';
import { useCategoriesStore } from '@/stores/categories';
import { useGetProducts } from '@/stores/getProducts';

import { onMounted, ref } from 'vue';
import CardComponentProducts from './CardComponentProducts.vue';
import CategoriresCard from './CategoriresCard.vue';
const getStoreProducts = useGetProducts()
const categoriesStore = useCategoriesStore();
const categoriesComponent = ref([]);  
const allProducts = ref([]);  
onMounted(async () => {
    await categoriesStore.getCategoriesStores()
    categoriesComponent.value = categoriesStore.categories.data; 
});


</script>

<style scoped>
.banner{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 100px;
    height: 100vh;
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
.category-conetnt{
    padding-top: 40px;
    justify-content: center;
    display: flex;
    gap: 20px;
    flex-direction: row;
}

</style>
