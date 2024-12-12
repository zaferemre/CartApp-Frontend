"use client";
import React, { useState } from "react";
import Header from "./header";
import ItemsPage from "./items/page";

export default function App() {
    const [refreshCartTrigger, setRefreshCartTrigger] = useState(false);

    const refreshCart = () => {
        setRefreshCartTrigger((prev) => !prev);
    };

    return (
        <>
            <Header refreshCartTrigger={refreshCartTrigger} />
            <ItemsPage refreshCart={refreshCart} />
        </>
    );
}
