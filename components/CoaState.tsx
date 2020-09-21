// can refactor later to /states folder

import { Machine } from 'xstate'

const editing = {
  target: 'edit',
  actions: 'setEditType',
}
const viewing = {
  target: 'view',
  actions: 'clearEditType',
}
export const toolbarMachine = Machine(
  {
    id: 'toolbar',
    initial: 'idle',
    context: {
      editType: '',
    },
    states: {
      idle: {
        on: {
          SELECT: 'view',
        },
      },
      view: {
        on: {
          ADD: { ...editing },
          EDIT: { ...editing },
          DELETE: { ...editing },
        },
      },
      edit: {
        on: {
          OK: { ...viewing },
          CANCEL: { ...viewing },
        },
      },
    },
  },
  {
    actions: {
      setEditType: (ctx, evt) => (ctx.editType = evt.type),
      clearEditType: (ctx) => (ctx.editType = ''),
    },
  },
)
