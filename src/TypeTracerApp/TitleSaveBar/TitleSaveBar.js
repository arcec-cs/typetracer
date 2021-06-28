import React from 'react';
import './TitleSaveBar.css';

//Contains an text overflow ellipsis title and a save button where the user can save thier progress manually
const TitleSaveBar = ({title, progressSave}) => { 
  return (
    <div name='container' className='flex justify-between content-center bb-double mb2 pb2'>
      <span id="title" className='i fw3 mr3 title-overflow f6 f5-l title self-center'>{`${title}`}</span>
      <div name='placeholder'></div>
      <button id='Next' onClick={progressSave} className="f5 black bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba pointer self-center">
        <span className=" dn di-ns pr1">Save</span>
        <svg className='center' xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
      </button>
    </div>
  )
};

export default TitleSaveBar;