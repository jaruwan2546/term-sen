import React, { useState } from "react";

function Products() {
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);

  const addProduct = () => {
    if (product) {
      setProducts([...products, product]);
      setProduct("");
    }
  };

  return (
    <div className="app">
      <h1>📦 สินค้า</h1>

      <input
        placeholder="ชื่อสินค้า"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <button onClick={addProduct}>
        เพิ่มสินค้า
      </button>

      <h2>รายการสินค้า</h2>

      {products.length === 0 ? (
        <p>ยังไม่มีสินค้า</p>
      ) : (
        products.map((item, index) => (
          <p key={index}>
            {index + 1}. {item}
          </p>
        ))
      )}
    </div>
  );
}

export default Products;
