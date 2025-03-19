<template>
    <div>
        <h1>Categories</h1>
        <div v-if="categoriesComponent.length > 0">
            <ul>
                <li v-for="category in categoriesComponent" :key="category.id">
                    {{ category.name }}
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Loading categories...</p>
        </div>
    </div>
</template>
<script setup>
import { useCategoriesStore } from '@/stores/categories';
import { onMounted, ref } from 'vue';

const categoriesStore = useCategoriesStore();
const categoriesComponent = ref([])
onMounted(async () => {
    await getCategorie();
    categoriesComponent.value = categoriesStore.categories;
});
async function getCategorie(){
    await categoriesStore.getCategoriesStores()
    }
</script>