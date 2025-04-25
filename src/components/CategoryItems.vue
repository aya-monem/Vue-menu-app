<template>
    <div class="category-items">
        <Item v-for="item in category.items" :key="item.id" :item="item" />
    </div>
</template>   
<script setup>
const { category } = defineProps(['category']);
import Item from './Item.vue'
</script>
<style scoped>
.category-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 1rem; 
    padding: 1rem 0;
    border-radius: 5px;
}
@media (max-width: 1024px) {
    .category-items {
        grid-template-columns: repeat(3, 1fr);
    }
}
@media (max-width: 768px) {
    .category-items {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .category-items {
        grid-template-columns: 1fr;
    }
}
</style>