import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Form, Upload, Select } from "antd";
import { PaymentInterface } from "../interfaces/IPayment";
import { ImageUpload } from "../interfaces/IUpload";
import { BasketInterface } from "../interfaces/IBasket";
import Swal from "sweetalert2";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { GetBasket } from "../services/http";

const { Option } = Select;

function Payment_Create() {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [profile, setProfile] = useState<ImageUpload>();
  const [basketId, setBasketId] = useState<number | null>(null);
  const [payment, setPayment] = useState<PaymentInterface>();
  const [basket, setBasket] = useState<BasketInterface[]>([]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setProfile(e?.fileList[0]);
    return e?.fileList;
  };

  const getฺBasket = async () => {
    let res = await GetBasket();
    if (res) {
      setBasket(res);
    }
  };

  async function submit() {
    if (!basketId) {
      console.error("กรุณาเลือก Basket");
      Swal.fire({
        title: "กรุณาเลือก Basket",
        icon: "error",
      });
      return;
    }
    if (!profile) {
      console.error("กรุณาอัปโหลดรูปภาพ");
      Swal.fire({
        title: "กรุณาอัปโหลดรูปภาพ",
        icon: "error",
      });
      return;
    }

    let data = {
      Date: date,
      Image: profile?.thumbUrl,
      BasketID: basketId,
      StatusID: 2,
    };

    const apiUrl = "http://localhost:8080/Payment";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "บันทึกข้อมูลสำเร็จ",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/Payment/Status";
            }
          });
        } else {
          console.log(res);
          console.log("บันทึกข้อมูลไม่สำเร็จ");
          Swal.fire({
            title: "บันทึกไม่สำเร็จ",
            icon: "error",
          });
        }
      });
  }
  useEffect(() => {
    getฺBasket();
  }, []);
  return (
    <Form className="box w-100 leading-5 my-1" onFinish={submit}>
      <h5
        className="text-lg font-bold mb-2"
        style={{ color: "rgb(57, 78, 106)" }}
      >
        เลือกวันที่โอนเงิน
      </h5>
      <Form.Item className="datepicker mb-1 text-center" name="Date">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date picker"
            value={date ? dayjs(date) : null}
            onChange={(newValue) => {
              setDate(newValue);
            }}
          />
        </LocalizationProvider>
      </Form.Item>
      <Form.Item className="basket-select mb-1 text-center" name="BasketID">
        <Select
          placeholder="เลือก BasketID"
          onChange={(value) => setBasketId(value)}
        >
          {basket.map((item) => (
            <option value={item.ID} key={item.ID}>
              {item.ID}
            </option>
          ))}
        </Select>
      </Form.Item>
      <div className="border-b border-base-300 pb-2"></div>
      <Form.Item name="Image" valuePropName="fileList">
        <h5
          className="text-lg font-bold mb-1"
          style={{ color: "rgb(57, 78, 106)" }}
        >
          อัปโหลดรูปภาพ
        </h5>
        <Upload
          maxCount={1}
          multiple={false}
          listType="picture-card"
          className="text-center"
          onChange={normFile}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>อัพโหลด</div>
          </div>
        </Upload>
      </Form.Item>
      <button type="submit" className="btn btn-neutral w-full max-w-xs">
        ยืนยันการชำระเงิน
      </button>
    </Form>
  );
}

export default Payment_Create;
