import React, { useState } from "react";
import "./TaskManagement.css";
import { Grid, Button } from "@mui/material";
import InputField from "common/InputField";
import SelectBox from "common/SelectBox";
import InputDate from "common/InputDate";
import MultipleDragList from "./component/TaskDND";
import { v4 as uuidv4 } from "uuid";

function TaskManagement() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  const date = yyyy + "-" + mm + "-" + dd;

  const [form, setForm] = useState({
    name: "",
    stage: "Backlog",
    priority: "High",
    deadline: date,
    id: uuidv4(),
  });
  const [errorName, setErrorName] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = {
      id: uuidv4(),
      ...form,
      [name]: value,
    };
    setForm(updatedForm);
  };

  function onValidation() {
    setErrorName("");
    const { name } = form;
    const result =
      taskList.length === 0
        ? []
        : taskList.filter((word) => word.name === name);
    if (name === "") {
      setErrorName("Please Enter Name");
    } else if (result.length > 0) {
      setErrorName("Name Already Exist");
    } else return true;
  }

  const onSubmit = () => {
    if (onValidation()) {
      setTaskList([...taskList, form]);
      setForm({
        ...form,
        name: "",
        id: uuidv4(),
      });
    }
  };

  const deleteFun = (value) => {
    const filteredPeople = taskList.filter((e) => e.id !== value);
    setTaskList(filteredPeople);
  };

  const editFun = (value) => {
    const result = taskList.filter((word) => word.name === value.name);
    console.log(result.length)
    if (result.length > 1) {
      alert("Name Already Exist");
    } else if (value.name === "") {
      alert("Please Enter Name");
    } else {
      const newState = taskList.map((obj) =>
        obj.id === value.id
          ? {
              ...obj,
              name: value.name,
              priority: value.priority,
              deadline: value.deadline,
            }
          : obj
      );
      setTaskList(newState);
    }
  };
  return (
    <div className="main-div-taskMan">
      <Grid container className="grid-1">
        <Grid item xs={11} className="child-grid-1">
          <InputField
            req={"No"}
            label="Name"
            name="name"
            value={form.name}
            onChange={handleFormChange}
          />
          <p style={{ color: "red" }}>{errorName}</p>
          <Grid item xs={12} className="child-grid-1">
            <span className="task-lable">Stage</span>
            <SelectBox
              name="stage"
              defaultValue={"Backlog"}
              value={form.stage}
              onChange={handleFormChange}
              items={["Backlog", "To Do", "Ongoing", "Done"]}
            />
          </Grid>
          <Grid item xs={12} className="child-grid-1">
            <span className="task-lable">Priority</span>
            <SelectBox
              name="priority"
              label="Priority"
              defaultValue={"High"}
              value={form.priority}
              onChange={handleFormChange}
              items={["High", "Medium", "Low"]}
            />
          </Grid>
          <Grid item xs={12} className="child-grid-1">
            <span className="task-lable">Dealine</span>
            <InputDate
              name="deadline"
              onChange={handleFormChange}
              value={form.deadline}
              // defaultValue={date}
            />
          </Grid>
          <Grid className="button-grid">
            <Button className="task-submit-button" onClick={onSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="grid-2">
        <MultipleDragList
          taskList={taskList}
          deleteFun={deleteFun}
          editFun={editFun}
        />
      </Grid>
    </div>
  );
}

export default TaskManagement;
