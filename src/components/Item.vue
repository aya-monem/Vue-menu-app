<template>
    <div class="category-item">
        <div class="checkbox-container">
            <input 
                type="checkbox" 
                v-model="item.selected"
                @change="store.updateSelectedItems(item)" 
                class="item-checkbox" 
            />
        </div>
        <img :src="item.imgUrl" alt="Item Image" class="item-image" />
        <div class="item-details">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <p class="item-price">$ {{ item.price }}</p>
            <p>Quantity</p>
            <select v-model="item.quantity" class="input-field" @change="store.updateSelectedItems(item)">
                <option v-for="q in 10" :key="q" :value="q">{{ q }}</option>
            </select>
            <!-- <select v-else disabled class="input-field">
                <option >1</option>
            </select> -->
        </div>
    </div>
</template>
<script setup>
import { useStore } from "../store";
const store = useStore();
const { item } = defineProps(['item']);
// item.quantity = item.quantity || 1
// if (!item.selected) {
//     item.selected = false;
//     item.quantity = 0;
// }

</script>
<style scoped>
.category-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid lightgray;
    max-height: 450px; 
    flex: 1; 
    box-sizing: border-box;
    position: relative;
}
.checkbox-container {
    position: absolute;
    top: 10px;
    left: 10px;
}

.item-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.item-image {
    width: 100%; 
    height: 40%; 
    object-fit: cover;
}
.item-details{
    padding:0 1rem;
}
.item-details p {
    margin: 0.5rem 0;
    font-size: 1em;
}
.item-price {
    font-weight: bold;
    color: #2e79ba;
}
.input-field, .input-field:disabled {
  padding: 5px 10px; 
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
}
.input-field:disabled{
    padding: 5px 15px; 
}
@media (max-width: 480px) {
    .category-item {
        max-height: 400px; 
    }
    .item-image {
        height: 50%; 
    }
    .input-field, .input-field:disabled {
        font-size: 14px;
    }
}
</style>