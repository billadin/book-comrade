import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { enqueueSnackbar } from 'notistack';
import { AuthContext } from '../provider/AuthProvider';

const AddBook = () => {

  const navigate = useNavigate();
  const axios = useAxios();
  const {user} = useContext(AuthContext);
  const username = user.email;

  const success = (msg) => {
    enqueueSnackbar(msg, {
      preventDuplicate: true,
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  const fail = (msg) => {
    enqueueSnackbar(msg, {
      preventDuplicate: true,
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const handleAddBook = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const isbn = form.isbn.value;
    const author = form.author.value;
    const category = form.category.value;
    const image = form.image.value;
    const rating = form.rating.value;
    const quantity = parseInt(form.quantity.value);
    const description1 = form.description1.value;

    const addBookObject = {
      isbn,
      name,
      author,
      image,
      quantity,
      category,
      description1,
      description2 : null,
      rating,
      published: null,
      lan: null,
      pages: null
    };

    axios.post(`/book/add`, {addBookObject, category, username})
    .then(res=> {
      const data = res.data;

      if( data?.addAllBooks && data?.addSingleBook ) {
        if(data?.addAllBooks?.acknowledged===true || data?.addSingleBook.acknowledged===true) {
          success('Book added successfully!')
          navigate('/books')
        }
      }  else {
        console.log(data?.msg)
        fail(`${data?.msg}`)
      }
      
    })
    .catch(e=> {
      fail(`Error: ${e.message}`)
      console.log(e)
    });  
}

  return (
    <div className="py-16 w-[90%] mx-auto my-20">
      <div className="max-w-4xl p-4 md:p-6 mx-auto bg-white rounded-md md:rounded-r-md md:w-1/2 w-[95%]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Add Book
        </h2>
        <form onSubmit={handleAddBook}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

            <div>
              <label className="text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                required
                name='name'
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>


            <div>
              <label className="text-gray-700" htmlFor="author">
                Author
              </label>
              <input
                required
                name='author'
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="quantity">
                Quantity
              </label>
              <input
                required
                name='quantity'
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="rating">
                Rating
              </label>
              <input
                required
                name='rating'
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="shortDescription">
                Short Description
              </label>
              <input
                required
                name='description1'
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="category">
                Category
              </label>
              <select 
              required
              name="category"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring">
                <option value="">Select a category</option>
                <option value="Business">Business</option>
                <option value="Comics">Comics</option>
                <option value="Crime">Crime</option>
                <option value="Children">Children</option>
                <option value="History">History</option>
                <option value="Sci-Fi">Sci-Fi</option>
              </select>
            </div>

            <div>
              <label className="" htmlFor="file">
                Image
              </label>
              <input
                required
                name='image'
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="" htmlFor="file">
                Unique Book ID (ISBN)
              </label>
              <input
                required
                name='isbn'
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

          </div>


          <div className="flex justify-center mt-6">
            {/* <SnackbarProvider maxSnack={1}/> */}
            <button
              type="submit"
              title="Start buying"
              className="w-full py-3 px-6 text-center rounded-full transition bg-accent  active:bg-primary sm:w-max"
            >
              <span className="block text-white font-semibold text-sm">
                Add
              </span>
            </button>
          </div>
        </form>
      </div>
  
    </div>
  );
}

export default AddBook;