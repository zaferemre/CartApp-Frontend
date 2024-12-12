"use client";

import React from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CartItem from "./CartItem";

export default function CartSidebar({ cartOpen, setCartOpen, cartItems, subtotal, onRemoveItem }) {
    return (
        <Dialog open={cartOpen} onClose={() => setCartOpen(false)} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition-all bg-white shadow-xl">
                            <div className="flex h-full flex-col overflow-y-scroll">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-lg font-medium text-gray-900">
                                            Shopping cart
                                        </DialogTitle>
                                        <button
                                            onClick={() => setCartOpen(false)}
                                            className="ml-3 flex h-7 items-center text-gray-400 hover:text-gray-500"
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                            <span className="sr-only">Close panel</span>
                                        </button>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((item) => (
                                                    <CartItem
                                                        key={item.itemId}
                                                        item={item}
                                                        onRemoveItem={onRemoveItem}
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${subtotal.toFixed(2)}</p>
                                    </div>
                                    <div className="mt-6">
                                        <a
                                            href="#"
                                            className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
