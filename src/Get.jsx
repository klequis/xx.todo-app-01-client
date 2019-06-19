import React from "react"
import { isEmpty } from 'ramda'
import fetchJson from './fetchJson'

class GetForm extends React.Component  {

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
    const { setData, setError } = this.props
    try {
      e.preventDefault()
      const url = this.getUrl()
      const r1 = await fetchJson(url, {
        method: 'GET',
      })
      console.log('SUCCESS');
      const r2 = await r1.json()
      setData(r2)
    } catch (e) {
      setError(e)
      console.log('FAILURE');
      console.log('ERROR:', e)
    }
  }


  render() {
    return (
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
    )
  }
}

export default GetForm


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