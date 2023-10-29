
import React, { useState, useEffect } from "react";
import NaLink from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Header1 from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Button } from "antd";
import { Input } from 'antd';
import {  Layout } from 'antd';
import { GetReview } from "../../services/http";
import { GetRating } from "../../services/http";
import { GetComic } from "../../services/http";
import type { ColumnsType } from 'antd/es/table';
import { Space, Table, Tag } from 'antd';
import { ReviewInterface } from '../../interfaces/lReview';
import { RatingInterface } from '../../interfaces/lRating';
import { ComicsInterface } from "../../interfaces/IComics";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";


const Myreview = () => {
  
  const [review, setReview] = useState<ReviewInterface[]>([]);
  const [rating, setrating] = useState<RatingInterface[]>([]);
  const [commic, setComic] = useState<ComicsInterface[]>([]);
  
  const getReview = async () => {
    let res = await GetReview();
    if (res) {
      setReview(res);
    }
  };
  
  const getRating = async () => {
    let res = await GetRating();
    if (res) {
      setrating(res);
    }
  };

  const getComic = async () => {
    let res = await GetComic();
    if (res) {
      setComic(res);
    }
  };
  
  useEffect(() => {
    getReview();
    getRating()
    getComic();
  }, []);
  
  
  
  
  const columns: ColumnsType<ReviewInterface> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Comic",
      dataIndex: "Comic",
      key: "ComicID",
      render: (item) => Object.values(item.Title),

      
    },
    {
      title: "Comment",
      dataIndex: "Comment",
      key: "Comment",
    },
    {
      title: "RatingID",
      dataIndex: "RatingID",
      key: "RatingID",
      
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space direction="horizontal">
          {/* <NavLink to="/AddProduct"> */}
          <Button
            onClick={() => navigate(`/EditReview/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"large"}
          />
        </Space>
      ),
    },
  ];
  const navigate = useNavigate();
  
  

  return (
    <>
      <Header1 />
      <Navbar />
      <Layout>
        <div className=" h-screen  ">
          <h1 className="text-3xl text-center  card w-96 p-6 shadow-lg m-auto mt-10">
            รีวิวของฉัน
          </h1>
          <div className="m-10">
            <h2 className="text-1xl mt-20 text-left ">
             
            </h2>
            
          </div>
          <Table columns={columns} dataSource={review}   />
       </div>
          
      </Layout>
    </>
  ); 
};

export default Myreview;
