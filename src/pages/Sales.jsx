import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";

function Sales() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("");
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);

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

  const getProductLots = async (productId) => {

  const q = query(
    collection(db, "stock_in"),
    where("productId", "==", productId),
    orderBy("date")
  );

  const data = await getDocs(q);

  return data.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));

};

  const processFIFO = async (productId, sellQty) => {

const lots = await getProductLots(productId);
alert(JSON.stringify(lots));
console.log("LOTS:", lots);

  let remain = sellQty;
  let totalCost = 0;
  alert("ขาย " + sellQty + " ชิ้น");

  for (const lot of lots) {

    if (remain <= 0) break;

    if (Number(lot.remaining) <= 0) continue;

    const lotRemaining = Number(lot.remaining);
const lotCost = Number(lot.cost);

const useQty = Math.min(remain, lotRemaining);

totalCost += useQty * lotCost;

    await updateDoc(
      doc(db, "stock_in", lot.id),
      {
        remaining: Number(lot.remaining) - useQty
      }
    );

    remain -= useQty;
  }

  if (remain > 0) {
    throw new Error("สต๊อกในล็อตไม่เพียงพอ");
  }

  return totalCost;

};

  const total = product
    ? product.price * qty
    : 0;

  const addToCart = () => {

  if (!product) {
    alert("กรุณาเลือกสินค้า");
    return;
  }

  const item = {
    id: product.id,
    name: product.name,
    price: product.price,
    cost: product.cost || 0,
    qty: qty,
    stock: product.stock
  };

  setCart([
    ...cart,
    item
  ]);

  setQty(1);
  setSelected("");
};
  
  const sellProduct = async () => {
  try {

  if (cart.length === 0) {
    alert("ไม่มีสินค้าในตะกร้า");
    return;
  }

  const billNo = "B" + Date.now();

  // ตรวจสต๊อกก่อน
  for (const item of cart) {
    const product = products.find((p) => p.id === item.id);

    if (!product || item.qty > product.stock) {
      alert(`${item.name} สต๊อกไม่พอ`);
      return;
    }
  }

  // บันทึกการขายและตัดสต๊อก
  for (const item of cart) {
const totalCost = await processFIFO(item.id, item.qty);

const profit = (item.price * item.qty) - totalCost;
    await addDoc(collection(db, "sales"), {
      billNo,
      name: item.name,
      price: item.price,
      cost: totalCost,
      qty: item.qty,
      total: item.price * item.qty,
      profit: profit,
      date: new Date()
    });

    const product = products.find((p) => p.id === item.id);

    await updateDoc(
      doc(db, "products", item.id),
      {
        stock: product.stock - item.qty
      }
    );
  }

  alert(`ชำระเงินสำเร็จ\nเลขบิล: ${billNo}`);

  setCart([]);
  setQty(1);
  setSelected("");

  loadProducts();
  } catch (error) {
  console.error(error);

  alert(
    error.message
  );
}
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
  value={qty}
  onChange={(e) =>
    setQty(Number(e.target.value))
  }
/>

<button onClick={addToCart}>
  🛒 เพิ่มลงตะกร้า
</button>

      <h2>
       💰 ยอดขาย {total.toLocaleString()} บาท
      </h2>
<h2>🛒 ตะกร้า</h2>

{cart.map((item, index) => (

  <div key={index}>

    <p>
      {item.name}
    </p>

    <p>
      จำนวน {item.qty} ชิ้น
    </p>

    <p>
      ราคา {item.price * item.qty} บาท
    </p>

    <button
      onClick={() =>
        setCart(cart.filter((_, i) => i !== index))
      }
    >
      ❌ ลบ
    </button>

    <hr />

  </div>

))}


<h2>
  รวมทั้งหมด:
  {" "}
  {cart.reduce(
    (sum, item) =>
      sum + (item.price * item.qty),
    0
  ).toLocaleString()}
  บาท
</h2>

      <button onClick={sellProduct}>
        💳 ชำระเงิน
      </button>

    </div>
  );
}

export default Sales;
