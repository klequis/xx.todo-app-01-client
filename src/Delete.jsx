import React from "react"
import fetchJson from './fetchJson'
import ErrorBoundary from './ErrorBoundary'

class Delete extends React.Component  {

  state = {
    id: '',
  }

  handleInputChagne = (e) => {
    this.setState({
      id: e.target.value
    })
  }

  handleSubmit = async (e) => {
    const { setData, setError } = this.props
    try {
      e.preventDefault()
      const url = `http://localhost:3030/api/todo/${this.state.id}`
      const r1 = await fetchJson(url, {
        method: 'DELETE',
      })
      console.log('SUCCESS')
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
          placeholder='_id'
        />
        <input
          type='submit'
          value='DELETE'
        />
      </form>
    )
  }
}

export default Delete
