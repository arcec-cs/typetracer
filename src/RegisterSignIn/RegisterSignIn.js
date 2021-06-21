import React from 'react';

class RegisterSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.formInfo={
      email:'',
      password:'',
      name:''
    };

    this.state={
      isSignIn: true
    };
  }

  onOtherFormClick = () => {
    this.setState(state => ({isSignIn: !state.isSignIn})); //falisfy value
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


  render() {
    console.log(this.state.isSignIn)
    const thisForm = (this.state.isSignIn) ? 'Sign In' : 'Register';
    const otherForm = (!this.state.isSignIn) ? 'Sign In' : 'Register';
    return (
      <article className='br3 ba b--black-10 mv4 w-90 w-50-m w-40-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>{`${thisForm}`}</legend>
              {(!this.state.isSignIn) && 
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