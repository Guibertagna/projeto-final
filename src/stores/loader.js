import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoader = defineStore('loader', ()=>{
    const isLoad = ref(false)
    
    function startLoading(){
        isLoad.value = true;
    }
    function endLoading(){
        isLoad.value = false;
    }
    
    
    return{
        endLoading,
        startLoading,
        isLoad,
    }
})