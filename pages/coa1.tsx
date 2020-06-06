import { Formik } from 'formik'
import { Divider } from '@chakra-ui/core'

import { DisplayFormikState } from '../components/helper'
import { Box, Flex, Grid } from '@chakra-ui/core'
import AccountsTree from '../components/AccountsTree'
import { PropertyKeys } from 'ag-grid-community'
import { useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { getRecCounts } from '../queries/accounts'

import SliderLayout from '../components/SliderPageLayout'
import { SearchToolBar, CRUDToolBar, BasicToolBar } from '../components/Toolbar'
import { PageHeader } from 'antd'

const coa1 = () => {
  const [values, setValues] = useState({
    mainGrpCode: '01',
    mainGroupDesc: 'Property and Assets',
    glGroupCode: '0108',
    glGroupDesc: 'Trade debitors',
    subGroupCode: '010802',
    subGroupDesc: 'Local debitors',
    glCode: '010802001',
    glHead: 'Trade debitors',
  })

  const [recCounts, { loading, data }] = useLazyQuery(getRecCounts)

  const flexSettings = {
    flex: '1',
    minW: '300px',
    //textAlign: 'center',
    color: 'black',
    mx: '6',
    mb: '6',
  }

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
                ledgerType: 'Sales',
              }}
              //handleChange={(values, { event }) => {
              //  console.log(values)
              //</Box>/}}
              validate={(values) => {
                const errors = {}
                //if (!values.mainGrpCode) {
                //  errors.mainGrpCode = 'Required'
                //}
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
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
                      <input
                        type="text"
                        name="glGroupCode"
                        value={props.values.glGroupCode}
                      />
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
                      <input name="glCode" value={props.values.glCode} />
                    </label>
                    <label>
                      G/L Head
                      <input id="glHead" value={props.values.glHead} />
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
                    <Grid
                      w="100%"
                      templateColumns="repeat(2, minmax(300px, 1fr))"
                    >
                      <CRUDToolBar />
                      <BasicToolBar />
                      {data
                        ? console.log('counts', transformCounts(data))
                        : 'No Counts yet'}
                      <button onClick={() => recCounts()}>Get RecCounts</button>
                    </Grid>
                  </Box>
                  {/*<DisplayFormikState {...props} />*/}
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
      </div>
    </SliderLayout>
  )
}

const transformCounts = (data) => {
  return {
    level1: data.level1.count.count,
    level2: data.level2.count.count,
    level3: data.level3.count.count,
    level4: data.level4.count.count,
  }
}
export default coa1
