import React, { useEffect, useState } from "react";
import { api } from "../../api";
import toast from "react-hot-toast";

const Categories = () => {
   const [categories, setCategories] = useState(null);

   useEffect(() => {
      api.get("/categories")
         .then((res) => {
            setCategories(res.data);
         })
         .catch()
         .finally();
   }, []);

   return (
      <ul className="flex gap-1 overflow-auto px-2.5 py-2">
         {categories?.data?.map((cat) => (
            <li key={cat.id} className="text-nowrap border px-1.5 py-1 bg-gray-500 text-amber-50 rounded-2xl cursor-pointer">
               {cat.name}
            </li>
         ))}
      </ul>
   );
};

const Home = () => {
   const [products, setProducts] = useState(null);
   const [reload, setReload] = useState(false);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      api.get("/products")
         .then((res) => {
            setProducts(res.data);
         })
         .catch((err) => console.log(err))
         .finally();
   }, [reload]);

   const handleDelete = (id) => {
      setLoading(true);
      api.delete(`/products/${id}`)
         .then((res) => {
            toast.success("Product is deleted");
            setReload((p) => !p);
         })
         .catch((err) => {
            toast.error(err.response.data.message);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   return (
      <div>
         <div className="container">
            <h2 className="text-3xl text-center">All products</h2>

            <Categories />

            <div className="grid gap-[20px] grid-cols-3 px-2.5 pt-5">
               {products?.data?.map((prd) => (
                  <div key={prd.id} className="flex flex-col gap-2.5 rounded-2xl overflow-hidden text-center shadow-[0px_0px_20px_10px_rgba(0,_0,_0,_0.2)]">
                     <img src={prd.img} alt="" className="flex-1 object-cover" />
                     <p className="text-2xl">{prd.name}</p>
                     <p className="text-[20px]">${prd.price} USD</p>
                     <p>{prd.description}</p>
                     <div className="flex justify-center gap-10 mb-2.5">
                        <button onClick={() => handleUpdate(cat)} className={`bg-yellow-500 rounded-[4px] px-5 py-1.5 cursor-pointer ${loading ? "opacity-50" : ""}`}>
                           Edit
                        </button>
                        <button onClick={() => handleDelete(prd.id)} className={`bg-red-500 rounded-[4px] px-5 py-1.5 cursor-pointer ${loading ? "opacity-50" : ""}`}>
                           Delete
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Home;
