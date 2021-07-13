import React from 'react';

const TextInput = ({value, textInputChange, styles, canType}) => {
  const maxLength = () => canType ? '1000' : '0';
  const scrollToCurrentWord = () => //check current word not null i.e at start of app
    document.getElementById('currentWord') && document.getElementById('currentWord').scrollIntoView({behavior: 'smooth'});  
  return(  
    <input 
      autoFocus
      className={"input-reset ba b--black-20 pa2 db w-34 border-box"} 
      value={value} 
      onChange={textInputChange}
      style={styles}
      maxLength = {maxLength()} 
      onFocus={scrollToCurrentWord} 
      onTouchEnd={scrollToCurrentWord}
    />
  );
};
//document.getElementById('currentWord').scrollIntoView({behavior: "smooth", alignToTop: "true"})
export default TextInput;