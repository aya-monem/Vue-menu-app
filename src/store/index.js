import { reactive, computed } from 'vue';
import categoriesData from '@/data/categories.json';

const store = reactive({
  categories: [],
  selectedMenuItems: [],
  searchValue: null,
  selectedOption: 'all',

  categoriesNames: computed(()=>{
    return store.categories.map(category => category.name)
  }),
  
  filteredCategories: computed(() => {
    let allCategories = store.categories;//JSON.parse(JSON.stringify(store.categories));

    if(store.searchValue == '' && store.selectedOption == 'all'){
      // allCategories = store.categories;
      allCategories = allCategories;
      allCategories[0].isOpen = true;
    }
    if (store.selectedOption !== 'all') {
      allCategories = allCategories.filter(category => category.name === store.selectedOption);
      allCategories[0].isOpen = true;
    }
    if (store.searchValue) {
      const query = store.searchValue.toLowerCase();
      allCategories = allCategories.map((category) => {
        let filteredItems = category.items.filter(item => item.title.toLowerCase().includes(query));
        return {
          ...category,
          items: filteredItems,
          isOpen: true
        };
      }).filter(category => category.items.length > 0)
    }
    return allCategories;
  }),
  // updateSelectedItems(item){
  //   const existingItem = store.selectedMenuItems.find(menuItem => menuItem.id === item.id);
  //   if(existingItem && item.selected){
  //     existingItem.quantity = item.quantity
  //   }
  //   else if(!existingItem && item.selected){
  //     item.quantity = 1;
  //     store.selectedMenuItems.push(item)
  //   }
  //   else if(!item.selected){
  //     item.quantity = 0;
  //     store.selectedMenuItems = store.selectedMenuItems.filter(menuItem => menuItem.id != item.id)
  //   }
    
  // },

  updateSelectedItems(item){
    const index = store.selectedMenuItems.findIndex(menuItem => menuItem.id === item.id);
      if(item.selected){
        if(index !== -1) store.selectedMenuItems[index].quantity = item.quantity;
        else store.selectedMenuItems.push(item)
      }
      else{
        const index = store.selectedMenuItems.findIndex(menuItem => menuItem.id === item.id);
        if(index !== -1) store.selectedMenuItems.splice(index, 1); 
        // store.selectedMenuItems = store.selectedMenuItems.filter(menuItem => menuItem.id != item.id)
    }
  },

  updateItemQuantity(item){
    if(item.quantity){
      const existingItem = store.selectedMenuItems.find(menuItem => menuItem.id === item.id);
      existingItem.quantity = item.quantity
    }
  },

  toggleIsOpenCategory(catId){
    const category = store.categories.find(category => category.id === catId);
    if(category){
      category.isOpen = !category.isOpen;
    }
  },
  fetchCategories() {
    let categories = categoriesData.categories;
    // store.categories = categoriesData.categories;
  store.categories = categories.map(category => ({
    ...category,
    isOpen: false,
    items: category.items.map(item => ({
      ...item,
      selected: false,
      quantity: 1
    }))
  }));

  store.categories[0].isOpen = true;
  },
  // async fetchCategories() {
  //   const response = await fetch('http://localhost:3000/categories');
  //   try{
  //     if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //     }
  //     store.categories = await response.json();
  //     store.categories.map((category) => {
  //         category.isOpen = false;
  //     });
  //     store.categories[0].isOpen = true;
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }
});

export function useStore() {
  return store;
}