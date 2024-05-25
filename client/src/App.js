import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./component/routes/Private";
import ForgotPass from "./pages/Auth/ForgotPass";
import AdminDash from "./pages/admin/AdminDash";
import AdminPrivate from "./component/routes/AdminRoutes";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import AllUsers from "./pages/admin/AllUsers";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";


function App() {
  return (
    <Routes>

      {/* Normal user routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminDash />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/*" element={< PageNotFound />} />

      {/* users routes private */}
      <Route path="/dashboard" element={<Private />}>
        <Route path="/dashboard/user" element={<Dashboard />} />
        <Route path="/dashboard/user/profile" element={<Profile />} />
        <Route path="/dashboard/user/orders" element={<Orders />} />
      </Route>

      {/* admin private routes */}
      <Route path="/dashboard" element={<AdminPrivate />}>
        <Route path="/dashboard/admin" element={<AdminDash />} />
        <Route path="/dashboard/admin/create-category" element={<CreateCategory />} />
        <Route path="/dashboard/admin/create-product" element={<CreateProduct />} />
        <Route path="/dashboard/admin/users" element={<AllUsers />} />
      </Route>
    </Routes>
  );
}

export default App;
