import React from "react";

function Dashboard() {
  return (
    <div className="app">
      <h1>🏠 Dashboard</h1>

      <p>ยินดีต้อนรับสู่ระบบ TERM SEN</p>

      <div>
        <h2>📦 สินค้า</h2>
        <p>จำนวนสินค้า: 0 รายการ</p>
      </div>

      <div>
        <h2>💰 ยอดขาย</h2>
        <p>ยอดขายวันนี้: 0 บาท</p>
      </div>

      <div>
        <h2>📊 สรุป</h2>
        <p>ระบบพร้อมใช้งาน</p>
      </div>
    </div>
  );
}

export default Dashboard;
