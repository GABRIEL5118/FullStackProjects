 React Store Management Project

This project is a simple React-based store management application that integrates with Firebase for real-time data management. The application allows users to manage and view products, customers, and purchases, and perform operations like adding, updating, and deleting records.

 Features

- Products Management: Allows users to view, add, update, and delete products.
- Customers Management: Allows users to view, add, update, and delete customer records.
- Purchases Management: Allows users to record purchases and view their details.
- Real-time Data Sync: Uses Firebase to sync data in real-time across all components.
- Dynamic Routing: Utilizes React Router to navigate between different pages, such as Products, Customers, and Purchases.

 Technologies Used

- React: Front-end library for building the user interface.
- React Router: For navigation between pages.
- Firebase: For real-time data storage and management.
- Firestore: A NoSQL cloud database to store data related to products, customers, and purchases.

 Project Structure

```
src/
│
├── components/
│   ├── App.js                   Main component that holds the routing and structure
│   ├── ProductsApp.js            Manages the products
│   ├── CustomersApp.js           Manages the customers
│   └── Purchases.js              Manages purchases
│
├── firebase.js                   Firebase configuration and initialization
│
└── main.js                      Entry point of the application
```

 Usage

 Pages:
- Home Page: Displays a welcome message and links to Products, Customers, and Purchases.
- Products: Allows the user to view, add, update, and delete products.
- Customers: Allows the user to view, add, update, and delete customers.
- Purchases: Allows the user to record a purchase by selecting a product, customer, and quantity.

 Firebase Operations:
- Add: Add new products, customers, or purchases to the Firestore database.
- Update: Modify existing product or customer details.
- Delete: Remove a product or customer from the Firestore database.

 Firebase Setup

1. Firebase Initialization: 
   In `firebase.js`, make sure to initialize Firebase with your configuration.

2. FireStore Rules:
   Ensure that your Firestore rules are set up to allow reading and writing to the appropriate collections. Example Firestore rules:

   ```json
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

 License

This project is open-source and available under the MIT License.

---