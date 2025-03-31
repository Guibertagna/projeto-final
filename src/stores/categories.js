
import { createCategorie, editCategoryService, getCategories, getCategoryById} from '@/service/HttService';
import { deleteCategorieService } from '@/service/HttService';
import { defineStore } from 'pinia';
import { ref, computed} from 'vue';

export const useCategoriesStore = defineStore('catgories', ()=>{
    const categories = ref([])
    const nameCategorie = ref("")
    const descriptionCategorie = ref("")
  
const categoryData = computed(() => ({
    name: nameCategorie.value,
    description: descriptionCategorie.value,
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

    async function getCategoryId(idCategory) {
        try{
            const data = await getCategoryById(idCategory);
            return data
        }catch(error){
            console.error(error);
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
    async function editCategoryEdit(idCategory) {
        try {
            const data = await editCategoryService(idCategory, categoryData.value); // Agora o id vai corretamente
            return data;
        } catch(error) {
            console.error("Erro ao editar categorias:", error);
        }
    }

    return{
        createCategory,
        deleteCategorie,
        getCategoriesStores,
        getCategoryId,
        editCategoryEdit,
        categoryData,
        categories,
        nameCategorie,
        descriptionCategorie,
    }
})