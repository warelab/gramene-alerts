import React, { Component } from 'react'
import remarkGfm from 'remark-gfm'
import { Remark } from 'react-remark'
import remarkHeading from 'remark-heading-id'
import imgLinks from '@pondorasti/remark-img-links'
import { Alert, Table } from 'react-bootstrap'
import '../css/mdview.css'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    const url = `https://api.github.com/repos/${this.props.org}/${this.props.repo}/contents/${this.props.path}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const alerts = data.filter(f => f.name === `${this.props.site}.md` || f.name === "APB.md");
        if (alerts.length === 1) {
          fetch(alerts[0].download_url)
            .then(response => response.text())
            .then(content => {
              this.setState({alertMD: content})
            })
        }
      });
  }
  render() {
    if (! this.state.alertMD) {
      return null
    }
    return <Alert variant='danger'>
      <Remark
        remarkPlugins={[
            remarkGfm,
            remarkHeading,
            [imgLinks, { absolutePath: `https://github.com/${this.props.org}/${this.props.repo}/raw/main/${this.props.path}/`}]
        ]}
        rehypeReactOptions={{
          components: {
            table: props => <Table size="sm" striped bordered hover {...props} />
          }
        }}
      >{this.state.alertMD}</Remark>
    </Alert>
  }
}
