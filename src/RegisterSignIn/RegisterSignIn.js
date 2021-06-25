import React from 'react';
import jwt from 'jsonwebtoken'

class RegisterSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.formInfo={
      email:'',
      password:'',
      name:''
    };

    this.state={
      isSignInForm: true
    };
  }

  onOtherFormClick = () => {
    this.setState(state => ({isSignInForm: !state.isSignInForm})); //falisfy value
  }

  onEmailChange=(event)=>{
    this.formInfo.email = event.currentTarget.value;
  }

  onPasswordChange=(event)=>{
    this.formInfo.password = event.currentTarget.value;
    console.log(this.formInfo.password)
  }

  onNameChange=(event)=>{
    this.formInfo.name = event.currentTarget.value;
  }

  onSubmit = () => {
    const path = (this.state.isSignInForm) ? 'signIn' : 'register';
    const body = {
      email: this.formInfo.email,
      password: this.formInfo.password,
    }//add name for register
    if (!this.state.isSignInForm) body.name = this.formInfo.name; 
    fetch(`http://localhost:3005/${path}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response => {
      if(response.status === 200){
        response.json().then(user => { //strings only in sessionStorage
          const accessToken = user.accessToken;
          const payload = jwt.decode(accessToken)
          // set in session storage
          sessionStorage.ttUser = JSON.stringify( {
            uId: payload.user.id,
            name: payload.user.name,
            createdAt: payload.user.created_at,
          });
          sessionStorage.accessTokenInfo = JSON.stringify({
            accessToken: accessToken,
            expires:payload.exp
          })
          this.props.registerOrSignIn(); //let App component know that we are SignedIn
          this.props.routeChange('myTexts');
        })
      }else { // notify user for failure
        response.json().then(e => alert(e));
      }
    })
  }

  render() {
    console.log(this.state.isSignInForm)
    const thisForm = (this.state.isSignInForm) ? 'Sign In' : 'Register';
    const otherForm = (!this.state.isSignInForm) ? 'Sign In' : 'Register';
    return (
      <article className='br3 ba b--black-10 mv4 w-90 w-50-m w-40-l mw6 shadow-5 center'>
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
                  />
                </div>
              }
              <div className='mt3'>
                <label className='db fw7 lh-copy f6'>Email</label>
                <input 
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black' 
                  type='email'
                  onChange={this.onEmailChange}
                />
              </div>
              <div className='mv3'>
                <label className='db fw7 lh-copy f6'>Password</label>
                <input 
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black' 
                  onChange={this.onPasswordChange} 
                  type='password'
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
          </div>
        </main>
      </article>
    );
  }
}

export default RegisterSignIn;