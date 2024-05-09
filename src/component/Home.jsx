import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation, useNavigation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loding from "./Loding";
import axios from "../utils/Axios";

function home() {

  const [products] = useContext(ProductContext);
      const {search} = useLocation();
      const category = decodeURI(search.split("=")[1]);

         const[filterproducts,setfilterproducts] = useState(null);

      const getproductcategory = async ()=>{
        try {
          const { data } =  await axios.get(`/products/category/${category}`);
          // setfilterproducts(data);
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        if(!filterproducts || category == "undefined")  setfilterproducts(products);
          if(category != "undefined"){
            //  getproductcategory();
           setfilterproducts(products.filter((p) => p.category == category));
          }
       
      },[category,products])
      // console.log(filterproducts);





  return products ? (
    <>
      <Nav />
      
      <div className="w-[85%] p-10 pt-[5%]  flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filterproducts && filterproducts.map((p,i)=>{
                  return <Link to={`/details/${p.id}`} key={i} className=" mr-3 mb-3 card p-3 border shadow rounded w-[17%] h-[30vh] flex-col flex justify-center item-center">
                    <div className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                      style={{
                        backgroundImage: `url(${p.image})`,
                      }}
                    ></div>
                    <h1 className="hover:text-blue-300 text-center">{p.title}</h1>
                  </Link>
        })}
        
      </div>
    </>
  ) :(<Loding/>) 
}

export default home;
