import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl "
          />
          <div className="mr-6">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome To <br />
              Comic Craze Shop!
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 mb-8">
              <strong>Comic Craze Shop </strong>
              เปิดทุกวันเพื่อให้คุณมีโอกาสลองลงไปในโลกของการ์ตูนที่น่าตื่นเต้น
              พวกเรายินดีต้อนรับคุณและหวังว่าจะได้ช่วยคุณค้นพบความสนุกของการ์ตูนไปพร้อมกัน!
            </p>
            <Link to="/Products" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
