import React, { MouseEvent } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import PaymentComponent from "../components/Payment_Create";
import Totalprice from "../components/Totalprice";

const Payment = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className=" flex justify-center items-center h-screen bg-base-200">
        <div className="card w-96 p-6 bg-base-100 shadow-lg flex flex-col leading-5">
          <h4 className="text-center text-3xl font-bold border-b border-base-300 pb-2">
            ชำระเงิน
          </h4>
          <div className="box">
            <h5 className="text-lg font-bold">โอนผ่านธนาคาร 🏦</h5>
            <div className="border-b border-base-300 pb-2">
              <span>
                <strong>บัญชีธนาคาร : </strong>กรุงเทพ <br />
                <strong>เลขบัญชี :</strong> 855-0-65158-5 <br />
                <strong>ชื่อบัญชี :</strong> Comic Craze Shop <br />
              </span>
            </div>
          </div>
          <div className="box">
            <h5 className="text-lg font-bold ">PromptPay 💸</h5>
            <div className="border-b border-base-300 pb-2">
              <span>
                {/* บัญชีธนาคาร : กรุงเทพ <br /> */}
                <strong>เบอร์ :</strong> 0105561008411 <br />
                <strong>ชื่อบัญชี :</strong> Comic Craze Shop <br />
              </span>
            </div>
          </div>
          {/* Form */}
          <PaymentComponent />
        </div>
        <div>
          <Totalprice />
          <div className="text ml-14">
            <p className="text-sm  p-5">
              <strong>ขั้นตอนการชำระเงิน !!!</strong>
              <br />
              1- ชำระยอดรวมตามที่กำหนด
              <br />
              2- แนบสลิปหลักฐานการชำระเงิน
              <br />
              3- รอการยืนยันภายใน 24 ชั่วโมง <br />
              4- ถ้าหากภายใน 24 ชั้่วโมงยังไม่ได้รับการยืนยัน →
              <Link
                to="mailto:taston4411@gmail.com"
                className="ml-2 link link-hover link-accent"
              >
                Click Me
              </Link>
              <br />
              5- สามารถตรวจสอบสถานะการชำระเงินได้ที่นี้ →
              <Link
                to="/Payment/Status"
                className="ml-2 link link-hover link-accent"
              >
                Click Me
              </Link>
              <br />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
