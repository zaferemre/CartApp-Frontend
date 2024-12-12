"use client"; // Enables client-side rendering for interactivity

import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { getItems, addToCart } from "../../services/api"; // Add your API service for adding to cart

export default function ItemsPage({ refreshCart }) {
    const [products, setProducts] = useState([]);
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getItems();
                const mappedProducts = data.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: `$${item.price.toFixed(2)}`,
                    imageSrc: item.imageSrc || "https://via.placeholder.com/150",
                    imageAlt: item.imageAlt || "No image available",
                }));
                setProducts(mappedProducts);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const handleAddToCart = async (product) => {
        try {
            const customerId = "12345"; // Replace with dynamic customer ID
            await addToCart(customerId, product.id, 1, product.name, product.imageSrc);

            setCartMessage("Item added to cart!");
            refreshCart(); // Refresh the cart after adding an item
            setTimeout(() => setCartMessage(""), 3000);
        } catch (error) {
            console.error("Error adding to cart:", error);
            setCartMessage("Failed to add item to cart.");
            setTimeout(() => setCartMessage(""), 3000);
        }
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {cartMessage && (
                    <div className="mb-4 p-2 text-center text-sm font-medium text-green-700 bg-green-100 rounded-md">
                        {cartMessage}
                    </div>
                )}
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <img
                                alt={product.imageAlt}
                                src={product.imageSrc}
                                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                            />
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="mt-2 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

