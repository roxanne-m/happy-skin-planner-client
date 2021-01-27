import React from 'react';

// defaults is nothing is passed in value
const ApiContext = React.createContext({
    products: [],
    handleDeleteProduct: () => {},
    addProduct: () => {},
})

export default ApiContext;