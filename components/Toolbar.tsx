import Link from 'next/link'
import { Button, Tooltip } from 'antd'
// import Autocomplete from './Autocomplete'

import { SearchOutlined } from '@ant-design/icons'

const linkStyle = {
  marginRight: 15,
}


export const CRUDToolBar = (props) => {
  /*
standard strategy would be: 
  For edit/Modify selecting the required row and click on Modify button in the toolbar. Similarly, user can add a new record to grid either by 
  clicking on Add button in the toolbar, Save and Cancel while in edit mode is possible using respective toolbar button.
  Deletion of the record is possible by selecting the required row and click on Delete button in the toolbar.
*/
  return (
    <div>
      <div>
        <Button
          type="default"
          name="add"
          onClick={() => {
            props.values.isSubmitting = true;
            props.values.submitAction = 'Add';
            props.handleSubmit();
          }}
        >
          Add
        </Button>
        <Button
          type="default"
          name="modify"
          onClick={() => {
            props.values.isSubmitting = true;
            props.values.submitAction = 'Modify';
            //updating the state of the toolbar
            //add false
            //save true
            //find false
            //cancel true
            props.handleSubmit();
          }}
        >
          Modify
        </Button>
        <Button
          type="default"
          name="delete"
          onClick={() => {
            props.values.isSubmitting = true;
            props.values.submitAction = 'Delete';
            props.handleSubmit();
          }}
        >
          Delete
        </Button>
      </div>
      <div>
        <Button
          type="default"
          htmlType="button"
          name="Save"
          
          onClick={() => {
            props.values.isSubmitting = true;
            props.values.submitAction = 'Save';
            props.handleSubmit();
          }}
        >
          Save
        </Button>
        <Button
          type="default"
          htmlType="reset"
          name="reset"
          disabled={!props.values.isSubmitting}
          onClick={() => {

            props.values.submitAction = 'Cancel'
            props.resetForm();
          }}
        >
          Cancel
        </Button>
      </div>
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
