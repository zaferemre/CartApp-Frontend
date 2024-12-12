import axios from "axios";

const BASE_URL = "http://localhost:5012/api"; // Your backend API URL

export const getItems = async () => {
  const response = await axios.get(`${BASE_URL}/items`);
  return response.data;
};

// Add error handling to the getCart function
export const getCart = async (customerId) => {
    const response = await axios.get(`${BASE_URL}/cart/${customerId}`);
    return response.data;
};

export const addToCart = async (customerId, itemId, quantity,name,imageSrc) => {
  const response = await axios.post(`${BASE_URL}/cart/${customerId}/add`, {
    itemId,
    quantity,
    name,
    imageSrc
  });
  return response.data;
};

export const removeFromCart = async (customerId, itemId) => {
    try {
        // Send itemId as a plain string, not wrapped in an object
        const response = await axios.post(`${BASE_URL}/cart/${customerId}/remove`, itemId, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;  // Return the data from the response
    } catch (error) {
        const errorMessage = error.response?.data?.Message || error.message;
        console.error("Error removing item from cart:", errorMessage);

        throw error;  // Re-throw error for further handling if needed
    }
};


