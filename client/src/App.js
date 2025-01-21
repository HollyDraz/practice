import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // Fetch products on load
  useEffect(() => {
    axios.get('http://localhost:5020/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Add a new product
  const addProduct = () => {
    axios.post('http://localhost:5000/api/products', { name, price })
      .then(response => {
        setProducts([...products, response.data]);
        setName('');
        setPrice('');
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
