import Link from 'next/link'
import { Button, Tooltip } from 'antd'
import Autocomplete from './Autocomplete'

import { SearchOutlined} from '@ant-design/icons'

const linkStyle = {
  marginRight: 15,
}

export function CRUDToolBar() {
  return (
    <div align="left">
      <Button type="primary">Add</Button>
      <Button type="primary">Modify</Button>
      <Button type="primary">Delete</Button>
    </div>
  )
}
export function BasicToolBar() {
  return (
    <div align="right">
      <Button type="primary">OK</Button>
      <Button type="primary">Cancel</Button>
    </div>
  )
}

export function SearchToolBar() {
  return (
    <div align="left">
      <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>
      {/*for settng up divider for the form*/}
      <Autocomplete
        suggestions={[
          'Mills building',
          'Colony',
          'Paint (mill building)',
          'Sewerage (mills building)',
          'Plant & machinery',
          'Blow room (plant & machinery)',
          'Carding (plant & machinery)',
          'Drawing (plant & machinery)',
          'Simplex (plant & machinery)',
          'Ring (plant & machinery)',
          'Auto cone (plant & machinery)',
          'Sanitary fittings (plant & machinery)',
          'Maintenance & salary exp',
        ]}
      />
    </div>
  )
}
