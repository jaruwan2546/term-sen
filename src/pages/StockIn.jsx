import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function StockIn() {

  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("");
  const [qty, setQty] = useState("");
  const [cost, setCost] = useState("");

  const loadProducts = async () => {

    const data = await getDocs(
      collection(db, "products")
    );

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

  return (
    <div className="app">

      <h1>📥 รับสินค้าเข้า</h1>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >

        <option value="">
          เลือกสินค้า
        </option>

        {products.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        ))}

      </select>
      
      <input
  type="number"
  placeholder="จำนวนรับเข้า"
  value={qty}
  onChange={(e) => setQty(e.target.value)}
/>

<input
  type="number"
  placeholder="ต้นทุนต่อหน่วย"
  value={cost}
  onChange={(e) => setCost(e.target.value)}
/>

<button>
  💾 บันทึกรับสินค้า
</button>

    </div>
  );
}

export default StockIn;
