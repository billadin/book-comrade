import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import BookCard from '../components/BookCard'
import Slider from '../components/Slider'
import PopularCard from '../components/PopularCard'
import Hero from '../components/Hero'
import useAxios from '../hooks/useAxios'

const Home = () => {
  const [books, setBooks] = useState([])
  const [comics, setComics] =useState([])
  const [children, setChildren] =useState([])
  const [history, setHistory] =useState([])
  const [sciFi, setSciFi] =useState([])
  const axios = useAxios();



  useEffect(()=> {
    axios.get('/categories')
    .then(res => {
      setBooks(res.data)
    })
    .catch(e => console.log(e));
  }, [])

  useEffect(()=> {
    axios.get('/books/comics')
    .then(res => {
      console.log(res?.data?.result)
      setComics(res?.data?.result)
    })
    .catch(e => console.log(e));
  }, [])
  useEffect(()=> {
    axios.get('/books/children')
    .then(res => {
      setChildren(res?.data?.result)
    })
    .catch(e => console.log(e));
  }, [])

  useEffect(()=> {
    axios.get('/books/history')
    .then(res => {
      setHistory(res?.data?.result)
    })
    .catch(e => console.log(e));
  }, [])

  useEffect(()=> {
    axios.get('/books/sci-fi')
    .then(res => {
      setSciFi(res?.data?.result)
    })
    .catch(e => console.log(e));
  }, [])

  return (
    <div>

      <div className='mx-auto lg:mb-48 dark:bg-black dark:text-white'>
        <Hero/>
      </div>

      <div className="w-[90%] md:w-[80%] mx-auto my-16">
        <div className="flex gap-6 items-center">
          <h1 className="text-4xl font-medium">Popular Categories</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-14">
          {books?.slice(0, 5)?.map((book) => (
            <PopularCard key={nanoid(10)} book={book} />
          ))}
        </div>
      </div>

      <div className="w-[90%] md:w-[80%] mx-auto my-16">
        <div className="flex gap-6 items-center">
          <h1 className="text-4xl font-medium">Comics</h1>
          <Link to={`/books/comics`} >
           <button className="btn btn-xs btn-accent text-white">All</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-14 ">
          {comics?.map((comic) => (
            <BookCard key={nanoid(10)} book={comic} />
          ))}
        </div>
      </div>

      <div className="w-[90%] md:w-[80%] mx-auto my-16">
        <div className="flex gap-6 items-center">
          <h1 className="text-4xl font-medium">Children</h1>
          <Link to={`/books/children`} >
           <button className="btn btn-xs btn-accent text-white">All</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-14">
          {children?.map((book) => (
            <BookCard key={nanoid(10)} book={book} />
          ))}
        </div>
      </div>

      <div className='w-[90%] md:w-[80%] shadow-2xl mx-auto my-20 hidden md:block'>
        <Slider />
      </div>

      <div className="w-[90%] md:w-[80%]  mx-auto my-16">
        <div className="flex gap-6 items-center">
          <h1 className="text-4xl font-medium">History</h1>
          <Link to={`/books/history`} >
           <button className="btn btn-xs btn-accent text-white">All</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-14">
          {history?.map((book) => (
            <BookCard key={nanoid(10)} book={book} />
          ))}
        </div>
      </div>

      <div className="w-[90%] md:w-[80%] mx-auto my-16">
        <div className="flex gap-6 items-center">
          <h1 className="text-4xl font-medium">Sci-Fi</h1>
          <Link to={`/books/sci-fi`} >
           <button className="btn btn-xs btn-accent text-white">All</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-14">
          {sciFi?.map((book) => (
            <BookCard key={nanoid(10)} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home