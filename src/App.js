import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Message from './Components/Message'

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      messageInput: '',
      authorInput: '',
      edit: false,
    }

  }

  componentDidMount(){
    // This is where you could put an axios request to get the messages when the screen first loads
  }




  // ** This method is used by the input tag to update messageInput on State ** //
  handleMessageInput(value) {
    this.setState({
      messageInput: value
    })
  }

  handleAuthorInput(value) {
    this.setState({
      authorInput: value
    })
  }


  handleAddMessage() {
    const bodyObj = {
      authorInput: this.state.authorInput,
      text: this.state.messageInput
    }
    /* axios works just like postman but for JavaScript
    we invoke the post method and give it two arguments
    the first is the URL just like you use in postman
    and the second is the body object just like the JSON object
    that we build in postman
    */
    axios.post(`/api/message`, bodyObj)
      .then(response => {
        console.log(response);
        this.setState({
          messages: response.data
        })

      })

    this.setState({
      messageInput: '',
      authorInput: ''
    })
  }

  // this method is invoked by the "Get Messages" button
  handleGettingMessages() {
    axios.get(`/api/message`)
      .then(response => {
        console.log('get response data', response);

        this.setState({
          messages: response.data
        })

      })
  }




  render() {
    const mappedMessages = this.state.messages.map((eachMessageObj) => {

      return (
        <Message key={eachMessageObj.index} message={eachMessageObj} />
      )
    })


    return (
      <div className="App">
        {this.state.messages.length ? (
          <div>
            <div
              style={{ height: 60, width: '50vw', background: 'lightgrey', border: "1px black solid", margin: '15px auto', paddingTop: '30px' }}
            >

              <input
                onChange={(e) => this.handleAuthorInput(e.target.value)}
                value={this.state.authorInput}
                placeholder={'Add Author'}
              />
              <input
                onChange={(e) => this.handleMessageInput(e.target.value)}
                value={this.state.messageInput}
                placeholder={'Add Message'}
              />
              <button onClick={() => this.handleAddMessage()}>Add This Message</button>
            </div>
            {mappedMessages}
          </div>
        ) : (
            <button
              onClick={() => this.handleGettingMessages()}
              style={{ marginTop: '48vh', height: 70, width: 200, background: 'lightGreen', borderRadius: 15, fontSize: 24, fontWeight: 'bold' }}
            >Get Messages</button>
          )}
      </div>
    );
  }
}

export default App;
