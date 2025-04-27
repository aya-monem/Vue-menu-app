<script setup>
import { watch } from "vue";
import Header  from "./components/Header.vue";
import CategoriesList from "./components/CategoriesList.vue";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({  });
  import { useStore } from "./store";
  const store = useStore();
  const toastId = 'total-toast';
  watch(store.selectedMenuItems, () => {
    const total = store.selectedMenuItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
    toaster.clear(toastId);
    toaster.show(`Total: $${total.toFixed(2)}`, { type: 'info' , id: toastId});
  },{ deep: true });  
</script>

<template>
  <Header />
  <CategoriesList />
</template>