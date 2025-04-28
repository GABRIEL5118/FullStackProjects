import { useEffect, useState } from "react";
import { db } from "./firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Purchases = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productSnapshot = await getDocs(collection(db, "products"));
      const customerSnapshot = await getDocs(collection(db, "customers"));

      setProducts(
        productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setCustomers(
        customerSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );

      const purchaseSnapshot = await getDocs(collection(db, "purchases"));
      const fetchedPurchases = purchaseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(fetchedPurchases);
      setPurchases(fetchedPurchases);
      setLoading(false);
    };
    fetchData();
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
    if (!selectedProduct || !selectedCustomer || !quantity || !price) return;

    const selectedCustomerData = customers.find(
      (customer) => customer.name === selectedCustomer
    );

    await addDoc(collection(db, "purchases"), {
      product: selectedProduct,
      customerId: selectedCustomerData.id,
      customerName: selectedCustomerData.name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      totalPrice: totalPrice,
      date: new Date(),
    });

    setSelectedProduct("");
    setSelectedCustomer("");
    setQuantity("");
    setPrice("");
    setTotalPrice(0);

    const purchaseSnapshot = await getDocs(collection(db, "purchases"));
    const fetchedPurchases = purchaseSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPurchases(fetchedPurchases);
  };

  return (
    <div>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
      <h2>Add Purchase</h2>

      <select value={selectedProduct} onChange={handleProductChange}>
        <option>Select Product</option>
        {products.map((product) => (
          <option key={product.id} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>

      <select
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
      >
        <option>Select Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.name}>
            {customer.name}
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

      <button onClick={addPurchase}>Add Purchase</button>
      <h3>Purchases</h3>
      {loading ? (
        "LOADING..."
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.product}</td>
                <td>{purchase.customerName}</td>
                <td>{purchase.quantity}</td>
                <td>{purchase.price}</td>
                <td>{purchase.totalPrice}</td>
                <td>{purchase.date.toDate().toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Purchases;
