
import { createCategorie, getCategories } from '@/service/HttService';
import { deleteCategorieService } from '@/service/HttService';
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
        try{
            const storeCategories = await getCategories()
            categories.value = storeCategories
            console.log(categories.value)
        }catch(error){
            console.error("Erro ao buscar categorias:", error);
        }finally{
            
        }
        
    }
    async function deleteCategorie(idCategory) {
        try {
            const data = await deleteCategorieService(idCategory);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async function createCategory() {
        try{
            const data = await createCategorie(categoryData.value)
            return data
        }catch(error){
            console.error("Erro ao criar categorias:", error);
        }finally{
            
        }
    }


    return{
        createCategory,
        deleteCategorie,
        getCategoriesStores,
        categoryData,
        categories,
        nameCategorie,
        descripitonCategorie,
    }
})