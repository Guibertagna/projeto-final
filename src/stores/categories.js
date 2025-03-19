
import { createCategorie, getCategories } from '@/service/HttService';
import { defineStore } from 'pinia';
import { ref, computed} from 'vue';

export const useCategoriesStore = defineStore('catgories', ()=>{
    const categories = ref([])
    const nameCategorie = ref("")
    const descripitonCategorie = ref("")
  
const categoryData = computed(() => ({
    name: nameCategorie.value,
    description: descripitonCategorie.value,
}));

       
    async function  getCategoriesStores() {
        console.log("enrtouu")
        try{
            const storeCategories = await getCategories()
            categories.value = storeCategories
            console.log(categories.value)
        }catch{
            console.error("Erro ao buscar categorias:", error);
        }
        
    }

    async function createCategory() {

        try{
         const data = await createCategorie(categoryData.value)
         return data
        }catch{
            console.error("Erro ao buscar categorias:", error);
        }
    }


    return{
        createCategory,
        getCategoriesStores,
        categoryData,
        categories,
        nameCategorie,
        descripitonCategorie,
    }
})