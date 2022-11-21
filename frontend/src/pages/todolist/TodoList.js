import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TodoList() {
  let navigate = useNavigate();
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");
  const [editvalue, setEditValue] = useState("");
  const [addFlag, setAddFlag] = useState("true");
  const [showFlag, setShowFlag] = useState(false);

  function logout() {
    localStorage.setItem("auth", false);
    navigate("/");
    localStorage.removeItem("auth");
  }

  useEffect(() => {
    async function displayList() {
      const response = await fetch("http://localhost:5000/list/listId");
      const result = await response.json();
      console.log(result)
      setList(result);
    }

    displayList();
  }, [addFlag]);

  const addItem = () => {
    console.log(value)
    const listitem = { item: value };
    console.log(listitem)
    setAddFlag(!addFlag);
    fetch("http://localhost:5000/list/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listitem),
    })
      .then((response) => response.json());
  };

  const deleteItem = (index) => {
    setAddFlag(!addFlag);
    fetch(`http://localhost:5000/list/remove/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json());
  };

  const editItem = (indexvalue) => {
    setIndex(indexvalue);
    setShowFlag(!showFlag);
  };

  const editSubmit = (e) => {
    console.log(index);
    fetch(`http://localhost:5000/list/edit/${index}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({item:editvalue}),
    }).then((response) => response.json());
    setShowFlag(!showFlag);
    setAddFlag(!addFlag);
  };
  return (
    <>
      <Button variant="text" onClick={logout}>
        Log Out
      </Button>
      <div className="App">
        <div className="buttons">
          <TextField
            id="outlined-basic"
            value={value}
            label="Enter task name"
            variant="outlined"
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={addItem}> Add </Button>
          {showFlag && (
            <div className="form">
              <TextField
                id="name"
                value={editvalue}
                onChange={(e) => setEditValue(e.target.value)}
                label="Enter new task"
                variant="outlined"
              />
              <Button onClick={(e) => editSubmit(e)}>Edit</Button>
            </div>
          )}
        </div>
        <ol>
          {list.length > 0 &&
            list.map((item, i) => (
              <li>
                {item.item}{" "}
                {!showFlag && (
                  <Button onClick={() => deleteItem(item.id)}>Remove</Button>
                )}
                <Button onClick={() => editItem(item.id)}>Edit</Button>
              </li>
            ))}
        </ol>
      </div>
    </>
  );
}

export default TodoList;
