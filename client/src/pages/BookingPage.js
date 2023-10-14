import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer" + " " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
     
      if(!date && !time){
         return alert("Date & Time required");
      }

      dispatch(showLoading());


      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          userId: user._id,
          doctorId: params.doctorId,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailiability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availiability",
        { doctorId: params.doctorId, date: date, time: time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h2 className="text-center m-3">Book your appointment</h2>
      <div className="container">
        {doctors && (
          <div className="mt-3 p-3">
            <h5 className="text-center">
              Dr. {doctors.firstName} {doctors.lastName}
            </h5>
            <p>
              <b>Fees</b> : {doctors.feesPerCunsaltation}
            </p>
            <p>
              {/* <b>Timings</b> : {doctors.timings[0]} - {doctors.timings[1]} */}
            </p>

            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD:MM:YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"))
                }}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"))
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailiability}
              >
                Check Availiability
              </button>

              {/*  isavialiable button  */}
    
                <button
                  className="btn btn-success mt-2"
                  onClick={handleBooking}
                >
                  Book Now
                </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
