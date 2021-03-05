import React, { useState, useEffect } from "react";
import "./style.scss";
import {FaCheck, FaTrash} from 'react-icons/fa';
function App() {
  const [arraList, setArraList] = useState([]);
  const [task, setTask] = useState("");
  var id = Math.random()*2000;
  var myListDate = new Date();
  const handleMyClick = () => {
    setArraList([...arraList, { task,id,myListDate }]);
    setTask("");
  };
  const refInput = React.useRef();
  useEffect(() => {
    refInput.current.focus();
    localStorage.setItem('arraList',JSON.stringify(arraList))
  });
  const FilteredList = (id) => {
    //var data = Math.random()/100;
    setArraList(arraList.filter(eee => 
       eee.id !== id
    ))
  };
  return (
    <div className="App">
      <div className="sylish__Mine">
        <h1>Todo List One</h1>
        {arraList.map((eee,index) => {
          return (
            <div key={index} className="data_got">
              <ul>
                <li>
                  <div>
                  <span id='first_Letter'><p>{eee.task}</p></span>
                  </div>
                  <div className='my__delete_verify__Spans'>
                    <span className='spans__Color_It'><FaCheck/></span>
                    <span onClick={
                      () => {FilteredList(eee.id)}
                      } className='spans__Color_It'><FaTrash/></span>
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return handleMyClick();
            }}
          >
            <div>
              <label htmlFor="task">Task</label>
              <input
                type="text"
                ref={refInput}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="What do you need to do ?"
                name="task"
                id="task"
              />
            </div>
            <div>
              <input disabled={ task === "" ||task.length < 8} type="submit" value="Add" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
