import React from "react";
import './LandingPage.css'
import catalog from './asset/catalog.svg'
import signIn from './asset/signIn.svg'
import bookList from './asset/bookList.js'
import ReactRotatingText from 'react-rotating-text';

const LandingPage = ({routeChange}) => {

  const isCardClickable = () => { //card is only clickable when it is large min w 60em. rem is used for sizing in Tachyons. 
    let computedRemSize = window.getComputedStyle(document.getElementsByTagName("HTML")[0]).fontSize;//rem dependent on browsers so compute
    computedRemSize = computedRemSize.slice(0,2) // get rid of px
    return (computedRemSize * 60 <= window.innerWidth) //return if screen is currently large
  }
  
  return (
      // 100vh so CardContainer occupy remaining viewport on s/m devices; minHeight so children dont overlap on horizontal resize for m display 
      <div name='PageContainer' className='flex flex-column items-center h-navOffset h-min-landing'>
        <header name='LPHeader' className='w-90 w-80-ns tc mb4-nl' >
          <h2 className='f4 f3-m f2-l'>{'Typetracer - The destination to type classic works from cover to cover'}</h2>
          <h3 className='f6 f5-l'>{'Practice typing while enjoying from a selection of over 280 of the Public Domain\'s best texts:'}</h3>
          <div className='f5 f3-ns'><ReactRotatingText items={bookList}/></div>
        </header>
        {/* h-100-nl takes up 100 percent of remaining view port for s/m devices*/}
        <section name='CTACardContainer' className={`'
          flex flex-column justify-around h-80 
          w-80-ns 
          flex-l flex-row-l justify-center-l
        '`}>
          {/*Both cards same except Sign up has xtra margins: 1st line, could make Component to keep dry*/} 
          <div 
            name='CardSignUp' 
            className={`'
            max-mr-10-l   
            flex justify-between pa-3 bg-black br3 ba shadow-5 b--black-10 
            justify-around-m min-h10-m mw-7h-m
            h-35-nl mh3-nl
            flex-column-l justify-center-l min-h20-l w-35-l h-75-l  mw8 grow-l pointer-l hover-bg-gray-l self-center-l
          '`}
            onClick={() => (isCardClickable()) && routeChange('signin')}
          >
            <div className='flex flex-column justify-around items-center tc ma2 ml1'>
              <h5 className='f5 f4-m f3-l mb2 mb3-m mt0 mb4-l white'>{'Sign up to save progress:'}</h5>
              <button 
              className='f6 grow no-underline outline-0 br-pill ph3 ph4-m pv3 mb2 black b bg-white hover-bg-red pointer dn-l'
              onClick={() => routeChange('signin')}
              >
                {'Sign In'}
              </button>
            </div>
            <img className='white tc ma2 mr1 mr2-ns mw4 mw5-m mw-100-l h-75-l' src={signIn} 
            alt={'Person saving their TypeTracer progress by Signing Up'}/>
          </div>
          <div 
            name='CardCatalog' 
            className={`'
            flex justify-between pa-3 bg-black br3 ba shadow-5 b--black-10 
            justify-around-m min-h10-m mw-7h-m
            h-35-nl mh3-nl
            flex-column-l justify-center-l min-h20-l w-35-l h-75-l mw8 grow-l pointer-l hover-bg-gray-l self-center-l
          '`}
            onClick={() => (isCardClickable()) && routeChange('catalog')}
          >
            <div className='flex flex-column justify-around items-center ma2 ml1'>
              <h5 className='f5 f4-m f3-l tc mb2 mb3-m mb4-l mt0 white'>{'Check out our catalog:'}</h5>
              <button 
              className='f6 grow no-underline tc br-pill ph3 ph4-m pv3 mb2 black b bg-white hover-bg-red pointer dn-l'
              onClick={() =>  routeChange('catalog')}
              >
                {'Our Catalog'}
              </button>
            </div>
            <img className='white tc mw4 mw5-m mw-100-l h-75-l ma2 mr1 mr2-ns' src={catalog} 
            alt={'Person browsing books in TypeTracer\'s catalog'}/>
          </div>
        </section>
      </div>
  );
}
 export default LandingPage;
