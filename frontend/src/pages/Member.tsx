import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TabAdmin from "../components/TabAdmin";

import {
  Space,
  Table,
  Tag,
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  id: string;
  username: string;
  email: string;
  password: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },

  {
    title: "Action",
    key: "action",
    render: () => (
      <Space wrap>
        <Button>Edit</Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: "1",
    username: "John Brown",
    email: "Johnza@gmail.com",
    password: "sdf7474",
  },
  {
    id: "2",
    username: "Jim Green",
    email: "JImson@hotmail.com",
    password: "admin123",
  },
  {
    id: "3",
    username: "Joe Black",
    email: "Joejy_boy@outlook.com",
    password: "locesda85",
  },
];
const Member: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex bg-base-200 w-100 h-screen ">
        <TabAdmin />
        <div className="leading-loose bg-base-200 w-100 items-center h-screen">
          <div className="text-center text-4xl pt-8 text-black">Member</div>
          <div className="card w-100 bg-base-100 shadow-lg m-auto my-10 ml-44">
            <div className="mx-3 ">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Member;
