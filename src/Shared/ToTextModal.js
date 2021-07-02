import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const ToTextModal = ({toTextClick, title, open, onClose}) => { 
  return( 
    <Modal open={open} onClose={onClose} center>
      <div className='tc pa3'>
        <h2>{'Start TypeTracing:'}</h2>
        <h3 className='mb5'>{title}</h3>
        <button 
        style={{outline: 'none'}} 
        className='f5 tc br-pill ph4 pv3 mb2 dib white bg-black bn pointer'
        onClick={toTextClick}
        >
          {'To Typetracer App'}
        </button>
      </div>
    </Modal>
  );
}
export default ToTextModal;