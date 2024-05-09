import React, { useEffect } from 'react'
import  { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { json, useNavigate, useParams } from "react-router-dom";


const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const[product , setproduct] = useState({
      
      title: "",
      image: "",
      category: "",
      price: "",
      description: "",
    });
    const changehandler = (e)=>{
      // console.log(e.target.name,e.target.value)
      setproduct({...product,[e.target.name]:e.target.value})
    }
    
    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
    useEffect(()=>{
      setproduct(products.filter((p)=>p.id == id)[0]);
     
    },[id]);
    
    
  
    const addproducthandler = (e) => {
      e.preventDefault();
      if (
        product.title.trim().length < 4 ||
        product.description.trim().length < 4 ||
        product.category.trim().length < 4 ||
        product.price.trim().length < 1 ||
        product.image.trim().length < 4
      ) {
        alert("Please enter atleast 5 words in each fiels ");
        return;
      }
      const pi = products.findIndex((p)=> p.id == id);
      const copydata = [...products];
      console.log(copydata);
      copydata[pi] = {...products[pi],...product};
      setproducts(copydata);
      localStorage.setItem('products',JSON.stringify(copydata));
      navigate(-1);
      console.log("anuj")

  
      // const product = {
      //   id: nanoid(),
      //   title,
      //   image,
      //   category,
      //   price,
      //   description,
      // };
      
    //   setproducts([...products, product]);
    //   localStorage.setItem(
    //     "products",
    //     JSON.stringify([...products, product])
    //   );
    //   navigate("/");
     };
  return (
    <form
      onSubmit={addproducthandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">EDIT PRODUCT</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="image"
        onChange={changehandler}
        value={product && product.image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name = "title"
        onChange={changehandler}
        value={product && product.title}
      />
      <div className="w-1/2 flex justify-between ">
        <input
          type="text"
          placeholder="category "
          className="text-1xl bg-zinc-100 rounded p-3 w-[45%] mb-3"
          name = "category"
          onChange={changehandler}
          value={product && product.category}
        />
        <input
          type="number"
          placeholder="price"
          className="text-1xl bg-zinc-100 rounded p-3 w-[45%] mb-3"
          name = "price"
          onChange={changehandler}
          value={product && product.price}
        />
      </div>
      <textarea
      name = "description"
        onChange={changehandler}
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        placeholder="enter product description ..."
        value={product && product.description}
        rows={10}
      ></textarea>
      <div className="w-1/2 mt-4">
        <button className="px-3 py-2 border rounded border-blue-400 text-blue-400">
          Add New Products
        </button>
      </div>
    </form>
  )
}

export default Edit