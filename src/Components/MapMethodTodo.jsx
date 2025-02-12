import { startTransition, useState } from "react";
import "./MapMethodTodo.css";

export default function MapMethodTodo() {
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const [changebutton, setChangebutton] = useState(false);
  const [Indexkey, setIndexkey] = useState(0);
  const [localIndex, setlocalIndex] = useState(0);
  const doAddtext = (input) => {
    setTodo(input);
  };

  const doSavetodo = () => {
    let olddata = data;
    olddata.push(todo);

    localStorage.setItem(`name${localIndex}`, todo);
    setlocalIndex(localIndex + 1);
    setTodo("");
  };

  const doEditTodo = (input) => {
    if (todo === "") {
      setChangebutton(true);
      var newInd = [...data];
      setTodo(newInd[input]);
      console.log(input);

      setIndexkey(input);
    } else {
      let newdata = [...data];
      let newValue = todo;
      console.log(newValue);
      newdata[input] = newValue;
      setData(newdata);
      setTodo("");
      setChangebutton(false);
    }
  };
  const doUpdateText = () => {
    let input = Indexkey;

    let newdata = [...data];
    let newValue = todo;
    console.log(newValue);
    newdata[input] = newValue;
    setData(newdata);
    setTodo("");
    setChangebutton(false);
    localStorage.setItem(`name${input}`, newValue);
  };
  {
    console.log(localStorage.getItem("name"));
  }
  return (
    <div className="todos-container">
      <h2>Todo List</h2>
      <div className="input-section">
        <input
          type="text"
          onChange={(e) => doAddtext(e.target.value)}
          value={todo}
          placeholder="Enter a task"
        />
        {changebutton ? (
          <button onClick={doUpdateText} className="add-button">
            Update
          </button>
        ) : (
          <button onClick={doSavetodo} className="add-button">
            Add
          </button>
        )}
      </div>

      {data.length > 0 && (
        <ul className="todo-list">
          {data.map((value, ind) => {
            return (
              <li key={ind} className="todo-item">
                <span>{value}</span>
                <div className="button-group">
                  <button
                    className="delete-button"
                    onClick={() => {
                      setData(data.filter((item) => item !== value));
                      localStorage.removeItem(`name${ind}`);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => doEditTodo(ind)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
