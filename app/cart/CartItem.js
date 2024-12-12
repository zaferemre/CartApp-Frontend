"use client";

import React from "react";
import { removeFromCart } from "../../services/api";

export default function CartItem({ item, onRemoveItem }) {
    const handleRemove = async () => {
        try {
            await removeFromCart("12345", item.itemId); // Adjust customerId dynamically if needed
            onRemoveItem(); // Trigger parent to fetch the updated cart
        } catch (error) {
            console.error("Error removing item:", error.message);
        }
    };

    return (
        <li className="flex py-6">
            <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
                <img
                    alt={item.imageAlt || "Product image"}
                    src={item.imageSrc}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p>${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {item.quantity}</p>
                    <button
                        onClick={handleRemove}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </li>
    );
}

