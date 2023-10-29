import React from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";
import TabAdmin from "../../../components/TabAdmin";
import AddComic from "../../../components/AddComic/AddComic";
import { UserOutlined, AudioOutlined } from "@ant-design/icons";
import { Layout, Space, Pagination, Input, Empty } from "antd";

const { Search } = Input;
const onSearch = (value: string) => console.log(value);

const AddProduct: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex justify-start w-100 bg-base-200">
        <div className="bg-base-200 h-screen w-100 ">
          <TabAdmin />
        </div>
        <div className=" items-center ">
          <div className="text-center text-blck text-2xl ml-72">
            <h1> Add Products</h1>
          </div>
          <div className="card m-auto bg-base-100 w-11/12 h-4/5 shadow-lg ml-56 mt-12">
            <AddComic />
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProduct;
