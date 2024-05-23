import React from 'react'

const CardFeature = ({image,name,price,category}) => {
  return (
    <div className='w-full min-w-[280px]'>
     <div className='h-20'>
      <img src={image} className='h-full '/>
     </div>
    </div>
  )
}

export default CardFeature