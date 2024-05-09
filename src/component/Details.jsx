// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/Axios";
import Loding from "./Loding";
import { ProductContext } from "../utils/Context";


const Details = () => {
  const [products, setproducts] = useContext(ProductContext);
  const[product , setproduct] = useState(null)
    const {id} = useParams();
    const navigate = useNavigate();
    // const getsingleproduct = async ()=>{
    //   try{
    //     const {data} = await axios.get(`/products/${id}`);
    //     setproduct(data);
    //   }
    //   catch(e){
    //     console.log(e);
    //   }
    // } 
    useEffect(()=>{
           if(!product){
            setproduct(products.filter((p)=>p.id == id)[0]);
           }
    },[])
    const productdeletehandler = (id)=>{
      console.log('delete product')
       const filtered = products.filter((p)=>p.id !== id);
       setproducts(filtered);
       localStorage.setItem("product",JSON.stringify(filtered));
       navigate("/");
    }

  return  ( product ? 
    <div className="w-[70%] flex justify-between items-center h-full  m-auto p-[10%]">
      <img
        className="object-fill h-[80%] w-[40%]"
        src={`${product.image}`}
        alt=""
      />
      <div className="content w-[50%]  ">
        <h1 className="text-3xl">{product.title},</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-red-300 mb-3">$ {product.price},</h2>
        <p className="mb-[5%]">{product.description}</p>
        <Link to={`/edit/${product.id}`} className='px-3 mr-2 py-2 border rounded border-blue-400 text-blue-400'>edit</Link>
        <button onClick={()=> productdeletehandler(product.id)} className='px-3 py-2 border rounded border-red-400 text-red-400'>delete</button>

      </div>
    </div > : <Loding/>
  );
};

export default Details;
