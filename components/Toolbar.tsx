import Link from 'next/link'
import { Button, Tooltip } from 'antd'
// import Autocomplete from './Autocomplete'

import { SearchOutlined} from '@ant-design/icons'

const linkStyle = {
  marginRight: 15,
}

export const CRUDToolBar = props => {

  return (
    <div>
      <Button type="primary" onClick={() => {
              props.values.submitAction='Add';
              props.handleSubmit();
            }}>Add</Button>
      <Button type="default" onClick={() => {
              props.values.submitAction='Modify';
              props.handleSubmit();
            }}>Modify</Button>
      <Button type="danger"  onClick={() => {
              props.values.submitAction='Delete';
              props.handleSubmit();
            }}>Delete</Button>
    </div>
  )
}
export function BasicToolBar() {
  return (
    <div>
      <Button type="default" htmlType="button">OK</Button>
      <Button type="primary" htmlType="reset">Cancel</Button>
    </div>
  )
}

export function SearchToolBar() {
  return (
    <div>
      <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>
      {/*for settng up divider for the form*/}
      {/* <Autocomplete
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
      /> */}
    </div>
  )
}
