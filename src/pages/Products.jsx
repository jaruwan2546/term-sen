import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";

function Products() {
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);

  const productsRef = collection(db, "products");

  const loadProducts = async () => {
    const data = await getDocs(productsRef);

    setProducts(
      data.docs.map((item) => ({
        ...item.data(),
        id: item.id
      }))
    );
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {
    if (product) {
      await addDoc(productsRef, {
        name: product
      });

      setProduct("");
      loadProducts();
    }
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    loadProducts();
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

      {products.map((item) => (
        <div key={item.id}>
          <p>
            {item.name}
          </p>

          <button onClick={() => deleteProduct(item.id)}>
            🗑 ลบ
          </button>
        </div>
      ))}

    </div>
  );
}

export default Products;
