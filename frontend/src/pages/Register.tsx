import {  Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="h-screen grid place-items-center bg-base-200">
      <form
        // method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mt-4">
          <button type="button" className="btn btn-secondary btn-block">
            Register
          </button>
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-secondary capitalize"
          >
            login
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Register;
