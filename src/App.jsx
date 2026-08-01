import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Sales from "./pages/Sales";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      {page === "login" && (
        <Login setPage={setPage} />
      )}

      {page === "dashboard" && (
        <Dashboard />
      )}

      {page === "products" && (
        <Products />
      )}

      {page === "settings" && (
        <Settings />
      )}
      
      {page === "sales" && (
       <Sales />
      )}

      {page !== "login" && (
        <div className="menu">
          <button onClick={() => setPage("dashboard")}>
            🏠 Dashboard
          </button>

          <button onClick={() => setPage("products")}>
            📦 สินค้า
          </button>
         
          <button onClick={() => setPage("sales")}>
            🛒 ขายสินค้า
          </button>

          <button onClick={() => setPage("settings")}>
            ⚙️ ตั้งค่า
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
