import React from "react"
import { connect } from 'react-redux'
import fetchJson from './fetchJson'
import { todoDeleteRequest } from 'redux/todo/actions'

class Post extends React.Component  {

  state = {
    title: '',
  }

  handleInputChagne = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleSubmit = async (e) => {
    const { setData, setError } = this.props
    try {
      e.preventDefault()
      const url = 'http://localhost:3030/api/todo'
      const r1 = await fetchJson(url, {
        method: 'POST',
        body: JSON.stringify({ title: this.state.title })
      })
      console.log('SUCCESS');
      const r2 = await r1.json()
      setData(r2)
    } catch (e) {
      console.log('FAILURE');
      setError(e)
      console.log('ERROR:', e)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type='text' 
          value={this.state.title} 
          onChange={this.handleInputChagne}
          placeholder='title / description'
        />
        <input
          type='submit'
          value='POST'
        />
      </form>
    )
  }
}

export default Post
