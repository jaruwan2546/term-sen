import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function History() {

  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("all");

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

const filteredSales = sales.filter((item) => {

  const matchName = (item.name || "")
  .toLowerCase()
  .includes(search.toLowerCase());

  if (filterDate === "all") {
    return matchName;
  }

  const saleDate = item.date?.toDate
    ? item.date.toDate()
    : new Date(item.date);

  const now = new Date();


  if (filterDate === "today") {
    return (
      matchName &&
      saleDate.toDateString() === now.toDateString()
    );
  }


  if (filterDate === "month") {
    return (
      matchName &&
      saleDate.getMonth() === now.getMonth() &&
      saleDate.getFullYear() === now.getFullYear()
    );
  }


  return matchName;

});
  
  return (
    <div className="app">

      <h1>🧾 ประวัติการขาย</h1>
      <input
  placeholder="🔍 ค้นหาสินค้าที่ขาย"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<select
  value={filterDate}
  onChange={(e) => setFilterDate(e.target.value)}
>

  <option value="all">
    📅 ทั้งหมด
  </option>

  <option value="today">
    วันนี้
  </option>

  <option value="month">
    เดือนนี้
  </option>

</select>

      <h2>
  🧾 จำนวนบิล: {filteredSales.length}
</h2>

<h2>
  💰 ยอดขาย:
  {" "}
  {filteredSales
    .reduce((sum,item)=>sum+item.total,0)
    .toLocaleString()
  } บาท
</h2>

<h2>
  📈 กำไร:
  {" "}
  {filteredSales
    .reduce((sum,item)=>sum+(item.profit || 0),0)
    .toLocaleString()
  } บาท
</h2>

  
      {filteredSales.map((item) => (

        <div key={item.id}>

          <h3>
            🛒 {item.name}
          </h3>

          <p>
  🧾 เลขบิล: {item.billNo}
</p>

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
