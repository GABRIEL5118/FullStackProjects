import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";

const BuyNow = () => {
  const location = useLocation();
  const { customerId, customerName } = location.state || {};
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCustomerSelected, setIsCustomerSelected] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const productSnapshot = await getDocs(collection(db, "products"));
      setProducts(
        productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const selected = products.find((p) => p.name === e.target.value);
    setSelectedProduct(selected.name);
    setPrice(selected.price);
  };

  const handleQuantityChange = (e) => {
    const quantityValue = e.target.value;
    setQuantity(quantityValue);
    setTotalPrice(quantityValue * price);
  };

  const addPurchase = async () => {
    if (!selectedProduct || !quantity || !price || !customerId) return;

    const selectedProductData = products.find(
      (product) => product.name === selectedProduct
    );
    const availableQuantity = selectedProductData?.quantity || 0;

    if (parseInt(quantity) > availableQuantity) {
      setErrorMessage(
        `Not enough stock available. Max quantity: ${availableQuantity}`
      );
      return;
    }

    await addDoc(collection(db, "purchases"), {
      product: selectedProduct,
      customerId: customerId,
      customerName: customerName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      totalPrice: totalPrice,
      date: new Date(),
    });

    const productRef = doc(db, "products", selectedProductData.id);
    await updateDoc(productRef, {
      quantity: availableQuantity - parseInt(quantity),
    });

    alert("Purchase completed successfully!");
  };

  return (
    <div>
      <h2>Purchase for: {customerName}</h2>

      {isCustomerSelected && (
        <>
          <select value={selectedProduct} onChange={handleProductChange}>
            <option>Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <input type="number" placeholder="Price" value={price} readOnly />

          <div>Total Price: {totalPrice}</div>

          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

          <button onClick={addPurchase}>Buy Now</button>
        </>
      )}
    </div>
  );
};

export default BuyNow;
