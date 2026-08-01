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
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
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
    try {
      await addDoc(productsRef, {
        name: name,
        price: Number(price),
        stock: Number(stock)
      });

      setName("");
      setPrice("");
      setStock("");

      loadProducts();

    } catch (error) {
      alert(error.message);
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="ราคา"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="จำนวนสต๊อก"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button onClick={addProduct}>
        ➕ เพิ่มสินค้า
      </button>


      <h2>รายการสินค้า</h2>

      {products.map((item) => (
        <div key={item.id}>

          <p>
            📦 {item.name}
          </p>

          <p>
            💰 ราคา {item.price} บาท
          </p>

          <p>
            📊 เหลือ {item.stock} ชิ้น
          </p>

          <button onClick={() => deleteProduct(item.id)}>
            🗑 ลบ
          </button>

          <hr />

        </div>
      ))}

    </div>
  );
}

export default Products;
