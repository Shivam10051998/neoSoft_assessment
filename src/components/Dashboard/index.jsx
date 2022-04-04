import React from "react";
import "./Dashboard.css";
import { Box } from "@mui/material";

function Dashboard() {
  const dataArray=[{text:'Total Task',no:5},
  {text:'Total Completed Task',no:3},
  {text:'Total Pending Task',no:2}
  ]
  return (
    <div className="dash-main-div">
      <span className="dash-tittle">Task Details</span>
      {dataArray.map((item,i) => (
         <Box className="box" mt={2} key={i}>
         <h1 className="task-tittle">{item.text} : {item.no}</h1>
       </Box>
        ))}
      <Box className="box" mt={2}>
        <a href="TaskManagement" className="add-more-task">Add More Task {'=>'}</a>
      </Box>
    </div>
  );
}

export default Dashboard;
