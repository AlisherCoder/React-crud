import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Header from "./components/header";
import { Toaster } from "react-hot-toast";
import Categories from "./pages/categories/categories";

function App() {
   return (
      <>
         <Header />
         <main>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/products" element={<Products />} />
               <Route path="/categories" element={<Categories />} />
            </Routes>
         </main>

         <Toaster position="top-center" reverseOrder={false} />
      </>
   );
}

export default App;
