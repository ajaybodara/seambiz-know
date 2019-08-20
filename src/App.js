import React from "react";
import "./App.css";
import CustomerTable from "./components/CustomerTable"
import ContactTable from "./components/ContactTable"

function App() {
  
  return (
    <div className="App">
      <CustomerTable />
      <ContactTable />
    </div>
  );
}

export default App;
