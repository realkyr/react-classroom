import React, { Component } from 'react'
import { Button, Col, Input, Layout, Row, Table, Typography } from 'antd'

const { Title } = Typography
const { Content } = Layout

export default class Histogram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      text: ''
    }
  }

  _header = [
    {
      title: 'Letters',
      dataIndex: 'letter',
      key: 'letter',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    }
  ]

  _generateHistogram = () => {
    const { text } = this.state
    const histogram = {}
    text.split('').forEach(c => {
      if (histogram[c]) histogram[c] = histogram[c] + 1
      else histogram[c] = 1
    })
    this.setState({
      data: Object.keys(histogram).sort().map(c => ({
        key: c,
        letter: c,
        amount: histogram[c]
      }))
    })
  }
  
  render() {
    return (
      <Content style={{ padding: 20 }}>
        <Title level={2}>Histogram</Title>
        <Row>
          <Col xs={24} md={12}>
            <Input value={this.state.text} onChange={e => this.setState({
              text: e.target.value
            })} />
            <Button onClick={this._generateHistogram}>Generate Histogram</Button>
          </Col>
          <Col xs={24} md={12}>
            <Table dataSource={this.state.data} columns={this._header} />
          </Col>
        </Row>
      </Content>
    )
  }
}
