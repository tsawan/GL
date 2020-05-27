import { Formik } from 'formik'
import { Divider } from '@chakra-ui/core'
import { DisplayFormikState } from '../components/helper'
import { Box, Flex, Grid } from '@chakra-ui/core'
import AccountsTree from '../components/AccountsTree'

import { useState } from 'react'

import SliderLayout from '../components/SliderPageLayout'
import { SearchToolBar, CRUDToolBar } from '../components/Toolbar'
import { PageHeader, Input, Radio, Switch, Select } from 'antd'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import {
  addGlCode,
  addSubGrpGlCode,
  getSubGroupsByGroupCode,
} from '../queries/accounts'
import moment from 'moment'
import { COADetails } from '../components/coa-details'

const coa1 = () => {
  const [addNewAccount, { data }] = useMutation(addGlCode)
  const [values, setValues] = useState({
    mainGrpCode: '01',
    mainGroupDesc: 'Property and Assets',
    glGroupCode: '0108',
    glGroupDesc: 'Trade debitors',
    subGroupCode: '010802',
    subGroupDesc: 'Local debitors',
    glCode: '010802001',
    glHead: 'Trade debitors',
    submitAction: undefined,
  })

  const flexSettings = {
    flex: '1',
    minW: '300px',
    //textAlign: 'center',
    color: 'black',
    mx: '6',
    mb: '6',
  }
  const { Option } = Select;
  const onTreeSelect = (selection) => {
    const level = selection.length
    console.log(`level ${selection.length}`)
    console.log('selection ', selection)
    // todo: move out
    const MAX_LEVEL: number = 4
    for (let i = level; i < MAX_LEVEL; i++)
      selection[i] = { key: '', title: '' }

    let updated: any = {
      mainGrpCode: selection[0].key,
      mainGroupDesc: selection[0].title,
      glGroupCode: selection[1].key,
      glGroupDesc: selection[1].title,
      subGroupCode: selection[2].key,
      subGroupDesc: selection[2].title,
      glCode: selection[3].key,
      glHead: selection[3].title,
    }
    setValues(updated)
  }

  return (
    <SliderLayout>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Chart of Account"
      ></PageHeader>
      <div>
        <Flex>
          {/* <Box {...flexSettings} > */}
          <div
            style={{
              height: '80vh',
              overflowY: 'scroll',
              border: '1px solid blue',
              minWidth: '300px',
            }}
          >
            <AccountsTree onTreeSelect={onTreeSelect} />
          </div>
          {/* </Box> */}

          <Divider orientation="vertical" />

          <Box {...flexSettings}>
            {/* enclosing the top form defining the basic codes*/}
            <Formik
              enableReinitialize
              initialValues={{
                mainGrpCode: values.mainGrpCode,
                mainGroupDesc: values.mainGroupDesc,
                glGroupCode: values.glGroupCode,
                glGroupDesc: values.glGroupDesc,
                subGroupCode: values.subGroupCode,
                subGroupDesc: values.subGroupDesc,
                glCode: values.glCode,
                glHead: values.glHead,
                ledgerType: 'Normal',
                submitAction: undefined,
                isSubmitting: false,
              }}
              //handleChange={(values, { event }) => {
              //  console.log(values)
              //</Box>/}}
              validate={(values) => {
                const errors = {}
                //if (!values.mainGrpCode) {
                //errors.mainGrpCode = 'Required'
                //}
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  if (values.submitAction === 'Add') {
                    addNewAccount({
                      variables: {
                        ep: {
                          glcode: values.glGroupCode,
                          glhead: values.glGroupDesc,
                          subgrpglcode: '010102',
                          enteredby: 'khanbx0a',
                          enteredon: moment(new Date()).format('YYYY-MM-DD'),
                        },
                      },
                    })
                  }
                  if (values.submitAction === 'Modify') {
                  }
                  if (values.submitAction === 'Delete') {
                  }
                  alert(
                    'Submit Action:' +
                      values.submitAction +
                      JSON.stringify(values, null, 2),
                  )
                  setSubmitting(false)
                }, 400)
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Box borderWidth="1px" rounded="lg">
                    <SearchToolBar />
                    {/* Upper section defining the basic codes*/}
                    <Grid
                      w="100%"
                      templateColumns="repeat(2, minmax(300px, 1fr))"
                      gap={2}
                    >
                      <Input
                        type="text"
                        name="mainGrpCode"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.mainGrpCode}
                      />
                      <Input
                        type="text"
                        name="mainGroupDesc"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.mainGroupDesc}
                      />
                      <Input
                        type="text"
                        name="glGroupCode"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.glGroupCode}
                      />
                      <Input
                        type="text"
                        name="glGroupDesc"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.glGroupDesc}
                      />
                      <Input
                        type="text"
                        name="subGroupCode"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.subGroupCode}
                      />
                      <Input
                        type="text"
                        name="subGroupDesc"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.subGroupDesc}
                      />
                    </Grid>
                  </Box>
                  <p>
                    G/L code
                    <Box borderWidth="1px" rounded="lg">
                      {/* Lower section defining the G/L codes*/}

                      <Switch defaultChecked onChange={props.handleChange} />
                      <label>
                        G/L Code
                        <Input
                          name="glCode"
                          value={props.values.glCode}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                      </label>

                      <label>
                        G/L Head
                        <Input
                          id="glHead"
                          value={props.values.glHead}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                      </label>

                      <label>
                        B/s -PL Ref
                        <Select
                          showSearch
                          style={{ width: 200 }}
                          placeholder="Select a Linked Account"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="XX">XX</Option>
                        </Select>
                      </label>
                      {/* Configuration */}
                      <Box borderWidth="1px" rounded="lg">
                        <Radio.Group
                          name="ledgerType"
                          onChange={props.handleChange}
                          defaultValue="Normal"
                        >
                          <Radio.Button value="Normal">Normal</Radio.Button>
                          <Radio.Button value="Sub Ledger">
                            Sub Ledger
                          </Radio.Button>
                          <Radio.Button value="Bank">Bank</Radio.Button>
                          <Radio.Button value="Sales">Sales</Radio.Button>
                          <Radio.Button value="Purchase">Purchase</Radio.Button>
                        </Radio.Group>
                      </Box>
                      <COADetails {...props} />
                      <CRUDToolBar {...props} />
                    </Box>
                  </p>
                  <DisplayFormikState {...props} />
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
      </div>
    </SliderLayout>
  )
}
export default coa1
