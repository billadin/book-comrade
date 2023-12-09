import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react'
import BookCardFull from '../components/BookCardFull';
import useAxios from '../hooks/useAxios';
import { useParams } from 'react-router-dom';

const BookCategory = () => {
    const [books, setBooks] = useState([])
    const axios = useAxios()
    const { category } = useParams()

  useEffect(()=> {
    axios(`/books/${category}`)
    .then(res => {
      setBooks(res?.data?.result)
    })
    .catch(e => console.log(e));
  }, [])


  return (
    <div className="w-[80%] mx-auto my-24">
    <div className="flex gap-6 items-center">
      <h1 className="text-4xl font-medium">{`${category.toUpperCase()} BOOKS`}</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 my-14">
      {books?.map((book) => (
        <BookCardFull key={nanoid(10)} book={book} />
      ))}
    </div>
  </div>
  )
}

export default BookCategory