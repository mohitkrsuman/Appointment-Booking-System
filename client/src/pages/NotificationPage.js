import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMarkAllRead = async() => {
     try{
         dispatch(showLoading());
         const res = await axios.post("/api/v1/user/get-all-notification", { userId : user._id }, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
            }
         });
         dispatch(hideLoading());

         if(res.data.success){
             message.success(res.data.message);
         }else{
             message.error(res.data.message);
         }
     }catch(error){
        dispatch(hideLoading());
        console.log(error);
        message.error("Something went wrong")
     }
  };

  const handleDeleteAllRead = async() => {
     try{
         dispatch(showLoading());
         const res  = await axios.post('/api/v1/user/delete-all-notification', { userId : user._id}, {
            headers : {
               Authorization : `Bearer ${localStorage.getItem('token')}`,
            }
         });
         dispatch(hideLoading());
         if(res.data.success){
            message.success(res.data.message);
         }else{
            message.error(res.data.message);
         }
     }catch(error){
        console.log(error);
        message.error("Someting went wrong");
     }
  };
  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs className="p-4">
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end">
            <h6 className="p-2 icon" onClick={handleMarkAllRead}>
              Mark all read
            </h6>
          </div>
          {user?.notification.map((notificationMgs) => {
            return (
              <div className="card p-3 m-2">
                <div
                  className="card-text"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  {notificationMgs.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h6 className="p-2 icon" onClick={handleDeleteAllRead}>
              Delete all read
            </h6>
          </div>
          {user?.seenotification.map((notificationMgs) => {
            return (
              <div className="card p-3 m-2">
                <div
                  className="card-text"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  {notificationMgs.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
