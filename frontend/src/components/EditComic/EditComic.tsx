import React, { useState, useEffect } from "react";
import { Input, Form, Select, message, InputNumber, Image, Upload, Card } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import { ComicsInterface } from "../../interfaces/IComics";
import { CategoryInterface } from "../../interfaces/ICategory";
import { ImageUpload } from "../../interfaces/IUpload";
import {
  CreateComic,
  GetCategory,
  GetComicById,
  UpdateComic,
} from "../../services/http";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log("Change:", e.target.value);
};

function ComicEdit() {
  const navigate = useNavigate();

  const [category, setCategory] = useState<CategoryInterface[]>([]);
  const [comic, setComics] = useState<ComicsInterface>();
  const [image, setImage] = useState<ImageUpload>();

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinnish = async (values: ComicsInterface) => {
    values.Image = image?.thumbUrl;
    values.ID = comic?.ID;
    console.log(values);
    let res = await UpdateComic(values);
    if (res.status) {
      swal("Thank you!", `แก้ไขข้อมูลหนังสือการ์ตูนสำเร็จ.`, "success");
      setTimeout(function () {
        navigate("/DataComic");
      }, 2000);
    } else {
      swal("Error!", `แก้ไขข้อมูลหนังสือการ์ตูนไม่สำเร็จ.`, "error");
    }
  };
  const getCategories = async () => {
    let res = await GetCategory();
    if (res) {
      
      setCategory(res);
    }
  };
  const getComicById = async () => {
    let res = await GetComicById(Number(id));
    if (res) {
      setComics(res);
      console.log(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        Title: res.Title,
        Description: res.Description,
        Url: res.Url,
        Price: res.Price,
        CategoryID: res.CategoryID,
      });
    }
  };

  useEffect(() => {
    getCategories();
    getComicById();
  }, []);

  const normImage = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setImage(e?.fileList[0]);
    return e?.fileList;
  };

  return (
    <>
      <Form onFinish={onFinnish} form={form}>
        <div className="flex mt-3">
          <div className="contents">
            <div className="ml-4  w-80 ">
              <Form.Item
                name="Title"
                label="Title"
                rules={[{ required: true, message: "กรุณาใส่ชื่อเรื่อง !" }]}
              >
                <Input placeholder="Tile Comic...." />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="contents">
            <div className="ml-4 w-80 ">
      
            //////
                <Image
                      src={comic ? comic.Image : ""}
                      width={450}
                      className="object-cover rounded-lg lg:w-full"
                    ></Image>
                    //////

              <Form.Item
                name="CategoryID"
                label="Category"
                rules={[{ required: true, message: "กรุณาเลือกประเภท !" }]}
              >
                <Select className="ml-4 ">
                  {category.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex ">
          {/* <div className="ml-8 ">Description: </div> */}
          <div className="contents">
            <div className="ml-4 w-80">
              <Form.Item
                name="Description"
                label="Description"
                rules={[{ required: true, message: "กรุณาใส่รายละเอียด !" }]}
              >
                <TextArea
                  style={{ height: 120, resize: "none" }}
                  onChange={onChange}
                  placeholder="Description Comic...."
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* <div className="ml-8 mr-5">URL :</div> */}
          <div className="contents">
            <div className="ml-4  w-80">
              <Form.Item
                name="Url"
                label="Url"
                rules={[{ required: true, message: "กรุณาใส่ URL !" }]}
              >
                <Input placeholder="URL Comic...." />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* <div className="ml-8 mr-3">Price :</div> */}
          <div className="contents">
            <div className="ml-4  w-70">
              <Form.Item
                name="Price"
                label="Price"
                rules={[{ required: true, message: "กรุณาใส่ราคา !" }]}
              >
                <InputNumber placeholder="Price Comic...." />
              </Form.Item>
            </div>
          </div>
          <div className="flex-1 ml-3">Baht.</div>
        </div>

        <div className="flex">
          {/* <div className="ml-8 mr-2">Image : </div> */}
          <div className="contents">
            <div className="ml-4  w-80">
              {/* <Form.Item name="Image" label="Image" >
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-md w-full max-w-xs"
                  
                />
              </Form.Item> */}
              <Form.Item
                name="Image"
                label="Image"
                valuePropName="fileList"
                getValueFromEvent={normImage}
                rules={[{ required: true, message: "กรุณาใส่รูป !" }]}
              >
                <Upload maxCount={1} multiple={false} listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="card-actions ml-12 mt-3">
          <Form.Item>
            <button className="btn  btn-outline btn-success  w-full max-w-xs">
              Add Products
            </button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

export default ComicEdit;
