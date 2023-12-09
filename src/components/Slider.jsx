import { Carousel } from "flowbite-react"
import {MdArrowBackIosNew, MdArrowForwardIos} from 'react-icons/md'
import SliderCard from "./SliderCard"

const Slide = () => {

  const slider1Obj = {
    title: "The Paris Apartment",
    image: "https://booksatrillion.com/wp-content/uploads/2023/03/20230323-053731-2.jpg",
    des: "From the New York Times bestselling author of The Guest List comes a new locked room mystery, set in a Paris apartment building in which every resident has something to hide…"
  }
  const slider2Obj = {
    title: "Behind The Door",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1681793613i/75668280.jpg",
    des: "The disturbing true story of the notorious Cecil Hotel in downtown LA, by its general manager for a decade and star of the controversial Netflix documentary series Crime Scene: The Vanishing at the Cecil Hotel"
  }
  const slider3Obj = {
    title: "Good TO Great",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546097703i/76865.jpg",
    des: "To find the keys to greatness, Collins's 21-person research team read and coded 6,000 articles, generated more than 2,000 pages of interview transcripts and created"
  }

  return (
    <>

    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 md:block">
      <Carousel
        slide={false}
        indicators={false} 
        leftControl={<MdArrowBackIosNew className="text-4xl text-gray-300"/>} 
        rightControl={<MdArrowForwardIos className="text-4xl text-gray-300"/>}
        className=""
        >

        <div className="flex h-full items-center justify-center bg-gradient-to-r from-slate-700 to-slate-600  dark:text-white">
          <div>
            <SliderCard slider={slider1Obj}/>
          </div>
        </div>

        <div className="flex h-full items-center justify-center bg-gradient-to-l from-yellow-700 to-yellow-600  dark:text-white">
          <div>
            <SliderCard slider={slider2Obj}/>
          </div>
        </div>

        <div className="flex h-full items-center justify-center bg-gradient-to-l from-orange-500 to-amber-500  dark:text-white">
          <div>
            <SliderCard slider={slider3Obj}/>
          </div>
        </div>
        
      </Carousel>
    </div>

    </>
    

  )
}

export default Slide