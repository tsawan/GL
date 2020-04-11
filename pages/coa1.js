import { useState } from 'react'
import { Formik, Field, RadioButton } from 'formik'
import { Divider } from '@chakra-ui/core'
import Autocomplete from './shared/components/Autocomplete'
import { DisplayFormikState } from './shared/components/helper'
import { Box, Flex, Grid } from '@chakra-ui/core'

import { Tree } from 'antd'
import { PropertyKeys } from 'ag-grid-community'

const { TreeNode } = Tree

const coa = () => {
  const [values, setValues] = React.useState({})

  const flexSettings = {
    flex: '1',
    minW: '300px',
    textAlign: 'center',
    color: 'black',
    mx: '6',
    mb: '6',
  }

  const gridSettings = {
    w: '100%',
    textAlign: 'center',
    color: 'black',
  }


  const treeData = [
    {
      title: '11 - Assets - Net',
      key: '11',
      children: [
        {
          title: '1101 - Fixed Assets',
          key: '1101',
          children: [
            {
              title: '110101 - Fixed Assets at Cost',
              key: '110101',
              disableCheckbox: true,
              children: [
                {
                  title: '110101001 - Land free hold',
                  key: '110101001',
                  isLeaf: true,
                },
                {
                  title: '110101002 - Plant and Machinery',
                  key: '110101002',
                  isLeaf: true,
                },
              ],
            },
            {
              title: '1102 - Capital work in Progress',
              key: '1102',
              isLeaf: true,
            },
          ],
        },
        {
          title: '1104 - Current Assets',
          key: '1104',
        },
      ],
    },
  ]
  const onSelect = () => {}

  return (
    <div>
      <Flex>
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
        {/* <Box {...flexSettings} > */}
        <div style={{ height: '200px', width: '500px' }}>
          <Tree
            defaultExpandAll={true}
            draggable={true}
            selectable={true}
            showLine={true}
            showIcon={false}
            onSelect={onSelect}
            treeData={treeData}
          />
        </div>
        {/* </Box> */}

        <Divider orientation="vertical" />

        <Box {...flexSettings}>
          {/* enclosing the top form defining the basic codes*/}
          <Formik
            initialValues={{
              mainGrpCode: '01',
              mainGroupDesc: 'Property and Assets',
              glGroup: '0108',
              glGroupDesc: 'Trade debitors',
              subGroupCode: '010802',
              subGroupDesc: 'Local debitors',
              ledgerType: 'Sales',
            }}
            handleChange={(values, { event }) => {
              console.log(values)
            }}
            validate={(values) => {
              const errors = {}
              if (!values.mainGrpCode) {
                errors.mainGrpCode = 'Required'
              }
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
              }, 400)
            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit}>
                <Box borderWidth="1px" rounded="lg">
                  {/* Upper section defining the basic codes*/}

                  <Grid
                    w="100%"
                    templateColumns="repeat(2, minmax(300px, 1fr))"
                    gap={2}
                  >
                    <input
                      type="text"
                      name="mainGrpCode"
                      value={props.values.mainGrpCode}
                    />
                    <input
                      type="text"
                      name="mainGroupDesc"
                      value={props.values.mainGroupDesc}
                    />
                    <input type="text" name="glGroup" value={values.glGroup} />
                    <input
                      type="text"
                      name="glGroupDesc"
                      value={props.values.glGroupDesc}
                    />
                    <input
                      type="text"
                      name="subGroupCode"
                      value={props.values.subGroupCode}
                    />
                    <input
                      type="text"
                      name="subGroupDesc"
                      value={props.values.subGroupDesc}
                    />
                  </Grid>
                </Box>

                <Box borderWidth="1px" rounded="lg">
                  {/* Lower section defining the G/L codes*/}
                  <label>
                    G/L Code
                    <input name="glCode" value="010802001" />
                  </label>
                  <label>
                    G/L Head
                    <input id="glHead" value="Local debitors" />
                  </label>
                  #{/* Configuration */}
                  <Box borderWidth="1px" rounded="lg">
                    <label>
                      <input
                        type="radio"
                        name="ledgerType"
                        value="Normal"
                        checked={props.values.ledgerType === 'Normal'}
                        onChange={props.handleChange}
                      />
                      Normal
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="ledgerType"
                        value="Normal"
                        checked={props.values.ledgerType === 'Sub Ledger'}
                        onChange={props.handleChange}
                      />
                      Sub Ledger
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="ledgerType"
                        value="Bank"
                        checked={props.values.ledgerType === 'Bank'}
                        onChange={props.handleChange}
                      />
                      Bank
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="ledgerType"
                        value="Cash"
                        checked={props.values.ledgerType === 'Cash'}
                        onChange={props.handleChange}
                      />
                      Cash
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="ledgerType"
                        value="Sales"
                        checked={props.values.ledgerType === 'Sales'}
                        onChange={props.handleChange}
                      />
                      Sales
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="ledgerType"
                        value="Purchase"
                        checked={props.values.ledgerType === 'Purchase'}
                        onChange={props.handleChange}
                      />
                      Purchase
                    </label>
                  </Box>
                </Box>
              </form>
            )}
         
          </Formik>
        </Box>
      </Flex>
    </div>
  )
}
export default coa
