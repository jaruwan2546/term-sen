import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function History() {

  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");

  const loadSales = async () => {

    const data = await getDocs(
      collection(db, "sales")
    );

    setSales(
      data.docs.map((item) => ({
        ...item.data(),
        id: item.id
      }))
    );

  };


  useEffect(() => {
    loadSales();
  }, []);

const filteredSales = sales.filter((item) =>
  item.name
    .toLowerCase()
    .includes(search.toLowerCase())
);
  
  return (
    <div className="app">

      <h1>🧾 ประวัติการขาย</h1>
      <input
  placeholder="🔍 ค้นหาสินค้าที่ขาย"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      {filteredSales.map((item) => (

        <div key={item.id}>

          <h3>
            🛒 {item.name}
          </h3>

          <p>
            📦 จำนวน: {item.qty} ชิ้น
          </p>

          <p>
            💰 ยอดขาย: {item.total} บาท
          </p>

          <p>
            📈 กำไร: {item.profit || 0} บาท
          </p>

          <p>
            🕒 {item.date?.toDate
              ? item.date.toDate().toLocaleString()
              : ""
            }
          </p>

          <hr />

        </div>

      ))}


    </div>
  );
}

export default History;
