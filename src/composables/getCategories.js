import { ref } from 'vue'; 

export function getCategories() {
    const categories = ref([]);

    const fetchCategories = async () => {
      const response = await fetch('http://localhost:3000/categories');
      try{
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        categories.value = await response.json();
        categories.value.map((category) => {
            category.isOpen = false;
        });
        categories.value[0].isOpen = true;
      }
      catch(err){
        console.log(err);
      }
    };
    fetchCategories();

    return { categories }
}
