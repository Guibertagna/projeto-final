<template>
    <div class="allContent">
        <div class="banner" :style="{ backgroundImage: `url(${bannerImage})` }">
            <div class="content-banner-dad">
                <div class="content-banner">
                    <div class="tittles">
                        <h1 class="text1-banner">Listen to the amazing music sound</h1>
                        <h3 class="text2-banner">Expericence music like never before</h3>
                        <button class="button-shop">Shopping Now!</button>
                        
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
                <div class="products-card">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import bannerImage from '@/assets/bannerImage.png';
import { useCategoriesStore } from '@/stores/categories';
import { onMounted, ref } from 'vue';

const categoriesStore = useCategoriesStore();
const categoriesComponent = ref([]);  // Inicializando o ref como um array vazio.

onMounted(async () => {
    await getCategorie();
    categoriesComponent.value = categoriesStore.categories.data; 
});

async function getCategorie() {
    await categoriesStore.getCategoriesStores();
}
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
    color: black;
    text-align: start;
    font-size: 70px;
}

.content-banner{
    display: flex;
    flex-direction: column;
    align-items: end;
    padding-right: 60px;
}

.tittles{
    width: 600px;

}
.content-banner h1{
    align-items: start;
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
