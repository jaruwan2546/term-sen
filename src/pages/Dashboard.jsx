import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const loadData = async () => {
    const productData = await getDocs(
      collection(db, "products")
    );

    setProducts(
      productData.docs.map((item) => ({
        ...item.data(),
        id: item.id
      }))
    );


    const salesData = await getDocs(
      collection(db, "sales")
    );

    setSales(
      salesData.docs.map((item) => ({
        ...item.data(),
        id: item.id
      }))
    );
  };


  useEffect(() => {
    loadData();
  }, []);


  const totalProducts = products.length;


  const totalSales = sales.reduce(
    (sum, item) => sum + item.total,
    0
  );


  const totalProfit = sales.reduce(
    (sum, item) => sum + (item.profit || 0),
    0
  );


  const lowStock = products.filter(
    (item) => item.stock < 10
  );


  return (
    <div className="app">

      <h1>🏠 Dashboard TERM SEN</h1>


      <h2>
        📦 สินค้าทั้งหมด
      </h2>
      <p>
        {totalProducts} รายการ
      </p>


      <h2>
        💰 ยอดขายรวม
      </h2>
      <p>
        {totalSales.toLocaleString()} บาท
      </p>


      <h2>
        📈 กำไรรวม
      </h2>
      <p>
        {totalProfit.toLocaleString()} บาท
      </p>


      <h2>
        ⚠️ สินค้าใกล้หมด
      </h2>

      {lowStock.map((item) => (
        <p key={item.id}>
          {item.name} เหลือ {item.stock} ชิ้น
        </p>
      ))}


    </div>
  );
}

export default Dashboard;
