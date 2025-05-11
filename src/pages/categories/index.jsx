import React, { useEffect, useState } from "react";
import { api } from "../../api";
import toast from "react-hot-toast";

const Categories = () => {
   const [categories, setCategories] = useState(null);
   const [catValue, setCatValue] = useState("");
   const [loading, setLoading] = useState(false);
   const [reload, setReload] = useState(false);
   const [updateId, setUpdateId] = useState(null);

   useEffect(() => {
      api.get("/categories?limit=1000")
         .then((res) => {
            setCategories(res.data);
         })
         .catch()
         .finally();
   }, [reload]);

   const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true);

      if (updateId) {
         api.patch(`/categories/${updateId}`, { name: catValue })
            .then(() => {
               setCatValue("");
               toast.success("Category is updated");
               setReload((p) => !p);
               setUpdateId(null);
            })
            .catch((err) => {
               toast.error(err.response.data.message);
            })
            .finally(() => {
               setLoading(false);
            });
      } else {
         api.post("/categories", { name: catValue })
            .then((res) => {
               setCatValue("");
               toast.success("Category is created");
               setReload((p) => !p);
            })
            .catch((err) => {
               toast.error(err.response.data.message);
            })
            .finally(() => {
               setLoading(false);
            });
      }
   };

   const handleDelete = (id) => {
      api.delete(`/categories/${id}`)
         .then((res) => {
            toast.success("Category is deleted");
            setReload((p) => !p);
         })
         .catch((err) => {
            toast.error(err.response.data.message);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   const handleUpdate = (category) => {
      setUpdateId(category.id);
      setCatValue(category.name);
   };

   return (
      <div>
         <div className="container">
            <h3 className="text-center text-2xl">Category crud</h3>
            <div className="flex flex-col gap-10 items-center justify-center">
               <ul className="flex gap-1 px-2.5 py-2 flex-wrap">
                  {categories?.data?.map((cat) => (
                     <li key={cat.id} className="flex gap-1 items-center px-1.5 py-1 bg-gray-500 text-amber-50 rounded-2xl cursor-pointer">
                        {cat.name}
                        <button onClick={() => handleDelete(cat.id)} className="bg-red-500 rounded-[4px] p-1 cursor-pointer">
                           Delete
                        </button>
                        <button onClick={() => handleUpdate(cat)} className="bg-yellow-500 rounded-[4px] p-1 cursor-pointer">
                           Edit
                        </button>
                     </li>
                  ))}
               </ul>

               <form onSubmit={handleSubmit} className="flex gap-3">
                  <input required value={catValue} onChange={(e) => setCatValue(e.target.value)} className="border indent-1 w-[200px] py-2 rounded-[4px]" placeholder="Enter name" type="text" name="" id="" />

                  <button disabled={loading} className={`cursor-pointer border rounded-[4px] p-2 bg-green-500 text-amber-50 ${loading ? "opacity-50" : updateId ? "bg-yellow-500" : ""}`}>
                     {updateId ? "Update" : "Create"}
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default React.memo(Categories);
