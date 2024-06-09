
import axios from 'axios';
const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products/category/mens-shirts');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export {fetchProducts}