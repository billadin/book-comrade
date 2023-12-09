import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import useAxios from '../hooks/useAxios';
import { useParams } from 'react-router-dom';
import PDF from '../components/PDF';
import ReactDOM from 'react-dom';
import { PDFDownloadLink, PDFViewer, Document, Page } from '@react-pdf/renderer';

const Read = () => {
const {user} = useContext(AuthContext);
const [book, setBook] = useState([])
const username = user.email;
const axios = useAxios()
const {category, isbn} = useParams()

useEffect(() => {
    if (user) {
        axios.post(`books/${category}/${isbn}`, {username})
      .then(res => {
        console.log(res.data)
        setBook(res.data);
      })
      .catch(e => console.log(e)); 
    }
},[])




  return (
    <div className='w-[90%] md:w-[80%] mx-auto my-40'>
      
      <div className='text-center md:text-right mb-10'>
      <PDFDownloadLink document={<PDF book={book}/>} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ?
        'Loading document...' :
        <button className='btn btn-sm btn-accent text-white normal-case'>Download the Book as PDF</button>
      }
    </PDFDownloadLink>
      </div>
      <div className='w-[80%] mx-auto mb-10'>
          <h1 className="text-lg font-medium mb-4">{book?.description1}</h1>
          <p className="text-base mb-4">
            {book?.description2}
          </p>
          <br/>
          <p className="text-base mb-4">
            {book?.description1}
          </p>
          <br/>
          <p className="text-base mb-4">
            {book?.description2}
          </p>
      </div>
        <PDFViewer className='w-full min-h-screen rounded-md'>
         <PDF book={book}/>
        </PDFViewer>
    </div>
  )
}

export default Read