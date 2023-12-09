import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import Loading from './Loading';
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  const {user, logOut, loading, setLoading, updatingUser} = useContext(AuthContext);
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
        <NavLink
          to={"/"}
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

        <NavLink
          to={"/book/add"}
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

        <NavLink
          to={"/books"}
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

        <NavLink
          to={"books/borrowed"}
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
        <button className='bg-white dark:bg-black relative active:bg-transparent hover:bg-transparent '>
                                <p className="block ml-4 transition  dark:text-white">
                                    <span className='inline-flex absolute top-1/4'>
                            <ThemeSwitch  className="inline-flex active:bg-transparent hover:bg-transparent bg-red-600"/>
                    </span>
                                </p>
                            </button>
      </>
    );

   
  return (
      <div className="w-full navbar bg-white  dark:bg-black dark:text-white fixed top-0 left-0 z-10 opacity-100 border-b border-primary">

        {/* Hamburger icon */}
        <div className="flex-none lg:hidden">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        {/* Nav Logo */}
        <Link to={'/'}>
        <div className="px-2 mx-2 text-accent font-bold text-2xl">BookComrade</div>
        </Link>

        <div className="lg:flex hidden w-full lg:justify-between">
          <ul className="relative menu menu-horizontal">
            {/* Navbar menu content here */}
            {navLinks}
            
          </ul>


          {/* Login/Logout/Profile */}
          {
          loading ?
          <span className="loading loading-spinner loading-md text-primary"></span> :
          <div className="relative w-full min-w-max  lg:space-y-0 md:w-max bg-white dark:bg-black">
            {
              user ? 

              <div className='flex '>

                <Link to={'/books/borrowed'}>
                  <div className=''>
                    <img src={user.photoURL} className='w-10 h-10 rounded-full inline-flex'/>
                    <button type="button"  className="py-3 px-6 text-center rounded-full transition sm:w-max  mx-2">
                        <span className="block text-primary dark:text-white font-semibold text-sm">
                            {user.displayName}
                        </span>
                    </button>
                  </div>
                </Link>

                <Link>
                <button
                  onClick={handleLogout}
                  type="button"
                  title="Login"
                  className="w-full py-3 px-6 text-center rounded-full transition bg-primary sm:w-max">
                  <span className="block text-white font-semibold text-sm">
                    Logout
                  </span>
                </button>
              </Link>
              </div>
               :

              <Link to={"/login"}>
                <button
                  type="button"
                  title="Login"
                  className="w-full py-3 px-6 text-center rounded-full transition bg-primary sm:w-max">
                  <span className="block text-white font-semibold text-sm">
                    Login
                  </span>
                </button>
              </Link>
            }
          </div>
          }

        </div>
      </div>
  );
}

export default Navbar