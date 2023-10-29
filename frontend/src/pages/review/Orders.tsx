import React, { useState, useEffect } from "react";
import NaLink from 'react-router-dom'
import Header1 from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Input } from 'antd';
import {  Layout } from 'antd';
import { Button } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { Space, Table, Tag } from 'antd';
import { ComicsInterface } from "../../interfaces/IComics";
import { GetComic } from "../../services/http";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";




const Orders = () => {

  const [comic, setComic] = useState<ComicsInterface[]>([]);

  const getComic = async () => {
    let res = await GetComic();
    if (res) {
      setComic(res);
    }
  };

  useEffect(() => {
    getComic();
    
  }, []);

  const columns: ColumnsType<ComicsInterface> = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
    render: (text) => <a>{text}</a>,
  },

  {
    title: 'Name',
    dataIndex: 'Title',
    key: 'Title',
  },
  {
    title: 'Description',
    key: 'Description',
    dataIndex: 'Description',
  
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <Space direction="horizontal">
        {/* <NavLink to="/AddProduct"> */}
        <Button
          onClick={() => navigate(`/Createreview/${record.ID}`)}
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
            มังงะของฉัน
          </h1>
          <div className="m-10">
          </div>
          <Table columns={columns} dataSource={comic} />
        </div>
      </Layout>
    </>
  );
};

export default Orders;
