import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Get from './Get'
import Post from './Post'
import Delete from './Delete'
import UnknownEndpoint from './UnknownEndpoint'

const codeStyle = {
  color: 'white',
  textAlign: 'left'
}
class App extends React.Component {

  state = {
    data: ''
  }

  setData = (data) => {
    this.setState({
      data: data
    })
  }
  
  render() {
    console.log('app render');
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Get setData={this.setData} />
          <Post setData={this.setData} />
          <Delete setData={this.setData} />
          <UnknownEndpoint />
          <div>
            <pre style={codeStyle}>
              {JSON.stringify(this.state.data, null, 4)}
            </pre>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
