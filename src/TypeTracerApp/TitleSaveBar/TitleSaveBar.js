import React from 'react';
import './TitleSaveBar.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

//has a text overflow ellipsis title and a save button where the user can save thier progress manually /w indicator
const TitleSaveBar = ({title, progressSave, isSaving, saveStatus, animationRefresher}) => { 
  
  let saveIndicator = '';
  let sSColor = () => (saveStatus && saveStatus.includes('Saved')) ? 'green' : 'red'; 
  
  const isInitialRender = (isSaving === undefined && animationRefresher === undefined);
  if(!isInitialRender){
    if(isSaving) saveIndicator = <Loader type='ThreeDots' color='#00BFFF' height={25} width={25}/>
    else if(!animationRefresher) saveIndicator = <span className = {'hideMe'}>{`${saveStatus}`}</span>
    else if (animationRefresher) saveIndicator = <span className = {'hideMe2'}>{`${saveStatus}`}</span>
  }
  
  return (
    <div name='container' className='flex justify-between content-center bb-double mb2 pb2'>
      <span id="title" className='i fw3 mr2 title-overflow f6 f5-l title self-center'>{`${title}`}</span>
      <div name='placeholder'></div>
      <div className = 'flex'>
        <span id='saveStatus' className={`self-center i fw3 ph3-ns ph2 tc ${sSColor()}`}>
          {saveIndicator} 
        </span>
        <button 
        id='Next' 
        onClick={() => progressSave(true)} 
        className='f5 black bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba pointer self-center'
        >
          <span className='dn di-ns pr1'>{'Save'}</span>
          <svg className='center' height='18px' viewBox='0 0 24 24' width='18px' fill='currentColor'>
            <path d='M0 0h24v24H0V0z' fill='none'/>
            <path d='M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z'/>
          </svg>
        </button>
      </div>
    </div>
  )
};

export default TitleSaveBar;