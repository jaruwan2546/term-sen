import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Dashboard() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const data = await getDocs(collection(db, "products"));

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

  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum, item) => sum + (item.price * item.stock),
    0
  );

  const lowStock = products.filter(
    (item) => item.stock < 10
  );

  return (
    <div className="app">

      <h1>🏠 Dashboard</h1>

      <div>
        📦 จำนวนสินค้า:
        <h2>{totalProducts} รายการ</h2>
      </div>

      <div>
        💰 มูลค่าสต๊อก:
        <h2>{totalValue.toLocaleString()} บาท</h2>
      </div>

      <div>
        ⚠️ สินค้าใกล้หมด:
        <h2>{lowStock.length} รายการ</h2>

        {lowStock.map((item) => (
          <p key={item.id}>
            {item.name} เหลือ {item.stock} ชิ้น
          </p>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;
