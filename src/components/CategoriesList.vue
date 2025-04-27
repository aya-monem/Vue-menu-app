<script setup>
import CategoryItems from './CategoryItems.vue'
// const { categories } = defineProps(['categories']);
import { useStore } from "../store";
const store = useStore();

</script>
<template>
    <div class="categories">
        <div v-for="category in store.filteredCategories" class="category-accordion" :key="category.id">
            <div class="category-name" @click="store.toggleIsOpenCategory(category.id)">
                <h2>{{ category.name }}</h2>
                <svg class="arrow" :class="{ 'arrow-up': category.isOpen, 'arrow-down': !category.isOpen }" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                </svg>
                <!-- <span class="arrow" :class="{ 'arrow-up': category.isOpen, 'arrow-down': !category.isOpen }">&#9660;</span> -->
            </div>
            <CategoryItems :category="category" v-show="category.isOpen"/>
        </div>
    </div>
</template>
<style scoped>
.category-name{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid lightgray;
}
.categories{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.arrow{
    border: 0.5px solid lightgray;
    border-radius: 3px;
    transition: transform 0.5s ease;
}
.arrow-up {
    transform: rotate(180deg);
}
.arrow-down {
    transform: rotate(0deg);
}
</style>