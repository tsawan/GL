import { Button, Tooltip, Card } from 'antd'

export function COADetails(props) {
  return (
    <div>
    <Card title="Normal" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Normal</p>
    </Card>
    <Card title="Sub Ledger Type" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Sub Ledger Type</p>
    </Card>
    <Card title="Bank" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Bank</p>
    </Card>
    <Card title="Cash" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Cash</p>
    </Card>   
    <Card title="Sales" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Sales</p>
    </Card>    
    <Card title="Purchase" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Purchase</p>
    </Card>       
  </div>
  )
}