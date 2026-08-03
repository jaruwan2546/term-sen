import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";

function StockIn() {

  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("");
  const [qty, setQty] = useState("");
  const [cost, setCost] = useState("");
  const product = products.find(
  (item) => item.id === selected
);

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

  const saveStockIn = async () => {

  if (!product) {
    alert("กรุณาเลือกสินค้า");
    return;
  }

  if (!qty || Number(qty) <= 0) {
    alert("กรุณาระบุจำนวน");
    return;
  }

  if (!cost || Number(cost) <= 0) {
    alert("กรุณาระบุต้นทุน");
    return;
  }

  // บันทึกประวัติรับสินค้า
  await addDoc(collection(db, "stock_in"), {
    productId: product.id,
    name: product.name,
    qty: Number(qty),
    cost: Number(cost),
    date: new Date()
  });

  // เพิ่มสต๊อก
  await updateDoc(
    doc(db, "products", product.id),
    {
      stock: (product.stock || 0) + Number(qty)
    }
  );

  alert("รับสินค้าเข้าสำเร็จ");

  setSelected("");
  setQty("");
  setCost("");

  loadProducts();
};
  
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

<button onClick={saveStockIn}>
  💾 บันทึกรับสินค้า
</button>

    </div>
  );
}

export default StockIn;
