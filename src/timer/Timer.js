import React from 'react';
import "./Timer.css";

const pad = (num) => 
  num < 10 ? '0' + num : '' + num;

const Timer = ({ milliseconds }) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = pad(Math.floor(milliseconds / 1000) % 60);
  const centiseconds = pad(Math.floor(milliseconds / 10) % 100);
  return (
    <div className="Timer">
      <span className='Big-Time'>{minutes > 0 ? `${minutes}:` : null}</span>
      <span className='Big-Time'>{seconds}</span>
      &nbsp;{centiseconds}
    </div>
  );
};

export default Timer;