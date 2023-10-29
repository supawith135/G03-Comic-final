import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Createreview from "./pages/review/create/Createreview";
import Myreveiw from "./pages/myreview/myreview";
import Orders from "./pages/review/Orders";
import EditReview from "./pages/myreview/EditReview";
import "./App.css";

import {
  About,
  Home,
  Cart,
  Error,
  Landing,
  Login,
  Register,
  Products,
  Payment,
  SingleProduct,
  Payment_Show,
  Payment_UD,
  AddProduct,
  Member,
  DataComic,
  Admin,
  EditProduct,
  ProfileComic,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:id" element={<SingleProduct />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Cart/Payment" element={<Payment />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Payment/Status" element={<Payment_Show />} />
        <Route path="/About" element={<About />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Approve" element={<Payment_UD />} />
        {/* Admin */}
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Member" element={<Member />} />
        <Route path="/DataComic" element={<DataComic />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/EditProduct/:id" element={<EditProduct />} />
        <Route path="/ProfileComic/:id" element={<ProfileComic />} />
        {/* Review */}
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Createreview/:id" element={<Createreview />} />
        <Route path="/Myreview/" element={<Myreveiw />} />
        <Route path="/EditReview/:id" element={<EditReview />} />
      </Routes>
    </Router>
  );
};
export default App;
