import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context'
import { Link } from 'react-router-dom';

const Nav = () => {
  const [product] = useContext(ProductContext);
  let distinct_category =
  product && product.reduce((acc,cv)=>[...acc,cv.category],[]);
  distinct_category = [...new Set(distinct_category)];
  // console.log(distinct_category);
  const color = ()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`
  }
  // console.log(color());
  return (
    <nav className='w-[15%] h-screen bg-zinc-50 flex flex-col items-center p-5'>
       <a className='px-3 py-2 border rounded border-blue-400 text-blue-400' href="/create">
        Add New Products
       </a>
       <hr className=' my-8 w-[80%]' />
      <h1 className='text-2xl mb-3  w-[80%] '>Category Filter</h1>
      <div className=' w-[80%]'>
        {distinct_category.map((c,i)=>(   <Link to={`/?category=${c}`} key={i} className='flex item-center mb-3'> <span style={{backgroundColor:color()}} className='rounded-full mr-2 w-[15px] h-[15px] bg-blue-100'></span>{" "}{c}</Link>))}
      
       
      </div>
      </nav>
      
  )
}

export default Nav