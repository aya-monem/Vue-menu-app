<template>
    <header class="header">
        <div class="logo">
            <h1><a href="/"> Menu </a></h1>
            <!-- <img src="../assets/logo.svg" alt="Logo" />  -->
        </div>
        <div class="inputs">
            <select v-model="store.selectedOption" class="input-field">
                <!-- <option value="" disabled>Categories: All</option> -->
                <option value="all">Categories: All</option>
                <option v-for="(catName,i) in store.categoriesNames" :key="i">{{ catName }}</option>
            </select>
            <!-- Search input -->
            <div class="search-container">
                <input 
                    type="text" 
                    v-model="store.searchValue"
                    placeholder="Search..." 
                    class="input-field search-input" 
                />
                <span class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                </span>
            </div>
        </div>
    </header>
</template>
<script setup>
import { ref , computed, onMounted} from 'vue';
import { useStore } from "../store";
const store = useStore();
onMounted(() => {
    store.fetchCategories();
});

</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    /* background-color: #f8f9fa; */
    border-bottom: 1px solid #ddd;
    height: 70px;
}

.logo a {
    height: 40px;
    text-decoration: none;
    color: #191919;
}

.inputs {
    display: flex;
    gap: 10px;
}
.input-field {
  padding: 10px 15px; 
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.search-container {
    position: relative;
    display: flex;
    align-items: center;
}

.search-input {
    padding-right: 30px; 
}
.search-icon {
    position: absolute;
    right: 10px;
    font-size: 1rem; 
    color: #888;
    pointer-events: none; 
}
@media (max-width: 480px) {
    .header {
        flex-direction: column;
        align-items: flex-start;
        height: auto;
    }
    .inputs {
        flex-direction: column;
        gap: 5px;
        width: 100%;
    }
    .logo {
        margin-bottom: 10px;
    }
    .input-field {
        width: 100%;
    }
    .search-container {
        width: 100%;
    }
    .search-input {
        width: 100%;
    }
    .search-icon {
        right: 15px;
    } 
}
</style>