import React from "react";

class Delete extends React.Component  {

  state = {
    id: '',
  }

  handleInputChagne = (e) => {
    this.setState({
      id: e.target.value
    })
  }

  handleDeleteClick = async () => {
    const { setData } = this.props
    const r1 = await fetch(`http://localhost:3030/api/todo/${this.state.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const r2 = await r1.json()
    setData(r2)
  }

  render() {
    return (
      <div>
        <input 
          type='text' 
          value={this.state.id} 
          onChange={this.handleInputChagne}
          placeholder='_id'
        />
        <button
          onClick={this.handleDeleteClick}
        >DELETE</button>
      </div>
    )
  }
}

export default Delete
