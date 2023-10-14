import React, { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  //get doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // antd table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return <span>{record.firstName + " " + record.lastName}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="d-flex">
            {record.status === "pending" ? (
              <button
                className="btn btn-success"
                onClick={() => handleAccountStatus(record, "approved")}
              >
                Approve
              </button>
            ) : (
              <button className="btn btn-danger">Discard</button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <h4 className="text-center m-4">Doctors List</h4>
      <Table columns={columns} dataSource={doctors}></Table>
    </Layout>
  );
};

export default Doctors;
