// can refactor later to /states folder

import { useMachine } from '@xstate/react'
import { Machine } from 'xstate'

const crudMachine = Machine({
  id: 'crud',
  initial: 'idle',
  states: {
    idle: {
      on: {
        ADD: 'add',
        SELECT: 'view',
      },
    },
    view: {
      on: {
        ADD: 'add',
        EDIT: 'edit',
        DELETE: 'remove',
      },
    },
    add: {
      on: {
        SAVE: 'idle',
        CANCEL: 'idle',
      },
    },
    edit: {
      on: {
        SAVE: 'view',
        CANCEL: 'view',
      },
    },
    remove: {
      on: {
        SAVE: 'idle',
        CANCEL: 'view',
      },
    },
  },
})

export const [state, send] = useMachine(crudMachine)
