import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import {
  GetPayment,
  DeletePaymentByID,
  UpdatePayment,
  GetStatus,
} from "../services/http";
import { PaymentInterface } from "../interfaces/IPayment";
import { StatusInterface } from "../interfaces/IStatus";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";

function Payment_UD() {
  const navigate = useNavigate();
  // สร้าง state สำหรับจัดเก็บข้อมูล Payment
  const [payment, setPayment] = useState<PaymentInterface[]>([]);
  //สร้าง state เก็บค่า edit
  const [editpayment, seteditPayment] = useState<Partial<PaymentInterface>>({});
  // สร้าง state สำหรับจัดเก็บข้อมูล Status
  const [statuses, setStatus] = useState<StatusInterface[]>([]);
  // สร้าง state สำหรับเก็บ ID ที่จะใช้ในการลบ
  const [deleteId, setDeleteId] = useState<Number>();
  // สร้าง state สำหรับเก็บ ID ที่จะใช้ในการลบ
  // const [editId, setEditId] = useState<number | undefined>();
  // สร้าง state สำหรับตรวจสอบสถานะการโหลดข้อมูล
  const [confirmLoading, setConfirmLoading] = useState(false);
  // สร้าง state สำหรับเปิดหรือปิด Dialog
  const [DeletePopupOpen, setDeletePopupOpen] = useState(false);
  // สร้าง state สำหรับเปิดหรือปิด Dialog
  const [EditPopupOpen, setEditPopupOpen] = useState(false);

  // สร้าง state สำหรับเปิดหรือปิด Popup รูปภาพ
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  // สร้าง state สำหรับเก็บ URL รูปภาพที่ถูกเลือก
  const [selectedImage, setSelectedImage] = useState("");

  const [selectedStatus, setSelectedStatus] = useState<string | number | null>(
    null
  );

  // ฟังก์ชันโหลดข้อมูล Payment จาก API
  const getPayment = async () => {
    let res = await GetPayment();
    if (res) {
      setPayment(res);
    }
  };

  // ฟังก์ชันโหลดข้อมูล Status จาก API

  const getStatus = async () => {
    let res = await GetStatus();
    if (res) {
      setStatus(res);
    }
  };

  // ฟังก์ชัน Delete ลบข้อมูล
  const handleDelete = async () => {
    const res = await DeletePaymentByID(deleteId);
    if (res) {
      setDeletePopupOpen(false);
      Swal.fire({
        title: "ลบข้อมูลสำเร็จ",
        icon: "success",
      });
      getPayment(); // โหลดข้อมูลใหม่หลังจากลบ
    } else {
      setDeletePopupOpen(false);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        icon: "error",
      });
    }
  };
  // ฟังก์ชัน Edit แก้ไขข้อมูล
  const handleEdit = () => {
    let updateData = {
      ID: editpayment.ID,
      BasketID: editpayment.BasketID,
      Date: editpayment.Date,
      Image: editpayment.Image,
      StatusID: selectedStatus,
    };
    console.log(updateData);
    const apiUrl = `http://localhost:8080/Payment`;
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setEditPopupOpen(false);
          Swal.fire({
            title: "แก้ข้อมูลสำเร็จ",
            icon: "success",
          });
          getPayment();
        } else {
          setEditPopupOpen(false);
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            icon: "error",
          });
        }
      });
  };

  // ฟังก์ชันเรียกใช้เมื่อคลิกที่รูปภาพ
  const handleImageClick = (imageUrl: any) => {
    setSelectedImage(imageUrl);
    setImagePopupOpen(true);
  };

  // ฟังก์ชันแสดง Modal ยืนยันการลบ
  const handelDeleteClick = (val: PaymentInterface) => {
    setDeleteId(val.ID);
    setDeletePopupOpen(true);
  };

  const handelEditClick = (val: PaymentInterface) => {
    // setEditId(val.ID);
    seteditPayment({
      ID: val.ID,
      BasketID: val.BasketID,
      Date: val.Date,
      Image: val.Image,
      // Status_id: val.Status_id,
    });
    setEditPopupOpen(true);
  };

  // กำหนดคอลัมน์ของตาราง
  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Basket",
      headerName: "ยอดรวม",
      width: 200,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => params.value.Total,
    },
    {
      field: "Date",
      headerName: "วันที่ชำระสินค้า",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        moment(params.row.Date).format("YY-MM-DD HH:mm:ss"),
    },
    {
      field: "Status",
      headerName: "สถานะ",
      width: 200,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => params.value.Status,
    },
    {
      field: "Image",
      headerName: "หลักฐานการโอน",
      width: 139,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleImageClick(params.row.Image)}
          >
            Click
          </Button>
        );
      },
    },
    {
      field: "edit",
      headerName: "แก้ไข",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() => handelEditClick(params.row as PaymentInterface)}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "ลบ",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => handelDeleteClick(params.row as PaymentInterface)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  // โหลดข้อมูล Payment เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    getPayment();
    getStatus();
  }, []);

  return (
    <>
      {/* Popup แสดงรูปภาพหลักฐานการโอน */}
      <Dialog
        open={imagePopupOpen}
        onClose={() => setImagePopupOpen(false)}
        // onClose={handleCloseImagePopup}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>รูปภาพหลักฐานการโอน</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="หลักฐานการโอน"
            style={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setImagePopupOpen(false)}
          >
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
      {/* Popup เปลี่ยน Status */}
      <Dialog
        open={EditPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Status</DialogTitle>
        <DialogContent>
          <div>
            <FormControl sx={{ m: 1, width: 350 }}>
              <InputLabel id="demo-multiple-name-label">Status</InputLabel>
              <Select
                input={<OutlinedInput label="Status" />}
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
              >
                {statuses.map((item) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPopupOpen(false)} color="primary">
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
            disabled={confirmLoading}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>

      {/* Popup แสดง Modal ยืนยันการลบ */}
      <Dialog open={DeletePopupOpen} onClose={() => setDeletePopupOpen(false)}>
        <DialogTitle>ยืนยันการลบรายการ</DialogTitle>
        <DialogContent>
          <DialogContentText>คุณต้องการลบข้อมูลหรือไม่?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletePopupOpen(false)} color="primary">
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDelete}
            disabled={confirmLoading}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
      <Header />
      <Navbar />
      <div className="h-screen p-14">
        <Container maxWidth="lg">
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography className="text-center" variant="h3" gutterBottom>
                History Payments
              </Typography>
            </Box>
            <Box sx={{ paddingX: 1, paddingY: 0 }}>
              <Button
                component={RouterLink}
                to="/AddProduct"
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
              >
                กลับ
              </Button>
            </Box>
          </Box>
          <div
            className="bg-base-100"
            style={{ height: 400, width: "100%", marginTop: "20px" }}
          >
            <DataGrid
              rows={payment}
              getRowId={(row) => row.ID}
              columns={columns}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
export default Payment_UD;