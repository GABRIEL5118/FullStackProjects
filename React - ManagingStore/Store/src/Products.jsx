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
} from "firebase/firestore";
import { Link } from "react-router-dom";

const ProductsApp = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    id: "",
  });
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsub();
  }, []);

  const addProduct = async () => {
    if (!product.name || !product.price || !product.quantity) {
      alert("Please fill out all fields before adding a product.");
      return;
    }

    const newProduct = {
      name: product.name,
      price: Number(product.price),
      quantity: Number(product.quantity),
    };

    const data = await addDoc(collection(db, "products"), newProduct);
    console.log(`The ID of ${newProduct.name} is ${data.id}`);

    setProduct({ name: "", price: "", quantity: "", id: "" });
  };

  const handleProductClick = (selectedProduct) => {
    setProduct(selectedProduct);
    setSelectedProductId(selectedProduct.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const updateProduct = async () => {
    if (!product.id) return;
    const productRef = doc(db, "products", product.id);
    await updateDoc(productRef, {
      name: product.name,
      price: Number(product.price),
      quantity: Number(product.quantity),
    });
  };

  const deleteProduct = async () => {
    if (!product.id) return;
    await deleteDoc(doc(db, "products", product.id));
    setProduct({ name: "", price: "", quantity: "", id: "" });
    setSelectedProductId(null);
    alert("Product Deleted");
  };

  const getTotalProductsQuantity = () => {
    return products.reduce((sum, product) => sum + Number(product.quantity), 0);
  };

  const getTotalProductsValue = () => {
    return products.reduce(
      (sum, product) => sum + Number(product.price) * Number(product.quantity),
      0
    );
  };

  return (
    <>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
      <h2>Products</h2>
      <ul>
        {products.map((prod) => (
          <li
            key={prod.id}
            onClick={() => handleProductClick(prod)}
            style={{
              border: prod.id === selectedProductId ? "2px solid red" : "none",
              padding: "5px",
              width: "200px",
            }}
          >
            {prod.name} - ${prod.price} ({prod.quantity} pcs)
          </li>
        ))}
      </ul>
      <div
        style={{
          border: "2px solid blue",
          width: "250px",
          textAlign: "center",
        }}
      >
        <h5>Total Products Quantity: {getTotalProductsQuantity()}</h5>
        <h5>Total Products Value: ${getTotalProductsValue()}</h5>
        <h5>Total Number of Products: {products.length}</h5>
      </div>

      <h2>Add / Edit(click Product) Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={addProduct}>Add a Product</button>
      <button onClick={updateProduct}>Update</button>
      <button onClick={deleteProduct}>Delete</button>
    </>
  );
};

export default ProductsApp;
