"use client";

import React, { useState, useEffect } from "react";
import { getCart } from "../services/api"; // Replace with your API service path
import CartSidebar from "./cart/CartSidebar";
import CartItem from "./cart/CartItem";
export default function Header({ refreshCartTrigger }) {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    const customerId = "12345"; // Replace with dynamic customer ID if applicable

    const fetchCart = async () => {
        try {
            const cart = await getCart(customerId);
            setCartItems(cart.items);
            calculateSubtotal(cart.items);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const calculateSubtotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setSubtotal(total);
    };

    useEffect(() => {
        fetchCart();
    }, [refreshCartTrigger]);

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Company Logo"
                        />
                    </a>
                </div>
                <button
                    onClick={() => setCartOpen(true)}
                    className="text-gray-900 relative"
                >
                    <span className="sr-only">View cart</span>
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18l-2 14H5L3 3z" />
                        <circle cx="9" cy="20" r="1" stroke="none" fill="currentColor" />
                        <circle cx="15" cy="20" r="1" stroke="none" fill="currentColor" />
                    </svg>
                    <span className="absolute top-0 right-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                        {cartItems.length}
                    </span>
                </button>
            </nav>
            <CartSidebar
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                cartItems={cartItems}
                subtotal={subtotal}
                onRemoveItem={fetchCart}
            />
        </header>
    );
}
