import React from "react"
import { isEmpty } from 'ramda'
import fetchJson from './fetchJson'
import ErrorBoundary from './ErrorBoundary'

class Get extends React.Component  {

  state = {
    id: '',
  }

  handleInputChagne = (e) => {
    this.setState({
      id: e.target.value
    })
  }

  getUrl = () => {
    if (isEmpty(this.state.id)) {
      return 'http://localhost:3030/api/todo'
    } else {
      return `http://localhost:3030/api/todo/${this.state.id}`
    }    
  }

  handleSubmit = async (e) => {
    // e.preventDefault()
    try {
      const { setData } = this.props
      const url = this.getUrl()
      const r1 = await fetchJson(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      console.log('SUCCESS');
      console.log('r1', r1)
      const r2 = await r1.json()
      console.log('r2', r2);
      setData(r2)
    } catch (e) {
      console.log('FAILURE');
      console.log('ERROR:', e)
    }
  }


  render() {
    console.log('get render')
    
    return (
      <ErrorBoundary>
        <input
          type='text'
          value={this.state.id}
          onChange={this.handleInputChagne}
          placeholder='empty for all or _id'
        />
        <button
          onClick={this.handleSubmit}
        >GET</button>
      </ErrorBoundary>
    )
  }
}

export default Get


/*

<form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.id}
          onChange={this.handleInputChagne}
          placeholder='empty for all or _id'
        />
        <input
          type='submit'
          value='GET'
        />
      </form>

*/