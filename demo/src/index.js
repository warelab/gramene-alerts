import React, {Component} from 'react'
import {render} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Example from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>Alert Demo</h1>
      <Example
        org='warelab'
        repo='release-notes'
        path='alerts'
        site='grapevine'
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
