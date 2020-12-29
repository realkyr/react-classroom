import React, { Component } from "react";
import { Layout, Typography, Select, Row, Col } from "antd";
import axios from "axios";

const { Title } = Typography;
const { Content } = Layout;

const { Option } = Select;

export default class Province extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      province: {},
      district: {},
    };
    this._onProvinceSelected = this._onProvinceSelected.bind(this); // must bind because this._onProvince... is not an arrow function
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get("https://api.cafeteller.club/thai/province");
    this.setState({
      loading: false,
      province: res.data,
    });
  }

  async _onProvinceSelected(province) {
    this.setState({
      selectedProvince: province,
      loading: true,
    });
    const res = await axios.get(
      "https://api.cafeteller.club/thai/district/" + province
    );
    this.setState({
      district: res.data,
      loading: false,
    });
  }

  render() {
    const { province, district } = this.state;
    return (
      <Content style={{ padding: 20 }}>
        <Title level={2}>Province</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Title level={5}>จังหวัด</Title>
            <Select
              onChange={this._onProvinceSelected}
              loading={this.state.loading}
              showSearch
              style={{ width: "100%" }}
            >
              {Object.keys(province).map((id) => (
                <Option key={id} value={id}>
                  {province[id].name.th}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>อำเภอ/เขต</Title>
            <Select
              loading={this.state.loading}
              showSearch
              style={{ width: "100%" }}
            >
              {Object.keys(district).map((id) => (
                <Option key={id} value={id}>
                  {district[id].name.th}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Content>
    );
  }
}
