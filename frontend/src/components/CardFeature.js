import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem ,increaseQty} from '../redux/productSlice'
import { useDispatch } from 'react-redux'

const CardFeature = ({image,name,price,category,id}) => {
  const dispatch=useDispatch();
  const handleAddCartProduct=(e)=>{
     
     dispatch(addCartItem({
      _id:id,
      name:name,
      price:price,
      category:category,
      image:image
     }))
  }
  return (
    <>
    
    <div className='w-full min-w-[200px] max-w-[200px] bg-white shadow-2xl py-4 px-4 cursor-pointer flex flex-col '>
    <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
     <div className='h-28 flex flex-col justify-center items-center'>
      <img src={image} className='h-full'/>
     </div>
     <h3 className='font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden'>{name}</h3>
        <p className=' text-slate-500 font-medium capitalize'>{category}</p>
        <p className=' font-bold '><span className='text-red-500'>{name?"₹":"Loading"}</span><span>{price}</span></p>
        </Link>
        {name&&<button className='bg-yellow-500 py-1 mt-1 mb-2 rounded hover:bg-yellow-600 w-full ' onClick={handleAddCartProduct}>Add Cart</button>}
    </div>
   
    </>
  )
}

export default CardFeature