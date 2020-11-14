import React, { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import './App.css';
import { instructions } from './technique';
import Timer from './timer/Timer';

const App = () => {
  const [state, setState] = useState({ isTimerStarted: false, time: 0 });

  useEffect(() => {
    if (state.isTimerStarted) {
      const timestep = 32;
      const interval = setInterval(() => {
        setState(state => ({ ...state, time: state.time + timestep }));
      }, timestep);
      return () => clearInterval(interval);
    } else {
      return () => {};
    }
  });

  let currentInstruction = null;
  let currentInstructionIndex = 0;
  instructions.forEach((instruction, index) => {
    if (instruction.startTime <= state.time) {
      currentInstructionIndex = index;
      currentInstruction = instruction;
    }
  });

  return (
    <div className="App">
      <div className="Container">
      <div className="Timer-Container">
          <Timer milliseconds={state.time}/>
        </div>

        <progress 
          max="1"
          value={(state.time - currentInstruction.startTime) / currentInstruction.duration}
          />
        <FlipMove>
          { instructions
              .filter((e, i) => i === currentInstructionIndex || i === currentInstructionIndex + 1)
              .map((instruction, i) =>
                <div
                  key={instruction.startTime}
                  className={"Instruction " + (i === currentInstructionIndex + 1 && "Next-Instruction")}
                  >
                  <h2>
                    {instruction.description}&nbsp;
                  </h2>
                  <ul className="Instructions-List">
                    {instruction.instructions.map((description, i) => 
                    <li key={i}>
                      {description.message}
                    </li> 
                    )}
                  </ul>
                </div>
          )}
        </FlipMove>

        <div className="Buttons-Container">
          <button
            className="Button"
            onClick={() => setState(state => ({ ...state, isTimerStarted: true }))}>
              Start
          </button>
          <button 
            className="Button"
            onClick={() => setState(state => ({ ...state, isTimerStarted: false }))}>
              Stop
          </button>
        </div>
      </div>
    </div>
  )
};

export default App;
