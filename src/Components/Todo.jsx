import React, { useEffect, useState } from "react";
import "./TodoStyle.css";

// ------Get Item from Local Storage
const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editItem, setEditItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  //--- Add items
  const addItem = () => {
    if (!inputData) {
      alert("Plz fill the Input field");
    } else if (inputData && toggleBtn) {
      setItems(
        items.map((curItem) => {
          if (curItem.id === editItem) {
            return { ...curItem, name: inputData };
          }
          return curItem;
        })
      );
      setToggleBtn(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
    }
    setInputData("");
  };

  // ----Add item Input change
  const onChangeHandler = (e) => {
    setInputData(e.target.value);
  };

  //----- Edit items
  const editHandler = (index) => {
    const updateName = items.find((curItem) => {
      return curItem.id === index;
    });
    setInputData(updateName.name);
    setEditItem(index);
    setToggleBtn(true);
  };

  //----- Delete items
  const deleteHandler = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  //---- Remove all items
  const removeAllHandler = () => {
    setItems([]);
  };

  // ---- set Item to LocalStorage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <React.Fragment>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.png" alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
            <p style={{ color: "white", fontSize: "12px" }}>
              Don't Worry your Data is Store with us.
            </p>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍🏻  Add Items"
              className="form-control"
              value={inputData}
              onChange={onChangeHandler}
            />
            {toggleBtn ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* Show your Items List */}
          <div className="showItems">
            {items.map((curItem) => {
              return (
                <div className="eachItem" key={curItem.id}>
                  <h3>{curItem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editHandler(curItem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteHandler(curItem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAllHandler}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Todo;
