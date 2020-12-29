import Histogram from './screens/Histogram'
import Province from './screens/Province'
import Translation from './screens/Translation'
import { Menu, Layout } from 'antd'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom"
import './App.css';

const { Sider } = Layout

function App() {
  return (
    <Router>
      <Layout>
        <Sider breakpoint="md" collapsedWidth={0}>
          <Menu
            style={{
              width: '100%',
              height: '100vh'
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <Menu.Item key="1"><Link to="/histogram">1. Histogram</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/province">2. Province</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/translation">3. Translation</Link></Menu.Item>
          </Menu>
        </Sider>
          <Switch>
            <Route path="/histogram">
              <Histogram />
            </Route>
            <Route path="/province">
              <Province />
            </Route>
            <Route path="/translation">
              <Translation />
            </Route>
            <Redirect to="/histogram" />
          </Switch>
      </Layout>
    </Router>
  );
}

export default App;
