import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (username && password) {
      alert("เข้าสู่ระบบ TERM SEN สำเร็จ");
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  return (
    <div className="app">
      <h1>🔐 TERM SEN</h1>
      <p>เข้าสู่ระบบ</p>

      <input
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        เข้าสู่ระบบ
      </button>
    </div>
  );
}

export default Login;
