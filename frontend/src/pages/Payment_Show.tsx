import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
// import moment from "moment";
import PaymentIcon from "@mui/icons-material/Payment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import moment from "moment";
import { GetPayment } from "../services/http";

import { PaymentInterface } from "../interfaces/IPayment";

function Payment_Show() {
  const [payment, setPayment] = React.useState<PaymentInterface[]>([]);

  // ฟังก์ชันโหลดข้อมูล Payment จาก API
  const getPayment = async () => {
    let res = await GetPayment();
    if (res) {
      setPayment(res);
    }
  };
  useEffect(() => {
    getPayment();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
      width: 200,
      headerAlign: "center",
      align: "center",
      // valueFormatter: (params) => params.value.id,
    },
    {
      field: "Basket",
      headerName: "ยอดรวม",
      width: 300,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => params.value.Total,
    },
    {
      field: "Date",
      headerName: "วันที่ชำระสินค้า",
      width: 300,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        moment(params.row.Date).format("YY-MM-DD HH:mm:ss"),
    },
    {
      field: "Status",
      headerName: "สถานะ",
      width: 350,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => params.value.Status,
    },
  ];

  return (
    <>
      <Header />
      <Navbar />
      <div className="h-screen p-14">
        <Container maxWidth="lg">
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                className="text-center"
                variant="h3"
                color="rgb(57, 78, 106)"
                gutterBottom
              >
                History Payments
              </Typography>
            </Box>
            <Box sx={{ paddingX: 1, paddingY: 0 }}>
              <Button
                component={RouterLink}
                to="/Cart"
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
              >
                กลับ
              </Button>
            </Box>
          </Box>
          <div
            style={{
              height: 400,
              width: "100%",
              marginTop: "20px",
              background: "white",
            }}
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

export default Payment_Show;