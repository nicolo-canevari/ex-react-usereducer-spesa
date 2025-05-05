// Importa React e useState per gestire lo stato
// import React, { useState } from 'react';

// useReducer viene usato al posto di useState quando la logica di aggiornamento dello stato è più articolata
import React, { useReducer } from 'react';

// Css
import '../src/index.css';

// Array di prodotti, ognuno con nome e prezzo
const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
];

// MILESTONE 1

// // Componente che mostra la lista dei prodotti
// function ProductList() {
//     return (

//         <div>

//             <h1>Lista dei Prodotti</h1>

//             <ul>
//                 {/* Itera sull'array dei prodotti e crea un elemento <li> per ciascuno */}
//                 {products.map((product, index) => (
//                     <li key={index}>
//                         <strong>{product.name}</strong>: €{product.price.toFixed(2)}
//                     </li>
//                 ))}
//             </ul>

//         </div>

//     );
// }

// export default ProductList;


// MILESTONE 2

// function App() {

//     // Stato che tiene traccia dei prodotti aggiunti al carrello
//     const [addedProducts, setAddedProducts] = useState([]);

//     // Funzione chiamata quando si clicca su "Aggiungi al carrello"
//     const addToCart = (product) => {

//         // Verifica se il prodotto è già nel carrello
//         const alreadyInCart = addedProducts.find((p) => p.name === product.name);

//         // Se non è già presente, lo aggiunge con quantità = 1
//         if (!alreadyInCart) {
//             setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
//         }
//     };

//     return (
//         <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
//             <h1>Lista dei Prodotti</h1>
//             <ul>
//                 {products.map((product, index) => (
//                     <li key={index} style={{ marginBottom: '1rem' }}>
//                         <strong>{product.name}</strong>: €{product.price.toFixed(2)}
//                         <button
//                             onClick={() => addToCart(product)}
//                             style={{ marginLeft: '1rem' }}
//                         >
//                             Aggiungi al carrello
//                         </button>
//                     </li>
//                 ))}
//             </ul>

//             {addedProducts.length > 0 && (
//                 <>
//                     <h2>Carrello</h2>
//                     <ul>
//                         {addedProducts.map((product, index) => (
//                             <li key={index}>
//                                 {product.name} - €{product.price.toFixed(2)} x {product.quantity}
//                             </li>
//                         ))}
//                     </ul>
//                 </>
//             )}
//         </div>
//     );
// }

// export default App;


// MILESTONE 3

// function App() {
//     // Stato che contiene i prodotti aggiunti al carrello
//     const [addedProducts, setAddedProducts] = useState([]);

//     // Funzione per aggiungere un prodotto al carrello
//     const addToCart = (product) => {
//         const existingProduct = addedProducts.find(p => p.name === product.name);

//         if (existingProduct) {
//             // Se già presente, aggiorna la quantità
//             updateProductQuantity(product.name);
//         } else {
//             // Altrimenti, lo aggiunge con quantità 1
//             setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
//         }
//     };

//     // Funzione per aumentare la quantità di un prodotto nel carrello
//     const updateProductQuantity = (productName) => {
//         const updated = addedProducts.map(product =>
//             product.name === productName
//                 ? { ...product, quantity: product.quantity + 1 }
//                 : product
//         );
//         setAddedProducts(updated);
//     };

//     // Funzione per rimuovere un prodotto dal carrello
//     const removeFromCart = (productName) => {
//         const filtered = addedProducts.filter(product => product.name !== productName);
//         setAddedProducts(filtered);
//     };

//     // Calcolo del totale da pagare
//     const total = addedProducts.reduce((sum, product) => {
//         return sum + product.price * product.quantity;
//     }, 0);

//     return (
//         <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
//             <h1>Lista dei Prodotti</h1>
//             <ul>
//                 {products.map((product, index) => (
//                     <li key={index} style={{ marginBottom: '1rem' }}>
//                         <strong>{product.name}</strong>: €{product.price.toFixed(2)}
//                         <button
//                             onClick={() => addToCart(product)}
//                             style={{ marginLeft: '1rem' }}
//                         >
//                             Aggiungi al carrello
//                         </button>
//                     </li>
//                 ))}
//             </ul>

//             {/* Carrello */}
//             {addedProducts.length > 0 && (
//                 <>
//                     <h2>Carrello</h2>
//                     <ul>
//                         {addedProducts.map((product, index) => (
//                             <li key={index}>
//                                 {product.name} - €{product.price.toFixed(2)} x {product.quantity}
//                                 <button
//                                     onClick={() => removeFromCart(product.name)}
//                                     style={{ marginLeft: '1rem', color: 'red' }}
//                                 >
//                                     Rimuovi dal carrello
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>

//                     {/* Totale finale */}
//                     <h3>Totale da pagare: €{total.toFixed(2)}</h3>
//                 </>
//             )}
//         </div>
//     );
// }

// export default App;


// MILESTONE 3 BONUS

// Funzione reducer che gestisce le azioni sul carrello
function cartReducer(state, action) {

    switch (action.type) {

        case 'ADD_ITEM':
            // Verifica se il prodotto è già nel carrello
            const existing = state.find(p => p.name === action.payload.name);
            if (existing) {

                // Se esiste, incrementa la quantità
                return state.map(p =>
                    p.name === action.payload.name
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }
            // Altrimenti, aggiungi il nuovo prodotto con quantità 1
            return [...state, { ...action.payload, quantity: 1 }];

        case 'REMOVE_ITEM':
            // Rimuove il prodotto specificato dal carrello
            return state.filter(p => p.name !== action.payload.name);

        case 'UPDATE_QUANTITY':
            // Aggiorna la quantità del prodotto, gestendo solo interi >= 1
            return state.map(p => {
                if (p.name === action.payload.name) {
                    const newQty = Math.max(1, Math.floor(action.payload.quantity));
                    return { ...p, quantity: newQty };
                }
                return p;
            });
        default:
            // Ritorna lo stato attuale se l'azione non è riconosciuta
            return state;
    }
}

function App() {
    // Inizializza lo stato del carrello con useReducer
    const [cart, dispatch] = useReducer(cartReducer, []);

    // Aggiunge un prodotto al carrello
    const addToCart = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    // Rimuove un prodotto dal carrello
    const removeFromCart = (product) => {
        dispatch({ type: 'REMOVE_ITEM', payload: product });
    };


    // Modifica la quantità di un prodotto nel carrello
    const updateQuantity = (product, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { name: product.name, quantity } });
    };

    // Calcola il totale da pagare
    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

    return (
        <div className="container">
            <h1 className="heading">🛒 Lista dei Prodotti</h1>

            {/* Lista dei prodotti da acquistare */}
            <ul className="product-list">
                {products.map((product, index) => (
                    <li key={index} className="product-item">
                        <span>{product.name} - €{product.price.toFixed(2)}</span>
                        <button onClick={() => addToCart(product)} className="add-button">Aggiungi</button>
                    </li>
                ))}
            </ul>


            {/* Se il carrello ha almeno un prodotto, mostra la lista */}
            {cart.length > 0 && (
                <>
                    <h2 className="heading">Carrello</h2>
                    <ul className="cart-list">
                        {cart.map((product, index) => (
                            <li key={index} className="cart-item">
                                <span>{product.name} - €{product.price.toFixed(2)}</span>


                                {/* Input per modificare dinamicamente la quantità */}
                                <input
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    onChange={(e) => updateQuantity(product, e.target.value)}
                                    className="input"
                                />

                                {/* Pulsante per rimuovere il prodotto dal carrello */}
                                <button onClick={() => removeFromCart(product)} className="remove-button">
                                    Rimuovi
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Mostra il totale finale */}
                    <p className="total">Totale: €{total.toFixed(2)}</p>
                </>
            )}
        </div>
    );
}

export default App;