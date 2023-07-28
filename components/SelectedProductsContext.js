'use client'

// SelectedProductsContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const SelectedProductsContext = createContext();

export function useSelectedProductsContext() {
    return useContext(SelectedProductsContext);
}

export function SelectedProductsProvider({ children }) {
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Load data from local storage on initial render
    useEffect(() => {
        const storedData = localStorage.getItem('selectedProducts');
        if (storedData) {
            setSelectedProducts(JSON.parse(storedData));
        }
    }, []);

    // Update local storage when selectedProducts changes
    useEffect(() => {
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    }, [selectedProducts]);

    return (
        <SelectedProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
            {children}
        </SelectedProductsContext.Provider>
    );
}
