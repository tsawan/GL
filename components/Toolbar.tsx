import Link from 'next/link'
import { Button, Tooltip } from 'antd'
// import Autocomplete from './Autocomplete'

import { SearchOutlined } from '@ant-design/icons'
import { crudMachine } from './CoaState'
import { useMachine } from '@xstate/react'

const linkStyle = {
  marginRight: 15,
}

const isEditing = (value) => {
  return value === 'add' || value === 'edit' || value === 'remove'
}

interface ToolbarProps {
  send(text: string): void
  state: any
}

export function CRUDToolBar(props: ToolbarProps) {
  const { state, send } = props
  return (
    <div>
      <Button
        type="primary"
        onClick={() => send('ADD')}
        disabled={state.value !== 'view'}
      >
        Add
      </Button>
      <Button
        type="primary"
        onClick={() => send('EDIT')}
        disabled={state.value !== 'view'}
      >
        Modify
      </Button>
      <Button
        type="primary"
        onClick={() => send('DELETE')}
        disabled={state.value !== 'view'}
      >
        Delete
      </Button>
      <Button
        type="primary"
        onClick={() => send('SAVE')}
        disabled={!isEditing(state.value)}
      >
        OK
      </Button>
      <Button
        type="primary"
        onClick={() => send('CANCEL')}
        disabled={!isEditing(state.value)}
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
