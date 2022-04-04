import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import ArrowForwardIosTwoToneIcon from "@mui/icons-material/ArrowForwardIosTwoTone";
import Modal from "common/Modal";
import InputField from "common/InputField";
import SelectBox from "common/SelectBox";
import { Grid } from "@mui/material";
import InputDate from "common/InputDate";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function MultipleDragList(props) {
  const [columns, setColumns] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [modalTittle, setModalTittle] = useState("");

  useEffect(() => {
    const backLog = props.taskList.filter((word) => word.stage === "Backlog");
    const toDo = props.taskList.filter((word) => word.stage === "To Do");
    const onGoing = props.taskList.filter((word) => word.stage === "Ongoing");
    const done = props.taskList.filter((word) => word.stage === "Done");

    const columnsFromBackend = {
      tast1: {
        name: "Backlog",
        items: backLog,
      },
      tast2: {
        name: "To Do",
        items: toDo,
      },
      tast3: {
        name: "Ongoing",
        items: onGoing,
      },
      tast4: {
        name: "Done",
        items: done,
      },
    };
    setColumns(columnsFromBackend);
  }, [props.taskList]);

  const onMove = ([valu, valu1], item, flag) => {
    const tittleArray = Object.keys(columns);
    const findIndex = Object.keys(columns).indexOf(valu);
    const nextTittle =
      tittleArray[flag === "right" ? findIndex + 1 : findIndex - 1];
    const nextName =
      Object.entries(columns)[flag === "right" ? findIndex + 1 : findIndex - 1];
    const filteredPeople = valu1.items.filter((e) => e.id !== item.id);
    const newOb = {
      ...columns,
      [valu]: {
        ...valu1,
        items: filteredPeople,
      },
      [nextTittle]: {
        ...nextName[1],
        items: [...nextName[1].items, item],
      },
    };

    setColumns(newOb);
  };

  const modalFunc = ([valu, valu1], item, col) => {
    setData({ valu, valu1, item, col });
    setModalTittle("Are You Sure Want to Delete  " + item.name + " ?");
    setModalOpen(true);
  };

  const onEdit = (item) => {
    setEditModalOpen(true);
    setData(item);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = {
      ...data,
      [name]: value,
    };
    setData(updatedForm);
    editSection()
  };
  const editSection = () => {
    return (
      <>
        <InputField
          req={"No"}
          label={<span style={{ color: "black" }}>{"Name"}</span>}
          name="name"
          value={data?.name}
          onChange={handleFormChange}
        />

        <Grid item xs={12} className="child-grid-1">
          <span style={{ color: "black" }} className="task-lable">
            Priority
          </span>
          <SelectBox
            name="priority"
            label="Priority"
            defaultValue={data?.priority}
            value={data?.priority}
            onChange={handleFormChange}
            items={["High", "Medium", "Low"]}
          />
        </Grid>

        <Grid item xs={12} className="child-grid-1">
          <span style={{ color: "black" }} className="task-lable">
            Dealine
          </span>
          <InputDate
            name="deadline"
            onChange={handleFormChange}
            value={data?.deadline}
          />
        </Grid>
      </>
    );
  };
  const onDelete = () => {
    const { valu, item, col } = data;
    const filteredPeople = col.items.filter((e) => e.id !== item.id);

    const newOb = {
      ...columns,
      [valu]: {
        name: col.name,
        items: filteredPeople,
      },
    };
    setColumns(newOb);
    props.deleteFun(item.id);
    setModalOpen(false);
  };

  const onEditData=()=>{
    props.editFun(data);
    setEditModalOpen(false);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        border: "0px solid red",
        width: "100%",
        overflowY: "scroll",
      }}
    >
      <Modal
        yesText={"Yes"}
        cancelText={"Cancel"}
        open={modalOpen}
        tittle={modalTittle}
        onYes={onDelete}
        onCancel={()=>setModalOpen(false)}
      />
      <Modal
        yesText={"Save"}
        cancelText={"Cancel"}
        open={editModalOpen}
        tittle={''}
        section={editSection()}
        onYes={onEditData}
        onCancel={()=>setEditModalOpen(false)}
      />
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 220,
                          minHeight: 150,
                          height: "100%",
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "white",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <span style={{ color: "black" }}>
                                        <strong>Name</strong> : {item.name}
                                      </span>
                                      <span style={{ color: "black" }}>
                                        <strong>Priority</strong> :{" "}
                                        {item.priority}
                                      </span>
                                      <span style={{ color: "black" }}>
                                        <strong>Deadline</strong> :{" "}
                                        {item.deadline}
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "10px",
                                        width: "100%",
                                      }}
                                    >
                                      <IconButton
                                        color="primary"
                                        disabled={
                                          column.name === "Backlog"
                                            ? true
                                            : false
                                        }
                                        onClick={() =>
                                          onMove(
                                            [columnId, column],
                                            item,
                                            "left"
                                          )
                                        }
                                      >
                                        <ArrowBackIosNewTwoToneIcon />
                                      </IconButton>

                                      <IconButton
                                        onClick={() => onEdit(item)}
                                        color="primary"
                                      >
                                        <EditIcon />
                                      </IconButton>
                                      <IconButton
                                        onClick={() =>
                                          modalFunc(
                                            [columnId, column],
                                            item,
                                            column
                                          )
                                        }
                                        color="primary"
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                      <IconButton
                                        color="primary"
                                        disabled={
                                          column.name === "Done" ? true : false
                                        }
                                        onClick={() =>
                                          onMove(
                                            [columnId, column],
                                            item,
                                            "right"
                                          )
                                        }
                                      >
                                        <ArrowForwardIosTwoToneIcon />
                                      </IconButton>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default React.memo(MultipleDragList);
