import React from 'react';
import Logo from './Logo';
import Menu from 'react-burger-menu/lib/menus/slide';
import styles from './hamburgerStyles'


const NavBar = () => {
  return ( 
    <span>
      <div className='bg-black' style= {{width: "100", position: "sticky", top: "0"}}> 
        <nav className='flex justify-between bb b--white-10'>
          <span className='flex items-center'><Logo/></span>
        </nav>
      </div>
      <Menu right burgerButtonClassName='top-1 right-2 h1 w1' styles={styles}> 
        <a id='catalog' href='catalog' style={{outline: 'none'}} className='link hover-red f4 fw6 db white mb3'>&#128218;{` Catalog`}</a>
        <a id='signIn' href='signIn' className='link hover-red f4 fw6 db white mb3'>&#128100;{` SignIn`}</a>
      </Menu>
    </span>
  );
}
export default NavBar;