import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./pages/Main";
import Product from "./pages/Product";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:productType" element={<Product />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout/:productType/:color" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
