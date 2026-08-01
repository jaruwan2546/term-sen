import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Sales() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getDocs(collection(db, "products"));

    setProducts(
      data.docs.map((item) => ({
        ...item.data(),
        id: item.id
      }))
    );
  };

  const product = products.find(
    (item) => item.id === selected
  );

  const total = product
    ? product.price * qty
    : 0;

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
            {item.name}
          </option>
        ))}

      </select>


      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />


      <h2>
        💰 ยอดขาย {total.toLocaleString()} บาท
      </h2>


    </div>
  );
}

export default Sales;
