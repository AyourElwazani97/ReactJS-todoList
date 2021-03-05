import React, { useState, useEffect } from "react";
import "./style.scss";
import { motion } from 'framer-motion';
import { FaCheck, FaClock, FaTrash } from "react-icons/fa";
function App() {
  const [arraList, setArraList] = useState([]);
  const [task, setTask] = useState("");
  const [taskDate,setTaskDate] = useState(false);
  var id = Math.random() * 2000;
  var myListDate = new Date();
  var currentDate = myListDate.toUTCString();
  const handleMyClick = () => {
    setArraList([...arraList, { task, id, currentDate }]);
    setTask("");
  };
  console.log(arraList)
  const refInput = React.useRef();
  useEffect(() => {
    refInput.current.focus();
  });
  const FilteredList = (id) => {
    setArraList(arraList.filter((eee) => eee.id !== id));
  };
  function handleErros() {
    if (task.length === 0) {
      return null;
    } else if (task.length < 8) {
      return <i>Task must contain at least 8 caracters *</i>;
    } else {
      return null;
    }
  }
  return (
    <div className="App">
      <div className="sylish__Mine">
        <h1>Todo List One</h1>
        {arraList.map((eee, index) => {
          return (
            <div key={index} className="data_got">
              <ul>
                <motion.li
                    initial={{opacity:0,scale:0,y:-200}}
                    animate={{opacity:1,scale:1,y:0}}
                    transition={{delay:1,duration:2,type:'spring',stiffness:130}}
                >
                  <div>
                    <span id="first_Letter">
                      <p>{eee.task}</p>
                      {
                        taskDate ? 
                        <span>{eee.currentDate}<FaClock/></span>
                        :
                        null
                      }
                    </span>
                  </div>
                  <div className="my__delete_verify__Spans">
                    <motion.span className="spans__Color_It"
                      initial={{opacity:0,scale:0,x:-200}}
                      animate={{opacity:1,scale:1,x:0}}
                      transition={{delay:2,type:'spring',stiffness:100}}
                      onClick={() => {
                        setTaskDate(!taskDate)
                      }}
                    >
                      <FaCheck />
                    </motion.span>
                    <motion.span
                      onClick={() => {
                        FilteredList(eee.id);
                      }}
                      className="spans__Color_It"
                      initial={{opacity:0,scale:0,x:-200}}
                      animate={{opacity:1,scale:1,x:0}}
                      transition={{delay:2,type:'spring',stiffness:100}}
                    >
                      <FaTrash />
                    </motion.span>
                  </div>
                </motion.li>
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
              <span>{handleErros()}</span>
            </div>
            <div>
              <input
                disabled={task === "" || task.length < 8}
                type="submit"
                value="Add"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
