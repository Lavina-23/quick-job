import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerSchema } from "../schemas";
import { IRegister } from "../types";
import { useRegister } from "../hooks";
import { errorMessage } from "../constant";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IRegister>({
    criteriaMode: "all",
    resolver: zodResolver(registerSchema),
  });

  const [seePassword, setSeePassword] = useState(false);
  const { data, error, isError, isPending, isSuccess, mutate } = useRegister();
  const navigate = useNavigate();

  const onSubmit = (formData: IRegister) => {
    mutate(formData);
  };

  useEffect(() => {
    document.title = "Quick Job | Sign up";
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/signin");
      return;
    }

    const err = (error?.response?.data as { message: string })?.message;

    if (isError) {
      switch (err) {
        case errorMessage.EMAIL_TAKEN:
          setError("email", {
            message: errorMessage.EMAIL_TAKEN.charAt(0).toUpperCase() + errorMessage.EMAIL_TAKEN.slice(1),
          });
          break;

        case errorMessage.USERNAME_TAKEN:
          setError("username", {
            message: errorMessage.USERNAME_TAKEN.charAt(0).toUpperCase() + errorMessage.USERNAME_TAKEN.slice(1),
          });
          break;

        case errorMessage.PASSWORD_REGEX_NOT_VALID:
          setError("password", { message: errorMessage.PASSWORD_REGEX_NOT_VALID });
          break;

        default:
          setError("root", { message: errorMessage.INTERNAL_SERVER_ERROR });
          break;
      }
    }
  }, [error, isError, setError, isSuccess, navigate]);

  return (
    <section className="h-dvh grid md:flex justify-center items-center p-5">
      <div className="grid md:flex gap-[50px]">
        <div className="hidden md:flex">
          <img src="/img/larry-sign.svg" alt="larry-sign" className="md:w-[300px] lg:w-full" />
        </div>
        <div>
          <div className="flex flexEnd items-center gap-1">
            <Link to={"/signin"} className="text-red-90 underline text-sm-s">
              Sign In
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </div>
          <h1 className="text-5xl-s md:text-8xl-s text-green-90 lg:mt-[60px]">
            Daftar <br className="md:hidden" /> kuy !
          </h1>
          <div className="grid justify-items-end">
            <img src="/img/larry-sign.svg" alt="larry-sign" className="md:hidden h-[300px] mt-[-40px] mb-[5px]" />
          </div>
          {/* form e coy */}
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
            <div className="mb-5">
              <div className="flex gap-[10px] my-4">
                <div>
                  <label className="block mb-2 text-sm-r md:text-md-r text-green-90">First Name</label>
                  <input
                    type="text"
                    className="w-full py-[8px] px-[12px] text-xs-r md:text-sm-r rounded-lg border-2 border-goku focus:outline-none"
                    placeholder="ujang"
                    {...register("firstname")}
                  />
                  <p className="text-red-600 text-sm">{errors.firstname?.message}</p>
                </div>
                <div>
                  <label className="block mb-2 text-sm-r md:text-md-r text-green-90">Last Name</label>
                  <input
                    type="text"
                    className="w-full py-[8px] px-[12px] text-xs-r md:text-sm-r rounded-lg border-2 border-goku focus:outline-none"
                    placeholder="cantik"
                    {...register("lastname")}
                  />
                  <p className="text-red-600 text-sm">{errors.lastname?.message}</p>
                </div>
              </div>
              <label className="block mb-2 text-sm-r md:text-md-r text-green-90">Your email</label>
              <input
                type="email"
                className="w-full py-[8px] px-[12px] text-xs-r md:text-sm-r rounded-lg border-2 border-goku focus:outline-none"
                placeholder="example@gmail.com"
                {...register("email")}
              />
              <p className="text-red-600 text-sm">{errors.email?.message}</p>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm-r md:text-md-r text-green-90">Your username</label>
              <input
                type="text"
                className="w-full py-[8px] px-[12px] text-xs-r md:text-sm-r rounded-lg border-2 border-goku focus:outline-none"
                placeholder="exampleusername"
                {...register("username")}
              />

              <p className="text-red-600 text-sm">{errors.username?.message}</p>
            </div>
            <div className="mb-5">
              <label className="block text-sm-r md:text-md-r mb-2 text-sm-r text-green-90">Your password</label>
              <input
                type={seePassword ? "text" : "password"}
                id="email"
                className="w-full py-[8px] px-[12px] text-xs-r md:text-sm-r rounded-lg border-2 border-goku focus:outline-none"
                placeholder="**********"
                {...register("password")}
              />
              <p className="text-red-600 text-sm">{errors.password?.message}</p>
            </div>
            <div className="flex gap-2 items-center">
              <input onClick={() => setSeePassword((prev) => !prev)} type="checkbox" />
              <label className="text-sm">See password</label>
            </div>
            <div className="flex justify-between items-center mb-6">
              <a href="/" className="text-red-90 underline text-sm-s md:text-sm-s">
                Forgot Password?
              </a>
              <button
                type="submit"
                className="btn-sm-fill bg-green-90 text-white hover:text-green-90 focus:text-green-90 text-sm font-semibold"
                disabled={isPending}
              >
                {isPending ? "Loading" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
