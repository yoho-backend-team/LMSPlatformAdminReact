// FaqCategoryThunks.js
import { getAllFaqCategories as fetchAllFaqCategories } from '../services/faqCategoryServices'; // Replace with your service file
import { setFaqCategories, setLoading } from './faqCategorySlice';

export const getAllFaqCategories = (querys) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllFaqCategories(querys); // Implement this function in your services
    dispatch(setFaqCategories(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
