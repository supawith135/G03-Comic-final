import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import TabAdmin from "../../components/TabAdmin";
import { NavLink, useNavigate } from "react-router-dom";
import { Space, Table, Tag, Button, Modal } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import swal from "sweetalert";
import { GetComic, DeleteComicByID } from "../../services/http";
import { ComicsInterface } from "../../interfaces/IComics";
const DataComic: React.FC = () => {
  const columns: ColumnsType<ComicsInterface> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "image",
      render: (text, record, index) => (
        <img
          src={record.Image}
          className="w3-left w3-circle w3-margin-right"
          width="50%"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "category",
      render: (item) => Object.values(item.Name),
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "description",
    },
    {
      title: "URL",
      dataIndex: "Url",
      key: "url",
      render: (text,record,index) =>(
        <a href={record.Url}><button className="btn btn-info">Download PDF</button></a>
        ),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space direction="horizontal">
          {/* <NavLink to="/AddProduct"> */}
          <Button
            onClick={() => navigate(`/EditProduct/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"large"}
          />
          {/* </NavLink> */}
          <Button type="primary" onClick={() => showModal(record)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const navigate = useNavigate();
  const [comics, setComics] = useState<ComicsInterface[]>([]);

  //Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getComics = async () => {
    let res = await GetComic();
    if (res) {
      setComics(res);
    }
  };

  const showModal = (val: ComicsInterface) => {
    setModalText(`คุณต้องการลบเรื่อง "${val.Title}" หรือไม่ ?`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteComicByID(deleteId);
    if (res) {
      setOpen(false);
      swal("Thank you!", `คุณลบหนังสือการ์ตูนสำเร็จแล้ว.`, "success");
      getComics();
    } else {
      setOpen(false);
      swal("Error!", `คุณลบหนังสือการ์ตูนไม่สำเร็จ.`, "error");
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getComics();
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex justify-start w-100 bg-base-200">
        <div className="bg-base-200 w-100 h-screen mr-10">
          <TabAdmin />
        </div>
        <div className="bg-base-200 w-100 items-center h-screen">
          <div className="text-center text-4xl pt-8 text-black">Comics</div>
          <div className="card w-full bg-base-100 shadow-lg m-auto my-10">
            <div className="mt-5">
              <Table columns={columns} dataSource={comics} />
            </div>
            <Modal
              title="ลบข้อมูล ?"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>{modalText}</p>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
export default DataComic;
