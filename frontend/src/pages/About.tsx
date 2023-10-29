import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Header />
      <Navbar />
      {/* <h1 className="text-4xl">About</h1> */}
      <div className="h-screen">
        <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center mt-20 ">
          <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
            We love
          </h1>
          <div className="stats bg-primary shadow">
            <div className="stat">
              <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
                Comic
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae
          quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia
          optio aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo
          sed officiis ea tempore! Similique eos minima sit porro, ratione
          aspernatur!
        </p>
      </div>
    </>
  );
};

export default About;
