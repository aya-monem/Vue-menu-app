import { reactive, computed } from 'vue';

const store = reactive({
  categories: [],
  selectedMenuItems: [],
  searchValue: null,
  selectedOption: 'all',

  categoriesNames: computed(()=>{
    return store.categories.map(category => category.name)
  }),
  
  filteredCategories: computed(() => {
    let allCategories = JSON.parse(JSON.stringify(store.categories));

    if(store.searchValue == '' && store.selectedOption == 'all'){
      allCategories = store.categories;
    }
    if (store.selectedOption !== 'all') {
      allCategories = allCategories.filter(category => category.name === store.selectedOption);
      allCategories[0].isOpen = true;
    }
    if (store.searchValue) {
      const query = store.searchValue.toLowerCase();
      allCategories.forEach((category) => {
        category.items = category.items.filter(item => item.title.toLowerCase().includes(query));
        category.isOpen = true;
        return category;
      });
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
  searchResults: computed(() => {
    if (store.searchValue) {
      const query = store.searchValue.toLowerCase();
      store.categories.map((category) => {
        // console.log(category.items)
        category.items = category.items.filter(item => item.title.toLowerCase().includes(query));
        category.isOpen = true;
      });
      return store.categories.filter(category => category.name.toLowerCase().includes(query));
    }
    else return store.categories;
  }),

  updateSelectedItems(item){
    if(item.selected){
      // item.quantity = 1;
      store.selectedMenuItems.push(item)
    }
    else{
      const index = store.selectedMenuItems.findIndex(menuItem => menuItem.id === item.id);
      if (index !== -1) {
        store.selectedMenuItems.splice(index, 1); 
      }
      // item.quantity = 0;
      // store.selectedMenuItems = store.selectedMenuItems.filter(menuItem => menuItem.id != item.id)
    }
  },

  updateItemQuantity(item){
    if(item.quantity){
      const existingItem = store.selectedMenuItems.find(menuItem => menuItem.id === item.id);
      existingItem.quantity = item.quantity
    }
  },

  async fetchCategories() {
    const response = await fetch('http://localhost:3000/categories');
    try{
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      store.categories = await response.json();
      store.categories.map((category) => {
          category.isOpen = false;
      });
      store.categories[0].isOpen = true;
    }
    catch(err){
      console.log(err);
    }
  }
});

export function useStore() {
  return store;
}