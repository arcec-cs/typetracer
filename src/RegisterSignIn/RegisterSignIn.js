import React from 'react';
import jwt from 'jsonwebtoken';
import BetaSignInCard from './BetaSignInCard'; 


class RegisterSignIn extends React.Component {
  constructor(props) {
    super(props);
    
    this.state= {
      email:'',
      password:'',
      name:'',
      isSignInForm: true
    };
  }

  onOtherFormClick = () => //falisfy value, reset form
    this.setState(state => ({isSignInForm: !state.isSignInForm, email: '', password: '', name: ''}));
  
  onEmailChange=(event) => this.setState({email: event.currentTarget.value})
  
  onPasswordChange=(event) => this.setState({password: event.currentTarget.value})
  
  onNameChange=(event) => this.setState({name: event.currentTarget.value});
  
  onSubmit = () => {
    //simple front end test to catch most obvious errors
    if(!/^\S+@\S+$/.test(this.state.email)) { alert('Please Enter a Valid email'); return 0; }
    
    //max/min password length/ front end check checking here and not restricting maxLength to not confuse user bc dots.
    if(this.state.password.length > 45 || this.state.password.length < 8) {
      alert('Your Password must contain in-between 8 and 45 characters'); 
      return 0;
    }
    //set body
    const body = {
      email: this.state.email,
      password: this.state.password,
    }
    if (!this.state.isSignInForm) body.name = this.state.name; //set register form
    //fetch 
    const path = (this.state.isSignInForm) ? 'signIn' : 'register';
    fetch(`https://guarded-mesa-72235.herokuapp.com/${path}`, { //fetch jwt token
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response => {
      if(response.status === 200){ //if success
        response.json().then(resObj => { //get access token, extract payload, set sessionStorage
          this.accessTokenHandler(resObj);
          this.props.registerOrSignIn(); //let App component know that we are SignedIn
          this.props.routeChange('myTexts');
        })
      }else { // notify user for failure
        response.json().then(e => alert(e));
      }
    })//network error, either Server is down or user isnt connected to the internet. 
    .catch(()=> alert("We are having trouble reaching Typetracer, :( please check your internet connection"));
  }

  accessTokenHandler(resObj) {
    //get acces token data
    const accessToken = resObj.accessToken;
    const payload = jwt.decode(accessToken)
    console.log("P", payload)
    const accessTokenExpTime = (payload.exp * 1000 - Date.now());
    const accessTokenExpWarningTime = accessTokenExpTime - 15000; //give a warining about logout 
    //set in session storage
    sessionStorage.ttUser = JSON.stringify({
      uId: payload.user.id,
      name: payload.user.name,
      createdAt: payload.user.created_at,
      accessTokenInfo:{
        accessToken: accessToken,
        expires:payload.exp
      },
      accessTimers: { //Only Access Tokens and not Refresh Tokens have been implmented; Inform User
        accessEnd: setTimeout(()=> {
          alert("Your Session has ended :( Please Re-SignIn if you wish to continue")  
          this.props.signOut(); //Sign user out since Access token has expired          
          }, accessTokenExpTime),
        accessWarning: setTimeout(()=> {
          alert("Your Session will end in 15 Minutes, Please Sign Out then Sign In to Renew your session :)");
        }, accessTokenExpWarningTime)
      }
    });
  }

  render() {
    console.log(this.state.isSignInForm)
    const thisForm = (this.state.isSignInForm) ? 'Sign In' : 'Register';
    const otherForm = (!this.state.isSignInForm) ? 'Sign In' : 'Register';
    return (
      <article className='br3 ba b--black-10 mv4 w-90 w-50-m w-40-l mw6 shadow-5 center bg-white'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>{`${thisForm}`}</legend>
              {(!this.state.isSignInForm) && 
                <div className='mt3'>
                  <label className='db fw7 lh-copy f6'>Name</label>
                  <input 
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black' 
                    type='text'
                    onChange={this.onNameChange}
                    maxLength='40'
                    value={this.state.name}
                  />
                </div>
              }
              <div className='mt3'>
                <label className='db fw7 lh-copy f6'>Email</label>
                <input 
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black' 
                  type='email'
                  onChange={this.onEmailChange}
                  maxLength='150'
                  value={this.state.email}
                />
              </div>
              <div className='mv3'>
                <label className='db fw7 lh-copy f6'>Password</label>
                <input 
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black' 
                  onChange={this.onPasswordChange} 
                  type='password'
                  maxLength='50'
                  value={this.state.password}
                  onKeyPress={(e)=> (e.key === 'Enter') && this.onSubmit()}
                />
              </div>
            </fieldset>
            <div className='flex justify-between'>
              <input 
                className='b ph3 pv2 input-reset ba b--black white bg-black hover-bg-gray grow pointer f6 dib' 
                type='submit' 
                value={`${thisForm}`}
                onClick={this.onSubmit}
              />
              <p onClick={this.onOtherFormClick} className=' underline f5 link dim black db pointer dib'>{`${otherForm}`}</p>
            </div>
          {(this.state.isSignInForm) &&  
            <BetaSignInCard click={()=>this.setState({email:'test@test.com', password:'password'})}/>
          }   
          </div>
        </main>
      </article>
    );
  }
}

export default RegisterSignIn;