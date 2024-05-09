import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { json, useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const addproducthandler = (e) => {
    e.preventDefault();
    if (
      title.trim().length < 4 ||
      description.trim().length < 4 ||
      category.trim().length < 4 ||
      price.trim().length < 1 ||
      image.trim().length < 4
    ) {
      alert("Please enter atleast 5 words in each fiels ");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    console.log(product);
    setproducts([...products, product]);
    localStorage.setItem(
      "products",
      JSON.stringify([...products, product])
    );
    navigate("/");
  };
  console.log(products);
  return (
    <form
      onSubmit={addproducthandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Add New Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2 flex justify-between ">
        <input
          type="text"
          placeholder="category "
          className="text-1xl bg-zinc-100 rounded p-3 w-[45%] mb-3"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="price"
          className="text-1xl bg-zinc-100 rounded p-3 w-[45%] mb-3"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        onChange={(e) => setdescription(e.target.value)}
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        placeholder="enter product description ..."
        value={description}
        rows={10}
      ></textarea>
      <div className="w-1/2 mt-4">
        <button className="px-3 py-2 border rounded border-blue-400 text-blue-400">
          Add New Products
        </button>
      </div>
    </form>
  );
};

export default Create;
