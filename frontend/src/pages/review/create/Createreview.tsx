import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header";
import Navbar from "../../../components/Navbar";
import { CreateReview,GetReview } from "../../../services/http";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Layout } from "antd";
import { Input } from "antd";
import { Rate } from "antd";
import {  Form } from "antd";
import { ReviewInterface } from "../../../interfaces/lReview";
import { GetReviewById ,GetComicById} from "../../../services/http";
import {  useParams } from "react-router-dom";
import { ComicsInterface } from "../../../interfaces/IComics";



function Createreview() {
  const navigate = useNavigate();
    let { id } = useParams();
 const [form] = Form.useForm();

   const [review,setReview] = useState<ReviewInterface>();
   const [comic ,setComic]  = useState<ComicsInterface>();
   const onFinish = async (values: ReviewInterface) => {
   console.log(values);
   values.ComicID = comic?.ID;
   values.ID = review?.ID;
    let res = await CreateReview(values);
    
    if (res.status) {
      swal("Success", "รีวิวเรียบร้อย", "success");
      setTimeout(function () {
        navigate("/Myreview");
      }, 2000);
    } else {
      swal("Error", "ลงไม่ใด้", "error");
    }

  };

  const getReviewById = async () => {
    let res = await GetReviewById(Number(id));
    if (res) {
      setReview(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
      
      ComicID: res.number,
      Comment: res.Comment,
      RatingID: res.RatingID,
  
       
      });
    }
  };
  const getComicByID = async () => {
    let res = await GetComicById(Number(id))
    setComic(res)
  }
  useEffect(() => {
    
    getReviewById();
    getComicByID();
  }, [id]);

 

  const { TextArea } = Input;
  const {  Content, Footer } = Layout;



  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Header1 />
        <Navbar />
        <Layout className="layout flex justify-center items-center h-screen bg-base-200 w-100">
          <div className="card w-96 p-6  bg-base-100 shadow-lg flex flex-col gap-y-1.5">
            <h1 className="text-3xl  mb-4 ">เขียนรีวิว</h1>
            <Content style={{ padding: "0 50px" }}>
              <div className="site-layout-content ">
                <h2>มังงะชื่อ xxx</h2>
                <p>ให้คะแนนและรีวิวสินค้าที่ท่านสั่งซื้อ:</p>
                <Form.Item name="RatingID">
                <Rate/>
                </Form.Item>
                <p>รายละเอียดรีวิว</p>
                <Form.Item name="Comment">
                  <TextArea
                    rows={4}
                    placeholder="คุณมีความคิดเห็นเกี่ยวกับมังงะเรื่องนี่อย่างไร"
                    className="mb-4"
                  />
                </Form.Item>
                <Form.Item>
                  <button className="btn btn-primary" >Submit</button>
                </Form.Item>
              </div>
            </Content>
          </div>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Form>
    </>
  );
}

export default Createreview;
