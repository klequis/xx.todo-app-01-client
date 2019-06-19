import React from "react";
class Post extends React.Component  {

  state = {
    title: '',
  }

  handleInputChagne = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handlePostClick = async () => {
    const { setData } = this.props
    const r1 = await fetch('http://localhost:3030/api/todo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title
      })
    })
    const r2 = await r1.json()
    setData(r2)
  }

  render() {
    return (
      <div>
        <input 
          type='text' 
          value={this.state.title} 
          onChange={this.handleInputChagne}
          placeholder='title / description'
        />
        <button
          onClick={this.handlePostClick}
        >POST</button>
      </div>
    )
  }
}

export default Post
