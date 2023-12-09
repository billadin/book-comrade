import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";
import { useSnackbar } from "notistack";

const Login = () => {
  const { user, signInUser, loading, loggingWithGoogle, setLoading } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      return;
    }

    try {
      await signInUser(email, password);
      success("Login success!");
      navigate(location?.state ? location?.state : "/");
      e.target.reset();
    } catch (e) {
      setLoading(false);
      let errorMessageText = e.message
        .split("auth/")[1]
        ?.split(")")[0]
        ?.split("-")
        ?.join(" ");
      const message =
        errorMessageText?.charAt(0)?.toUpperCase() +
          errorMessageText?.slice(1) || "Please try again";
      fail(`Login Failed: ${message}`);
    }
  };

  const handleGoogleLogin = () => {
    loggingWithGoogle()
      .then((res) => {
        success("Login success!");
        navigate(location?.state ? location?.state : "/");
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
        fail(`Login Failed: ${message}`);
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
                  Sign in to your account
                </h2>

                <form onSubmit={handleLogin} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-gray-600 ">Email</label>
                    <input
                      type="email"
                      name="email"
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
                      Log In
                    </span>
                  </button>
                </form>
                <div className="my-12 mx-auto text-center">
                  <button
                    onClick={handleGoogleLogin}
                    className="mx-auto h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 "
                  >
                    <div className="w-max mx-auto flex items-center justify-center space-x-4">
                      <img
                        src="https://tailus.io/sources/blocks/plus-social/preview/images/google.svg"
                        className="w-5"
                        alt=""
                      />
                      <span className=" text-sm font-semibold tracking-wide text-cyan-700">
                        Login With Google
                      </span>
                    </div>
                  </button>
                </div>
                <p className="border-t border-gray-100  pt-6 text-sm text-gray-500">
                  Don't have an account?
                  <Link to={"/register"}>
                    <button href="#" className="text-primary ml-2">
                      Create account
                    </button>
                  </Link>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
