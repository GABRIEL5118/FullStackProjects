import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const CustomersApp = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    id: "",
  });
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [customerPurchases, setCustomerPurchases] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "customers"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setCustomers(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchTotalPurchases = async () => {
      if (!customer.id) return;

      const q = query(
        collection(db, "purchases"),
        where("customerId", "==", customer.id)
      );
      const querySnapshot = await getDocs(q);

      const total = querySnapshot.docs.reduce(
        (sum, doc) => sum + doc.data().totalPrice,
        0
      );
      setTotalPurchases(total);

      setCustomerPurchases(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    fetchTotalPurchases();
  }, [customer.id]);

  const addCustomer = async () => {
    if (!customer.name || !customer.email) {
      alert("Please enter both name and email.");
      return;
    }

    const newCustomer = {
      name: customer.name,
      email: customer.email,
    };

    const data = await addDoc(collection(db, "customers"), newCustomer);
    console.log(`The ID of ${newCustomer.name} is ${data.id}`);

    setCustomer({ name: "", email: "", id: "" });
  };

  const handleCustomerClick = (selectedCustomer) => {
    setCustomer(selectedCustomer);
    setTotalPurchases(0);
    setCustomerPurchases([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const updateCustomer = async () => {
    if (!customer.id) return;
    const customerRef = doc(db, "customers", customer.id);
    await updateDoc(customerRef, {
      name: customer.name,
      email: customer.email,
    });
    alert(`Customer Updated ID: ${customer.id}`);
  };

  const deleteCustomer = async () => {
    if (!customer.id) return;
    await deleteDoc(doc(db, "customers", customer.id));
    setCustomer({ name: "", email: "", id: "" });
    setTotalPurchases(0);
    setCustomerPurchases([]);
    alert("Customer Deleted");
  };

  return (
    <>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
      <h2>Customers</h2>
      <ul>
        {customers.map((cust) => (
          <li
            key={cust.id}
            onClick={() => handleCustomerClick(cust)}
            style={{
              border: cust.id === customer.id ? "2px solid red" : "none",
              padding: "5px",
              width: "250px",
            }}
          >
            {cust.name} - {cust.email}
            {customer.id === cust.id && (
              <Link
                to="/BuyNow"
                state={{ customerId: cust.id, customerName: cust.name }}
              >
                <br />
                &nbsp;&nbsp;Buy Now&nbsp;&nbsp;
              </Link>
            )}
          </li>
        ))}
      </ul>

      <h2>Edit Customer</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={customer.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={customer.email}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={addCustomer}>Add a Customer</button>
      <button onClick={updateCustomer}>Update</button>
      <button onClick={deleteCustomer}>Delete</button>

      {customer.id && (
        <div>
          <h3>Total Purchases: ${totalPurchases}</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {customerPurchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.product}</td>
                  <td>{purchase.quantity}</td>
                  <td>{purchase.price}</td>
                  <td>{purchase.totalPrice}</td>
                  <td>{purchase.date.toDate().toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CustomersApp;
