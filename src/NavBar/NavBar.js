import React from 'react';
import Logo from './Logo';
import Menu from 'react-burger-menu/lib/menus/slide';
import styles from './hamburgerStyles'


const NavBar = ({routeChange, signedIn, signOut}) => {
  return ( 
    <span>
      <div className='bg-black' style= {{width: "100", position: "sticky", top: "0"}}> 
        <nav className='flex justify-between bb b--white-10'>
          <span className='flex items-center'><Logo routeChange={routeChange}/></span>
        </nav>
      </div>
      <Menu right burgerButtonClassName='top-1 right-2 h1 w1' styles={styles}> 
      <h2 className='underline mt0 white'>Menu</h2>
      <a
      style={{outline: 'none'}} 
      className='link hover-red f4 fw6 db white mb4 pointer'
      onClick={() => routeChange('landingPage')}
      >
        {`Home `} &#127968;
      </a>
      <a 
      style={{outline: 'none'}} 
      className='link hover-red f4 fw6 db white mb4 pointer'
      onClick={() => routeChange('catalog')}
      >
        {` Catalog`} &#128218;
      </a>
      {(signedIn) &&
        <a  
        style={{outline: 'none'}} 
        className='link hover-red f4 fw6 db white mb4 pointer'
        onClick={() => routeChange('catalog')}
        >
          {`MyTexts`} &#128394;&#65039;
        </a>}
        {(!signedIn) ?
        <a   
        className='link hover-red f4 fw6 db white mb3 pointer'
        onClick={() => routeChange('signin')}
        >
          {`Sign In`} &#128100;
        </a>
        :
        <a  
        className='link hover-red f4 fw6 db white mb3 pointer'
        onClick={() => {
          signOut();
          routeChange('landingPage');
        }}
        >
        {`Sign Out`} &#128100;
        </a>
      }
      </Menu>
    </span>
  );
}
export default NavBar;