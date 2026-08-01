import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";

function Sales() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("");
  const [qty, setQty] = useState(1);

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

  const product = products.find(
    (item) => item.id === selected
  );

  const total = product
    ? product.price * qty
    : 0;

  const sellProduct = async () => {
    if (!product) {
      alert("กรุณาเลือกสินค้า");
      return;
    }

    if (qty > product.stock) {
      alert("สต๊อกไม่พอ");
      return;
    }

    // บันทึกการขาย
    await addDoc(collection(db, "sales"), {
      name: product.name,
      price: product.price,
      qty: qty,
      total: total,
      date: new Date()
    });

    // ตัดสต๊อก
    await updateDoc(
      doc(db, "products", product.id),
      {
        stock: product.stock - qty
      }
    );

    alert("ขายสำเร็จ");

    setQty(1);
    setSelected("");

    loadProducts();
  };

  return (
    <div className="app">

      <h1>🛒 ขายสินค้า</h1>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">
          เลือกสินค้า
        </option>

        {products.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} (เหลือ {item.stock})
          </option>
        ))}

      </select>


      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) =>
          setQty(Number(e.target.value))
        }
      />


      <h2>
        💰 ยอดขาย {total.toLocaleString()} บาท
      </h2>


      <button onClick={sellProduct}>
        ✅ ขายสินค้า
      </button>

    </div>
  );
}

export default Sales;
