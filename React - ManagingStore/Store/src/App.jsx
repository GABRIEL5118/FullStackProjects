import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./Products";
import Customers from "./Customers";
import Purchases from "./Purchases";
import BuyNow from "./BuyNow";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>React – Project</h1>
        <p>
          store manages data (with firebase) about customers, products and
          purchases.
        </p>
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/purchases">Purchases</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<h2>Welcome to the home page!</h2>} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/BuyNow" element={<BuyNow />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
