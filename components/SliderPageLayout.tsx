import { Layout, Menu, Breadcrumb } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  SettingOutlined,
  TransactionOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import AppHeader from './Header'
const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
}

export default function SliderLayout(props) {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = (collapsed) => {
    console.log(collapsed)
    setCollapsed(collapsed)
  }

  return (
    <div style={layoutStyle}>
      <AppHeader />

      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
  
            <Menu.Item key="1">
              <DesktopOutlined /><span>Accounts</span>
            </Menu.Item>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <SettingOutlined />
                  <span>Configuration</span>
                </span>
              }
            >
              <Menu.Item key="3">Accounting Head</Menu.Item>
              <Menu.Item key="4">Purchase Item Codes</Menu.Item>
              <Menu.Item key="5">Sales Item Code</Menu.Item>
              <Menu.Item key="5">Regions</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <TransactionOutlined />
                  <span>Transaction</span>
                </span>
              }
            >
              <Menu.Item key="6">Sales Invoice</Menu.Item>
              <Menu.Item key="7">Purchase Bill</Menu.Item>
              <Menu.Item key="8">Cash Receipt Voucher</Menu.Item>
              <Menu.Item key="9">Cash Payment Voucher</Menu.Item>
              
            </SubMenu>
            <Menu.Item key="2">
              <PieChartOutlined />
              <span>Dashboard</span>
            </Menu.Item>

            <Menu.Item key="3">
              <FileOutlined />
              <span>Reports</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>{props.children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            SmartGL ©2020 Created by AB Soutions.
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}
