import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Reports() {
  const [sales, setSales] = useState([]);

  const loadSales = async () => {
    const data = await getDocs(collection(db, "sales"));

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

  const totalSales = sales.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return (
    <div className="app">

      <h1>📊 รายงาน</h1>

      <h2>
        💰 ยอดขายรวม:
        {" "}
        {totalSales.toLocaleString()}
        {" "}บาท
      </h2>

      <h2>
        🧾 จำนวนการขาย:
        {" "}
        {sales.length}
        {" "}ครั้ง
      </h2>


      <h2>รายการขาย</h2>

      {sales.map((item) => (
        <div key={item.id}>

          <p>
            🛒 {item.name}
          </p>

          <p>
            จำนวน {item.qty} ชิ้น
          </p>

          <p>
            ยอด {item.total} บาท
          </p>

          <hr />

        </div>
      ))}

    </div>
  );
}

export default Reports;
