import React, { useEffect, useState } from "react";
import { api } from "../../api";
import toast from "react-hot-toast";

const Products = () => {
   const [categories, setCategories] = useState("");
   const [loading, setLoading] = useState(false);
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [desc, setDesc] = useState("");
   const [cat, setCat] = useState("");
   const [url, setUrl] = useState("");

   useEffect(() => {
      api.get("/categories")
         .then((res) => {
            setCategories(res.data);
         })
         .catch()
         .finally();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);

      let newPrd = {
         name,
         price: Number(price),
         categoryId: +cat,
         description: desc || "",
         img: url || "",
      };

      api.post("/products", newPrd)
         .then((res) => {
            toast.success("Product is created");
            setName("");
            setPrice("");
            setUrl("");
            setDesc("");
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
         <h3 className="text-center text-2xl">Products crud</h3>
         <form className="w-[800px] mx-auto px-[200px]" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-[20px] py-2.5">
               <div className="flex flex-col">
                  <label htmlFor="name">Name</label>
                  <input required value={name} onChange={(e) => setName(e.target.value)} className="border rounded-[4px] indent-1" placeholder="Product name" type="text" id="name" />
               </div>

               <div className="flex flex-col">
                  <label htmlFor="price">Price</label>
                  <input required value={price} onChange={(e) => setPrice(e.target.value)} className="border rounded-[4px] indent-1" placeholder="Product price" type="number" id="price" />
               </div>

               <div className="flex flex-col">
                  <label htmlFor="url">Url for image</label>
                  <input value={url} onChange={(e) => setUrl(e.target.value)} className="border rounded-[4px] indent-1" placeholder="Product url" type="text" id="url" />
               </div>

               <select required value={cat} onChange={(e) => setCat(e.target.value)} className="border outline-none rounded-[4px]">
                  <option value="" hidden>
                     Categery
                  </option>
                  {categories?.data?.map((cat) => (
                     <option key={cat.id} value={cat.id}>
                        {cat.name}
                     </option>
                  ))}
               </select>

               <div className="flex flex-col">
                  <label htmlFor="desc">Description</label>
                  <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="border rounded-[4px] indent-1" placeholder="Product description" type="text" id="desc" />
               </div>
            </div>

            <div className="flex justify-between items-center">
               <button type="reset" className="cursor-pointer border px-3 py-1.5 bg-blue-950 text-amber-50 rounded-[8px]">
                  Reset
               </button>
               <button disabled={loading} className={`${loading ? "opacity-50" : ""} cursor-pointer border px-3 py-1.5 bg-green-700 text-amber-50 rounded-[8px]`}>
                  Create
               </button>
            </div>
         </form>
      </div>
   );
};

export default React.memo(Products);
