import React, { useState } from "react";

function Settings() {
  const [shopName, setShopName] = useState("TERM SEN");

  return (
    <div className="app">
      <h1>⚙️ ตั้งค่า</h1>

      <p>ชื่อร้าน</p>

      <input
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />

      <h2>{shopName}</h2>

      <p>
        ระบบจัดการร้านค้า TERM SEN เวอร์ชัน 0.1
      </p>
    </div>
  );
}

export default Settings;
