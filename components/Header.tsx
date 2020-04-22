import Link from 'next/link'
import {LogoutOutlined } from '@ant-design/icons'
const linkStyle = {
  marginRight: 15
}

export default function AppHeader() {
  return (
    <div>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
      <LogoutOutlined />
      <h1>Smart Accounts</h1>
    </div>
  )
}
