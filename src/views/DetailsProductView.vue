<template>
    <div class="allContent">  
        <div>
            <DetailPdroduct :id-props="route.params"/>
        </div>
        <div>
            <Recomendation/>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import DetailPdroduct from '@/components/Products/DetailPdroduct.vue';
import Recomendation from '@/components/Products/Recomendation.vue';
const route = useRoute()
</script>

<style setup>
.allContent{
    width: 100%;
    height: auto;
}
</style>