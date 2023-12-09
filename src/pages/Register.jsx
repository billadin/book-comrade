import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';
import { useSnackbar } from 'notistack';
import useAxios from '../hooks/useAxios';

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, createUser, updatingUser, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const axios = useAxios()

  if (loading) {
    return <Loading />;
  }


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

  const handleRegister = async (e) => {
    e.preventDefault();
    const specialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const img = form.image.value;
    console.log(name, email, password)

    console.log(name, email, password);

    if (!name || !email || !password || !img) {
      fail("Please fill all the information");
      return;
    }

    if (password.length < 6) {
      fail("Password cannot be less than 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      fail("Please add at least one uppercase letter in password");
      return;
    } else if (!specialCharacter.test(password)) {
      fail("Please add at least one special character in password");
      return;
    }

    axios.post(`/user`, {username: email, role: "user" })
        .then(res => console.log(res.data))
        .catch(e => console.log(e));
      


    createUser(email, password)
      .then(() => {
        setLoading(true);
        updatingUser(name, img)
          .then((res) => {
          })
          .catch((e) => console.log(e));
        success(`Registration Success`);
        setLoading(false);
        navigate("/");
        window.location.reload();
      })
      .catch((e) => {
        let errorMessageText = e.message
          .split("auth/")[1]
          ?.split(")")[0]
          ?.split("-")
          ?.join(" ");
        const message =
          errorMessageText?.charAt(0)?.toUpperCase() +
            errorMessageText?.slice(1) || "Please try again";
        console.log(message);
        fail(`Registration failed: ${message}`);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-100">
      <div className="relative py-40">
        <div className="container relative m-auto px-6 text-gray-500 md:px-12 xl:px-40">
          <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <button className="flex space-x-2 mx-auto">
              <span className="text-xl font-bold text-accent">
                Book Comrade
              </span>
            </button>
            <div className="rounded-3xl border border-gray-100 bg-white  shadow-2xl shadow-gray-600/10 backdrop-blur-2xl">
              <div className="p-8 py-12 sm:p-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-800 ">
                  Create an account
                </h2>

                <form onSubmit={handleRegister} className="space-y-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-gray-600 ">
                      Full name
                    </label>
                    <input
                      
                      type="text"
                      name="name"
                      className="focus:outline-none block w-full rounded-md border border-gray-200  bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-gray-600 ">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="focus:outline-none block w-full rounded-md border border-gray-200  bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="image" className="text-gray-600 ">
                      Image Link
                    </label>
                    <input
                      type="text"
                      name="image"
                      className="focus:outline-none block w-full rounded-md border border-gray-200  bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-600">Password</label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      className="focus:outline-none block w-full rounded-md border border-gray-200  bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative flex h-11 w-1/2 mx-auto items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-[#419E66] before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                  >
                    <span className="relative text-base font-semibold text-white">
                      Sign Up
                    </span>
                  </button>
                  <p className="border-t border-gray-100  pt-6 text-sm text-gray-500">
                    Already have an account?
                    <Link to={"/login"}>
                      <button href="#" className="text-primary ml-2">
                        Log In
                      </button>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register