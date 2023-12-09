import React from 'react'

const SliderCard = ({slider}) => {
  return (
    <>
    <div className='py-6'>

      <div className="flex  justify-center gap-4 lg:gap-10 w-[90%] lg:[85%] xl:w-[80%] mx-auto overflow-hidden  ">

        <div className="md:w-1/4 lg:p-4 lg:py-7 ">
          <img
            src={slider?.image}
            alt=""
            className='rounded-sm py-4 w-[80%]  object-contain'
          />
        </div>

        <div className="md:w-2/3 lg:py-4 my-auto">
          <h1 className="lg:text-3xl font-bold text-white w-[50%]">
          {slider?.title}
          </h1>
          <p className="mt-6 text-base text-white lg:w-[80%]">
          {slider?.des}
          </p>
          <button className='btn btn-primary bg-white text-black border-0 hover:text-white btn-md mt-6'>Read More</button>
        </div>

      </div>
    </div>
    </>
  );
}

export default SliderCard