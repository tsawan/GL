import { useFormik } from 'formik'
import { Divider } from '@chakra-ui/core'
import * as Yup from 'yup';
import { DisplayFormikState } from '../components/helper'
import { Box, Flex, Grid } from '@chakra-ui/core'
import AccountsTree from "../components/AccountsTree";
import { useState } from 'react';
import SliderLayout from '../components/SliderPageLayout'
import { SearchToolBar, CRUDToolBar, BasicToolBar } from '../components/Toolbar'
import { PageHeader } from 'antd'

const coa1 = () => {
  const [values, setValues] = useState({})
  //this will have the selected Account Type
  const [accountHead, setAccountHead]= useState({ code: '',description: '' });
  const flexSettings = {
    flex: '1',
    minW: '300px',
    //textAlign: 'center',
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
    },
  ]
  const onSelect = () => {}
  const formik = useFormik({
    initialValues:{
      mainGrpCode: '01',
      mainGroupDesc: 'Property and Assets',
      glGroup: '0108',
      glGroupDesc: 'Trade debitors',
      subGroupCode: '010802',
      subGroupDesc: 'Local debitors',
      ledgerType: 'Sales',
    },
    
    validationSchema: Yup.object( {
      mainGrpCode: Yup.string()
      .max(2, 'Must be 2 characters')
      .required('Required'),
      mainGroupDesc: Yup.string()
      .max(5, 'Must be more then 5 characters')
      .required('Required'),
      glGroup: Yup.string()
      .max(5, 'Must be more then 4 characters')
      .required('Required'),
      glGroupDesc: Yup.string()
      .max(5, 'Must be more then 5 characters')
      .required('Required'),
      subGroupCode: Yup.string()
      .max(6, 'Must be more then 6 characters')
      .required('Required'),
      subGroupDesc: Yup.string()
      .max(5, 'Must be more then 5 characters')
      .required('Required'),
      ledgerType: Yup.string()
      .max(5, 'Must be more then 5 characters')
      .required('Required'),
    }),
    onSubmit: values  => {
       alert(JSON.stringify(values, null, 2));
    },
  });

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
              'overflowY': 'scroll',
              border: '1px solid blue',
              minWidth: '300px',
            }}
          >
            <AccountsTree />
          </div>
          {/* </Box> */}

          <Divider orientation="vertical" />

          <Box {...flexSettings}>
            {/* enclosing the top form defining the basic codes*/}
                <form onSubmit={formik.handleSubmit}>
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
                        value={formik.values.mainGrpCode}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.mainGrpCode ? <div className="error">{formik.errors.mainGrpCode}</div> : null}
                      <input
                        type="text"
                        name="mainGroupDesc"
                        value={formik.values.mainGroupDesc}
                        onChange={formik.handleChange}
                      />
                      <input
                        type="text"
                        name="glGroup"
                        value={formik.values.glGroup}
                        onChange={formik.handleChange}
                      />
                      <input
                        type="text"
                        name="glGroupDesc"
                        value={formik.values.glGroupDesc}
                        onChange={formik.handleChange}
                      />
                      <input
                        type="text"
                        name="subGroupCode"
                        value={formik.values.subGroupCode}
                      />
                      <input
                        type="text"
                        name="subGroupDesc"
                        value={formik.values.subGroupDesc}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  </Box>

                  <Box borderWidth="1px" rounded="lg">
                    {/* Lower section defining the G/L codes*/}
                    <label>
                      G/L Code
                      <input name="glCode" value="010802001" onChange={formik.handleChange} />
                    </label>
                    <label>
                      G/L Head
                      <input id="glHead" value="Local debitors" onChange={formik.handleChange}/>
                    </label>
                    #{/* Configuration */}
                    <Box borderWidth="1px" rounded="lg">
                      <label>
                        <input
                          type="radio"
                          name="ledgerType"
                          value="Normal"
                          checked={formik.values.ledgerType === 'Normal'}
                          onChange={formik.handleChange}
                        />
                        Normal
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="ledgerType"
                          value="Sub Ledger"
                          checked={formik.values.ledgerType === 'Sub Ledger'}
                          onChange={formik.handleChange}
                        />
                        Sub Ledger
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="ledgerType"
                          value="Bank"
                          checked={formik.values.ledgerType === 'Bank'}
                          onChange={formik.handleChange}
                        />
                        Bank
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="ledgerType"
                          value="Cash"
                          checked={formik.values.ledgerType === 'Cash'}
                          onChange={formik.handleChange}
                        />
                        Cash
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="ledgerType"
                          value="Sales"
                          checked={formik.values.ledgerType === 'Sales'}
                          onChange={formik.handleChange}
                        />
                        Sales
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="ledgerType"
                          value="Purchase"
                          checked={formik.values.ledgerType === 'Purchase'}
                          onChange={formik.handleChange}
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
                    </Grid>
                  </Box>
                  {/*<DisplayFormikState {...formik} />*/}
                </form>
    
          </Box>
        </Flex>
      </div>
    </SliderLayout>
  )
}
export default coa1
