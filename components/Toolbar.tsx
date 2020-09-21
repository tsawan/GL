import Link from 'next/link'
import { Button, Tooltip } from 'antd'
// import Autocomplete from './Autocomplete'

import { SearchOutlined } from '@ant-design/icons'

const linkStyle = {
  marginRight: 15,
}

interface ToolbarProps {
  send(text: string): void
  state: any
  resetForm(): void
  handleSubmit(): void
}

export function CRUDToolBar(props: ToolbarProps) {
  const { state, send, resetForm, handleSubmit } = props
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          send('ADD')
          handleSubmit()
        }}
        disabled={state.value !== 'view'}
      >
        Add
      </Button>
      <Button
        type="primary"
        onClick={() => {
          send('EDIT')
          handleSubmit()
        }}
        disabled={state.value !== 'view'}
      >
        Modify
      </Button>
      <Button
        type="primary"
        onClick={() => {
          send('DELETE')
          handleSubmit()
        }}
        disabled={state.value !== 'view'}
      >
        Delete
      </Button>
      <Button
        type="primary"
        onClick={() => {
          send('OK')
          handleSubmit()
        }}
        disabled={state.value !== 'edit'}
      >
        OK
      </Button>
      <Button
        type="primary"
        onClick={() => {
          send('CANCEL')
          resetForm()
        }}
        disabled={state.value !== 'edit'}
      >
        Cancel
      </Button>
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
