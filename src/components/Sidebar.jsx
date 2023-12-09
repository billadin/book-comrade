import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { enqueueSnackbar } from 'notistack';

const Sidebar = () => {
  const {user, loading, setLoading, logOut} = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setLoading(true)
    logOut()
    .then(res=> {
        success(`Logout Success`);
        navigate('/login');
        setLoading(false)
    })
    .catch(e => {
      fail(`Failed: ${e.message}`);
      console.log(e)
      setLoading(false)
    })
  }


    // Nav links
    const navLinks = (
      <>
        <NavLink to={'/'}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "font-bold" : ""
          }
        >
          <li>
            <p className="block md:px-4 transition text-primary dark:text-white">
              <span>Home</span>
            </p>
          </li>
        </NavLink>

        <NavLink to={'/book/add'}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "font-bold" : ""
          }
        >
          <li>
            <p className="block md:px-4 transition text-primary dark:text-white">
              <span>Add Book</span>
            </p>
          </li>
        </NavLink>

        <NavLink to={'/books'}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "font-bold" : ""
          }
        >
          <li>
            <p className="block md:px-4 transition text-primary dark:text-white">
              <span>All Books</span>
            </p>
          </li>
        </NavLink>

        <NavLink to={'/books/borrowed'}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "font-bold" : ""
          }
        >
          <li>
            <p className="block md:px-4 transition text-primary dark:text-white">
              <span>Borrowed Books</span>
            </p>
          </li>
        </NavLink>
      </>
    );


  return (
    <>
    <ul className='mt-14'>
        {navLinks}
    </ul>
    <div className="w-full min-w-max space-y-2 lg:space-y-0 text-center pt-8">
      {
        !user ? 
        <Link to={"/login"}>
              <button
                type="button"
                title="Login"
                className="py-3 px-6 text-center rounded-full transition bg-primary">
                <span className="block text-white font-semibold text-sm">
                  Login
                </span>
              </button>
          </Link> :

          <Link >
            <button
            onClick={handleLogout}
              type="button"
              title="Login"
              className="py-3 px-6 text-center rounded-full transition bg-primary">
              <span className="block text-white font-semibold text-sm">
                Logout
              </span>
            </button>
          </Link>
     
            
       }
      </div>
    </>
  )
}

export default Sidebar