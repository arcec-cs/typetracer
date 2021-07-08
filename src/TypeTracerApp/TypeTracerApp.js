import React, { Component } from 'react';
import './TypeTracerApp.css';
import Page from './Page/Page'
import InputBar from './InputBar/InputBar'
import TitleSaveBar from './TitleSaveBar/TitleSaveBar'
import RegisterSignIn from '../RegisterSignIn/RegisterSignIn'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal'; 

class TypeTracerApp extends Component {
  constructor(props) {
    super(props);

    //used on login/not login. tId made state for onSaveProgress
    this.tId = undefined;
    this.title = '';

    //needed when logged in/ made state for onSaveProgress
     this.uId = this.token = undefined;

    //update progress states
    this.progressTimerId = undefined;
    this.progressLastSent = undefined;  
    
    //have to load text from AWS 3S /TypeTracerDB 
    this.text = {}; //holds paginated book
    this.furthestIndexStore = {page: 1, para: 0, sen: 0, c_start: 0} //keeps track of furthest progress, fetched from Ttracer db
     
    //states used to manipulate page
    this.textOnPage = undefined; //will consist of already typed text and text the user is typing
    this.indexer = {page: 1, para: 0, sen: 0, c_start: 0}; //keeps track of typing postion in book
    this.isInputCorrect = true; // says if textInput matches expected input, not state bc changes before & with textInput state already
    
    //this.saveId=1;
    this.state = { 
      textInput: '',
      isInitError: '',
      isModalOpen: false
    };
  }

  componentDidMount(){   
    this.initTypeTracer();
  }

  componentWillUnmount(){
    clearInterval(this.progressTimerId); //clean up
  }

  async initTypeTracer() {
    //get id and title of text selected,
    const textSelected = JSON.parse(sessionStorage.ttTextSelected);
    const tId = this.tId = textSelected.id;
    this.title = textSelected.title//.slice(0,25) + '...';
    //set this.uId and this.token if logged in
    let uId, token;
    if(sessionStorage.ttUser) {
       uId = this.uId = JSON.parse(sessionStorage.ttUser).uId;
       token = this.token = JSON.parse(sessionStorage.ttUser).accessTokenInfo.accessToken;
    }
    
    const fetchAndStoreText = () => 
      fetch(`https://guarded-mesa-72235.herokuapp.com/text/${tId}`)
      .then(res=> {
        this.bytes = Number(res.headers.get('content-length')) + 2000;
        // if(res.ok) return res.json();
        console.log('FETCH TEXT METHOD')
        if(res.ok) return res.json() // 2000 byte buffer
        else throw new Error('unable to fetch text'); //worst case
      })
      .then(text => {
        console.log(" ADDING TO LS")
        try{
          //check for SMIndex ,if it exsists append new text/ if not create with new text
          if(localStorage.storageManagmentIndex) { // append to index
            let SMI = JSON.parse(localStorage.storageManagmentIndex);
            SMI[tId] = {
              lastAccessed: Date.now().toString(),
              bytes: this.bytes.toString()
            }
            localStorage.storageManagmentIndex = JSON.stringify(SMI);
          } 
          else { // dne create index
            localStorage.storageManagmentIndex= JSON.stringify({
            [tId]:{
              lastAccessed: Date.now().toString(),
              bytes: this.bytes.toString()
            }
            });
          }
          localStorage[`ttText${this.tId}`] = text; //attempt to add text to local storage
          //console.log('Added', this.tId)
          return JSON.parse(text); //SMIndex success, return text
        }catch { // local storage is full
          //console.log("LS IS FULL! ALLCATING SPACE")
          // user SMI to remove the texts in localStorage with the oldest access times until there is enough space
          const SMI = JSON.parse(localStorage.storageManagmentIndex); // no need check, if error here then corrupted
          const spaceNeeded = this.bytes;
          let spaceMade = 0; 
          const sMIndexArr = Object.entries(SMI); //[ [tid,{la:,bytes}],[...],... }]
          const sortedAccessSMI =  sMIndexArr.sort((a, b) => (a[1].lastAccessed > b[1].lastAccessed) ? 1 : -1);// sort by lastAccessed decending
          //console.log("unsorted",sMIndexArr)
          //console.log('sorted',sortedAccessSMI)
          for(let i=0; spaceMade < spaceNeeded; i++) { //remove form LS until enough space
            const textRemovingBytes = sortedAccessSMI[i][1].bytes;
            delete SMI[sortedAccessSMI[i][0]]; //remove from index [i][0] is prop name
            console.log("NUM REMOVED", sortedAccessSMI[i][0])
            localStorage.removeItem(`ttText${sortedAccessSMI[i][0]}`); //if smi dne will just give undefined
            spaceMade = spaceMade + textRemovingBytes;
          }
          localStorage.storageManagmentIndex = JSON.stringify(SMI); //update to current SMI
          try { //space made for text with smi values
            //console.log('SMI SPACE APLLIED, TRYING TO ADD TO LS')
            localStorage[`ttText${this.tId}`] = text; //attempt to add
            return JSON.parse(text);
          }
          catch { // if storageManagmentIndex is corrupted and still not enough space, use naive solution
            //console.log("SMI FAILURE! DUMP LS")
            localStorage.clear(); //just clear so we can have an okay SMI eventually
            localStorage[`ttText${this.tId}`] = text; //add
            localStorage.storageManagmentIndex= JSON.stringify({
              [tId]:{
                lastAccessed: Date.now().toString(),
                bytes: this.bytes.toString()
              }
              });
            return JSON.parse(text); //SMIndex success, return text
          }
        }
      })
  
    const fetchProgress = () => 
      fetch(`https://guarded-mesa-72235.herokuapp.com/myTexts/progress/${tId}`, {headers:{'Authorization': `bearer ${this.token}`}})
      .then(res=> {
        if(res.ok) return res.json();
        else {console.log("error"); throw new Error('unable to fetch text');}//worst case
      }) // ret progress index
    
    const setSaveProgressInterval = () =>  //Updates progress at an interval if progress was made
      this.progressTimerId = setInterval(() => this.onProgressSave(), 30000); 
    
    const addToMyTexts = () => //Makes Record, do here to ensure sequence between record making and progress fetching, progress in record. 
      fetch(`https://guarded-mesa-72235.herokuapp.com/myTexts/${tId}`, {method: 'POST', headers:{'Authorization': `bearer ${token}`}})
      .then(res=> { if(!res.ok) throw new Error('unable to add to MyTexts'); }); //worst case
    
    try{
      //Check isLoggedIn - fetchProgress; Check isTextInLocalStorage- fetchText; 
      if(uId) {//Logged in
        await addToMyTexts(); //ensure that the current tId and uId has a record on the table
        if(!localStorage[`ttText${tId}`]) { //NOT in local storage 
        console.log("logged in NOT in local storage")
        //fetch in parallel
        const promises = [fetchAndStoreText(), fetchProgress()]; 
        const [text, progress] = await Promise.all(promises);
        //set text and progress
        this.text = text;
        this.furthestIndexStore = progress
        this.indexer = Object.assign({}, this.furthestIndexStore)
        } else { //In local storage
          console.log("logged In in local storage")
          this.text = JSON.parse(localStorage[`ttText${tId}`]);
          this.furthestIndexStore = await fetchProgress()
          this.indexer = Object.assign({}, this.furthestIndexStore)
          //set Storage Management Index last accessed so we know 
          if(localStorage.storageManagmentIndex){
            const SMI =  JSON.parse(localStorage.storageManagmentIndex)
            SMI[tId].lastAccessed =  Date.now().toString();
            localStorage.storageManagmentIndex = JSON.stringify(SMI);
          }
        }
        setSaveProgressInterval(); //set interval to update logged in user progress in the backend
      }else {//NOT Logged In
        if(!localStorage[`ttText${tId}`]) {this.text = await fetchAndStoreText(); console.log(`NOT logged In  NOT in local storage`)} //NOT in local storage 
        else {//in local storage
          //set Storage Management Index last accessed so we know 
          if(localStorage.storageManagmentIndex){
            const SMI =  JSON.parse(localStorage.storageManagmentIndex)
            SMI[tId].lastAccessed =  Date.now().toString();
            localStorage.storageManagmentIndex = JSON.stringify(SMI);
          }
          this.text = JSON.parse(localStorage[`ttText${tId}`]); 
          console.log("NOT logged In in local storage")
        };
      }
    
      //Special case:Check for logging in from modal, so progress is saved for signedin/registerd users
      const isLoggingInFromModal = this.furthestIndexStoreNotLoggedIn;
      if(isLoggingInFromModal) { //shall save users not logged in progress if it is greater than their fetched progress
        
        const fetchedP = Object.values(this.furthestIndexStore)
        const NotLoggedInP = Object.values(this.furthestIndexStoreNotLoggedIn)
        let isNotLoggedInFurthest;
        for(let i=0; i<4; i++) { //iterate to see which is furthest, break after unequvilancy bc indexes high to low
          if(NotLoggedInP[i] != fetchedP[i]) {
            if(NotLoggedInP[i] > fetchedP[i]) {isNotLoggedInFurthest = true; break;} 
            else isNotLoggedInFurthest = false; break;
          }// stay undefined if same 
        }
        if(isNotLoggedInFurthest) { //users progress is further than fet
          this.furthestIndexStore = Object.assign({}, this.furthestIndexStoreNotLoggedIn);
          delete this.furthestIndexStoreNotLoggedIn; //dont need
          this.indexer = Object.assign({}, this.furthestIndexStore)
          this.onProgressSave();
        } 
      }   
      this.numOfPages = Object.keys(this.text).length; // so we know when to stop indexing
      //IF END OF TEXT
      if(this.furthestIndexStore.page > this.numOfPages ){ //on Finished text, furthestpage is out of bounds, will never trigger furthest page anymore
        // reset indexes from furthest indexes to already completed page indexes
        this.indexer.para = this.indexer.sen = this.indexer.c_start = 0; //dont need this, but here for saftey.
        this.indexer.page = this.indexer.page -1 ; 
      } 
      //Build Current page and render it
      this.toIndexerPage();
      //console.log(this.textOnPage)
      this.setState({}); //to get to re-render with initState
    }catch(err){console.log(err); this.setState({isInitError:true})}
  }

  onProgressSave = (isManualSave) => {
    if(!sessionStorage.ttUser) return this.openSignRegisterInModal();

    const auto = () => !isManualSave ? 'Auto ' : ''; // let user know about auto save
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': `bearer ${this.token}`,
        'Content-Type' : 'application/json' 
      },
    };
    //values passed down to TitleSaveBar to indicate saving progress 
    const setSaveStatusIndicator = (statusMsg) => { 
      this.isSaving = false; //removes loader
      this.saveStatus = statusMsg; //success or failure of fetch
      this.saveAnimationRefresh = !this.saveAnimationRefresh;//toggles between duplicate animations
      this.setState({});//set state  
    }
    //isSaving is a boolean to render the loader, gets falisfied on promise return or manually saving with no progress
    this.isSaving = true; 
    //if progress was made save it 
    if(JSON.stringify(this.furthestIndexStore) !== JSON.stringify(this.progressLastSent)) {
      options.body =  JSON.stringify({progress: this.furthestIndexStore}) //set progress a time of call
      fetch(`https://guarded-mesa-72235.herokuapp.com/myTexts/progress/${this.tId}`, options)
      .then(res=> {
        if(res.ok) {
          setSaveStatusIndicator(`${auto()}Saved`)
          setTimeout(()=>this.progressLastSent =  Object.assign({}, this.furthestIndexStore)) //doesnt need to be sync
        } //set state to rerender w/ message
        else {setSaveStatusIndicator('Not Saved')}
      })
      .catch(()=> {setSaveStatusIndicator('Not Saved')})
    } 
    else { //no progress to save, dont need loader, 
      this.isSaving = false;  
      if(isManualSave) { //despite nothing to save render saved so user know thier progress is saved
        this.saveAnimationRefresh = !this.saveAnimationRefresh;
        this.saveStatus=`${auto()}Saved`;
      }  else return 0; // no need to setState if not manual save
    } 
    this.setState({}); //so loader may be rendered if progress fetch is occuring/ savedStatus can be rendered if isManualSave
  }

  onTextInputChange = (event) => { //pubclassfeild syntax sets on method instance/ normal func on prototype
    const indexer = this.indexer;

    //check user input word by word; a word is "word" + " "
    const userInput = event.target.value;
    const expectedInput = this.text[indexer.page][indexer.para][indexer.sen].slice(indexer.c_start, indexer.c_start + userInput.length);
    const isInputCorrect = userInput == expectedInput; 

    this.isInputCorrect = isInputCorrect;//passed down to set styles on current word being typed
    //console.log(`userInput: ${userInput} | expectedInput  ${expectedInput} ; isCorrect: ${isInputCorrect}`);
    (isInputCorrect && this.isEndOfWord(userInput)) ? this.nextWord(userInput)
    : this.setState({textInput: userInput});
  }

  nextWord = (input) => {
    this.setIndexes(input);
    this.setState({textInput: ''});
  }

  isEndOfWord(input) { // 
    const inputIsEndOfWord = input.includes(" ");
    const inputIsEmpty = (input == ''); //beginning of a word
    return (!inputIsEmpty && inputIsEndOfWord ? true : false);  
  }
  setIndexes(input) { // called for newWord
    const fIndex = this.furthestIndexStore;
    const indexer = this.indexer;
    const text = this.text;
   
    //already passed conditon for new word. move to starting index
    indexer.c_start = indexer.c_start + input.length;  
    if(indexer.page == fIndex.page) fIndex.c_start = indexer.c_start;
   
    //index markers
    const indexEOSen = text[indexer.page][indexer.para][indexer.sen].length - 1;
    const isEOSen = (indexer.c_start > indexEOSen); // c_start was indexed past sentence bounds of the sentence
    //console.log(`page: ${indexer.page} para:${indexer.para} sen:${indexer.sen} `)
    //if End Of significant text, figure out which case and set this.indexer/ add to textOnPage
    if(isEOSen) { 
      
      //EO index markers 
      const indexEOPara = text[indexer.page][indexer.para].length - 1; 
      const indexEOPage = text[indexer.page].length -1;
      //EO boolean
      const isEOPara = (indexer.sen == indexEOPara); //at the last sentence of para
      const isEOPage = (indexer.para == indexEOPage); // at last paragraph of page

      //Check Cases: we always set indexes, if on furthest page we also append to the page.
      if(!isEOPara) { //end of sentence in a paragraph but not the last one
        //console.log("EOS")
        indexer.sen = indexer.sen + 1; //increment EO
        //reset indexes
        indexer.c_start = 0; 
        //If Furthest, Append Sen: next sentence of para
        if(indexer.page == fIndex.page) {
          this.textOnPage[indexer.para].push(this.text[indexer.page][indexer.para][indexer.sen]);
          fIndex.c_start = 0
          fIndex.sen = indexer.sen; 
        }
      } 
      else if(isEOPara && !isEOPage) { //at last sentence in paragraph
        //console.log("EOPara")
        //IF END OF TEXT END OF TEXT CHECK
        if(indexer.page === this.numOfPages && indexEOPage-1 === indexer.para){ //current text has [] at end of it
          //reset indexes to beginning of page as an already typed page is
          indexer.para = indexer.sen = indexer.c_start = 0; 
          // fIndex out ouf bounds on pages, means that the book has ended
          if( fIndex.page === indexer.page) { // if first time completeing last page
          fIndex.c_start = fIndex.sen = fIndex.para = 0
          fIndex.page = this.numOfPages + 1;
          this.onProgressSave() 
          }
          return 0;
        } 
        indexer.para = indexer.para + 1; //increment EO 
        //reset indexes
        indexer.c_start = indexer.sen = 0; 
        //Append Para: init and add first sen
        if(indexer.page == fIndex.page) { //if furthest page we write to it 
          this.textOnPage.push([]); // init next para
          //console.log()
          this.textOnPage[indexer.para].push(this.text[indexer.page][indexer.para][indexer.sen]);
          fIndex.c_start = fIndex.sen = 0
          fIndex.para = indexer.para;
        }
      }
      else if(isEOPara && isEOPage) {
        //console.log("EOPage")
        //reset incrementors to begining of page upon completion
        indexer.para = indexer.sen = indexer.c_start = 0;
        //if Unlocked next page!Increment furthest index store to begining of next page
        if(indexer.page == fIndex.page){//if furthest page
          fIndex.page++;
          fIndex.para = fIndex.sen = fIndex.c_start = 0;
        } 
      }   
    }  
  }

  onPageFlip = (event) => {
    let indexer = this.indexer;
    const buttonId = event.currentTarget.id; //currentTarget points to where handler is bound
    //inc/dec indexer, Number() added bc sometimes would coercion would occur
    indexer.page = (buttonId == 'Next' ? (Number(indexer.page) + 1) : (indexer.page - 1));
    this.toIndexerPage() //move to indexer page
  }

  onPageNumberInputHandler = (event) => { //validates input, moves to next page if valid/
    //set pageInput, if submit need to get input element, else value in event target
    let pageInput;
    if(event.type=== 'submit'){    
      const input = event.target.querySelector('input');//target is form, get input 
      pageInput = input.value;
    }else pageInput = event.target.value;//for onBlur
    
    //indexes
    const indexer = this.indexer; 
    const fIndex = this.furthestIndexStore;
    
    //input validation functions
    const isNum = () => /^\d+$/.test(pageInput); //atleast on num
    const isNotCurrentPage = () => pageInput!==indexer.page;
    const isInRange = () =>  pageInput <= fIndex.page && pageInput > 0;
    const isInputValid = () => (isNum() && isNotCurrentPage() && isInRange());
    
    //if input valid then go to page inputted
    if(isInputValid()){
      indexer.page = pageInput;//set since valid
      this.toIndexerPage()
    } 
    document.getElementById("PageNumberInput").reset();// restores forms default vals, clears input
    event.preventDefault();// to prevent onSubmit of form refreshing the page.
  }

  //sets indexes and prepares page content based on if it is the last page or a page that has alredy been typed
  toIndexerPage() { 
    const indexer = this.indexer; 
    const fIndex = this.furthestIndexStore;
    const isLastPage = indexer.page === fIndex.page; 
      if(isLastPage) { 
        this.furthestPageBuilder(); //build part of the page which was typed
        indexer.c_start = fIndex.c_start;//set indexer to furthestIndexes, progress on the furthest page
        indexer.sen = fIndex.sen;
        indexer.para = fIndex.para;
      } else { //already typed whole page, render whole page and start at begining
        this.textOnPage = this.text[indexer.page];
        indexer.c_start = indexer.sen = indexer.para = 0; //reset indexes to beginning of page 
      } 
      this.setState({textInput: ''});//ReRender new page, reset text input
  }

  furthestPageBuilder() {
    //reset textOnPage
    this.textOnPage = [];
    const fIndex= this.furthestIndexStore;
    //Build:iterate though para and sen of the page to get to furthest indexes and store in textOnPage
    for(let p = 0; p <= fIndex.para; p++) {
      this.textOnPage.push([]); //init new para array
      let senEnd = (p == fIndex.para) ? fIndex.sen // add only written setence of the furthest paragraph
      : this.text[fIndex.page][p].length -1; //add all sentences of already written paragraphs
      for(let s = 0; s <= senEnd; s++) {
        this.textOnPage[p].push(this.text[fIndex.page][p][s]);
      }
    }
  }

  getPageDisplay(){
    const indexer = this.indexer;
    const loader = <span className='tc h-page'><Loader type="ThreeDots" color="#000000" height={80} width={80} timeout={20000}/></span>;
    if(this.state.isInitError === true) return (
      <div className='h-page tc pt4'>
        <h1 className='mv0'>{'oops, something went wrong :('}</h1>
      </div>);
      
    if(this.textOnPage) return <Page 
      text={this.textOnPage}
      isCorrect={this.isInputCorrect}
      paraCur={indexer.para}
      senCur={indexer.sen}
      charStart={indexer.c_start}
      charEnd={indexer.c_start + this.state.textInput.length}/>
    else return (<div className='h-page tc pt4'>{loader}</div>);
   }
   //modal methods
   openSignRegisterInModal(){ this.setState({isModalOpen: true}); }
   onCloseModal = () => this.setState({isModalOpen: false});
   onSigninRegisterSuccess = () => {
     // save current progress, so we can compare this with users logged in progress
     this.furthestIndexStoreNotLoggedIn =  Object.assign({}, this.furthestIndexStore);  
     this.initTypeTracer(); //
     this.onCloseModal();
   }

  render() {
    const indexer = this.indexer;
    const page = this.getPageDisplay()

    const closeIcon = (
      <svg height="32px" viewBox="0 0 24 24" width="32px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
    );
    const registerSignInModal = () => 
    <Modal closeIcon={closeIcon} open={this.state.isModalOpen} onClose={this.onCloseModal} center classNames={{modal: 'customModal'}}> 
      <h2 className='tc'>Sign In/Register to save your progress!</h2>
      <RegisterSignIn routeChange={this.onSigninRegisterSuccess} registerOrSignIn={this.props.onRegisterOrSignIn} signOut={this.props.onSignOut}/>
    </Modal>
    // console.log(this.furthestIndexStore)
    // console.log(indexer)
    // console.log(this.furthestIndexStore) 
    //console.log(`text: ${this.textOnPage} isC: ${this.isInputCorrect} para: ${indexer.para} sen: ${indexer.sen} charS: ${indexer.c_start} charE: ${indexer.c_start + this.state.textInput.length}`)  
    return (
      <div className = 'h-navOffset flex justify-center'>
        <div className='mt3 mh3 w-custom w-custom-m w-custom-l'> 
          {!sessionStorage.ttUser && registerSignInModal()}
          <TitleSaveBar
          title={this.title}
          progressSave={this.onProgressSave}
          isSaving={this.isSaving}
          saveStatus={this.saveStatus} 
          animationRefresher={this.saveAnimationRefresh}
          />
          {page}
          <InputBar
            hasNextButton={indexer.page < this.furthestIndexStore.page && indexer.page < this.numOfPages}
            hasLastButton={indexer.page != 1}
            onButtonClick={this.onPageFlip} 
            textInput={this.state.textInput} 
            onTextInputChange={this.onTextInputChange}
            currentPage={indexer.page}
            furthestPage={this.numOfPages?(this.furthestIndexStore.page<this.numOfPages)? this.furthestIndexStore.page: this.numOfPages: '1'}
            onPageNumberInputHandler={this.onPageNumberInputHandler}
            canTypeText={(this.textOnPage)? true: false}
          />
        </div>
      </div>
    );
  }
}
 
export default TypeTracerApp;