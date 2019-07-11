import React from 'react'
import { connect } from 'react-redux'
import logo from './logo.svg'
import './App.css'
import Get from 'ui/Get'
import Post from 'ui/Post'
import Delete from 'ui/Delete'
// import UnknownEndpoint from 'ui/UnknownEndpoint'
import ErrorPane from 'ui/ErrorPane'
import DevTools from 'ui/DevTools'
import { todosReadRequest, todosReadByIdRequest } from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'
import { areRequestsPending, getRequests } from 'store/requests/selectors'
import { green } from 'logger'
import { isEmpty, isNil } from 'ramda'

const codeStyle = {
  color: 'white',
  textAlign: 'left'
}
class App extends React.Component {
  state = {
    data: '',
    error: '',
    currentId: ''
  }

  async componentDidMount() {
    await this.props.todosReadRequest()
  }

  async componentDidUpdate() {
    const { currentId } = this.state
    const { areRequestsPending } = this.props
    green('areRequestsPending', areRequestsPending)
    if (!areRequestsPending) {
      green('id', currentId)
      if (isEmpty(currentId) && isNil(currentId)) {
        green('no id **')
        await this.props.todosReadRequest()
      } else {
        green('has id **')
        await this.props.todosReadByIdRequest(currentId)
      }
    }
  }

  

  setId = id => {
    green('setId: id: ', id)
    this.setState({
      currentId: id
    })
  }

  render() {
    return (
      <div className="App">
        <ErrorPane error={this.state.error} setError={this.setError} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>currentId: {this.state.currentId}</div>
          <Get setId={this.setId} />
          <Post setId={this.setId} />
          <Delete setId={this.setId} />
          {/* <UnknownEndpoint setError={this.setError} /> */}
          <div>
            <pre style={codeStyle}>
              {JSON.stringify(this.props.todos, null, 4)}
            </pre>
          </div>
        </header>
        <div className="DevTools">
          <DevTools />
        </div>
      </div>
    )
  }
}

const actions = { todosReadRequest, todosReadByIdRequest }

const mapStateToProps = state => {
  return {
    todos: getAllTodos(state),
    // todosReadRequestStatus: getRequest(state, TODOS_READ_REQUEST_KEY)
    areRequestsPending: areRequestsPending(getRequests(state))
  }
}

export default connect(
  mapStateToProps,
  actions
)(App)
