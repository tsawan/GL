import { Formik } from 'formik'
import { DisplayFormikState } from '../components/helper'

import AccountsTree from '../components/AccountsTree'
//import toast object and toast container from react-nextjs-toast
import { toast, ToastContainer } from 'react-nextjs-toast'
import { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { getRecCounts } from '../queries/accounts'

import SliderLayout from '../components/SliderPageLayout'
import { CRUDToolBar } from '../components/Toolbar'
import { PageHeader, Input, Radio, Switch, Select } from 'antd'
import {
  addGlCode,
  addSubGrpGlCode,
  addGrpGlCode,
  deleteGrpGlCode,
  updateGrpGlCode
} from '../queries/accounts'
import moment from 'moment'
import { COADetails } from '../components/coa-details'
import { useMaxNumber } from '../hooks/utils'

const coa1 = () => {

  const [level, setLevel] = useState(0);
  const [deleteCoaLevel2, { loading: deleting, error: deleteError }] = useMutation(deleteGrpGlCode, {
    onCompleted: successHandler
  });
  const [addNewAccountLevel2, { }] = useMutation(addGrpGlCode, {
    onCompleted: successHandler
  });
  const [addNewAccountLevel3, { }] = useMutation(addSubGrpGlCode, {
    onCompleted: successHandler
  });
  const [addNewAccountLevel4, { }] = useMutation(addGlCode, {
    onCompleted: successHandler
  });
  const [updateNewAccountLevel2, {}] = useMutation(updateGrpGlCode, {
    onCompleted: successHandler
  });
  
  
  const { maxNumber, fetchMaxNumber } = useMaxNumber()
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

  const [recCounts, countState] = useLazyQuery(getRecCounts)

  useEffect(() => {
    if (maxNumber === 0) return
    if (level < 1 || level > 3) return
    let updValues: any = { ...values }

    switch (level) {
      case 1:
        updValues.glGroupCode = '0'+(maxNumber + 1).toString()
        updValues.glGroupDesc = ''
        setValues(updValues)
        break
      case 2:
        updValues.subGroupCode = '0'+(maxNumber + 1).toString()
        updValues.subGroupDesc = ''
        setValues(updValues)
        break
      case 3:
        updValues.glCode = '0'+(maxNumber + 1).toString()
        updValues.glHead = ''
        setValues(updValues)
        break
    }
  }, [maxNumber])

  
  const { Option } = Select
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

    if (updated.mainGroupDesc == 'Chart of Account') setLevel(0)
    else setLevel(level)
  }

  return (
   
    <SliderLayout>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Chart of Account"
      >

      </PageHeader>
       <ToastContainer align={"right"} position={"bottom"} />
      <div className="coaLayout">
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

        <div>
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
            //</div>/}}
            validate={(values) => {
              const errors = {}
              //if (!values.mainGrpCode) {
              //errors.mainGrpCode = 'Required'
              //}
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const formdata = { ...values }
                if (values.submitAction === 'Add') {
                  console.log('Action:' + values.submitAction)
                  //clearing all fields
                  //determining the level at which nodes needs to be added.
                  switch (level) {
                    case 0:
                      // add not allowed here.
                      break
                    case 1:
                      fetchMaxNumber(2, formdata.mainGrpCode)
                      break
                    case 2:
                      fetchMaxNumber(3, formdata.glGroupCode)
                      break
                    case 3:
                      fetchMaxNumber(4, formdata.subGroupCode)
                      break
                    case 4:
                      console.log('level 4 >> cannot be added further')
                      break
                  }

                }
                if (values.submitAction === 'Modify') {
                  updateNewAccountLevel2({
                    variables: {
                      ep: {
                        grpglhead: values.glGroupDesc,
                      },
                      ep2: {
                        grpglcode: values.glGroupCode,
                      },
                    },
                  }).catch((e) => {
                    toast.notify(`Error has occurred while updating data. ${e}`,{
                      duration: 5,
                      type: "error"
                    })
                  });
                }
                if (values.submitAction === 'Delete') {
                  //level 2 only
                  deleteCoaLevel2({
                    variables: {
                      pk: values.glGroupCode,                
                    },
                  }).catch((e) => {
                    toast.notify(`Error has occurred while deleting data. ${e}`,{
                      duration: 5,
                      type: "error"
                    })
                  })
                }
                if (values.submitAction === 'Save') {
                  switch (level) {
                    case 1:
                      addNewAccountLevel2({
                        variables: {
                          ep: {
                            grpglcode: values.glGroupCode,
                            grpglhead: values.glGroupDesc,
                            grpglcodel2: values.mainGrpCode,
                            enteredby: 'khanbx0a',
                            enteredon: moment(new Date()).format('YYYY-MM-DD'),
                          },
                        },
                      }).catch((e) => {
                        toast.notify(`Error has occured while inserting data. ${e}`,{
                          duration: 5,
                          type: "error"
                        })
                      })

                      break
                    case 2:
                      //application needs to understand the the previous operation
                      //as save button will work for update and add too.
                      // parent level second -thrid level (new record)
                      addNewAccountLevel3({
                        variables: {
                          ep: {
                            subgrpglcode: values.subGroupCode,
                            subgrpglhead: values.subGroupDesc,
                            grpglcode: values.glGroupCode,
                            enteredby: 'khanbx0a',
                            enteredon: moment(new Date()).format('YYYY-MM-DD'),
                          },
                        },
                      }).catch((e) => {
                        toast.notify(`Error has occured while inserting data. ${e}`, {
                          duration: 5,
                          type: "error"
                        });
                      })

                      break
                    case 3:
                      addNewAccountLevel4({
                        variables: {
                          ep: {
                            glcode: values.glCode,
                            glhead: values.glHead,
                            subgrpglcode: values.subGroupCode,
                            enteredby: 'khanbx0a',
                            enteredon: moment(new Date()).format('YYYY-MM-DD'),
                          },
                        },
                      }).catch((e) => {
                        toast.notify(`Error has occured while inserting data. ${e}`,{
                          duration: 5,
                          type: "error"
                        });
                      })
                  }
                }
                  
                setValues(formdata)
                setSubmitting(false)

              }, 400)
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                {/* Upper section defining the basic codes*/}
                <div className="glDefinitionsGrid">
                  <label className="item2">Main Group</label>

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
                  <label className="item2">G/L Group</label>
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
                  <label className="item2">Sub Group</label>
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
                  <label>G/L Code</label>
                  <div>
                    <Switch defaultChecked onChange={props.handleChange} />
                  </div>
                  <label>Code</label>
                  <Input
                    name="glCode"
                    value={props.values.glCode}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <label>Head</label>
                  <Input
                    id="glHead"
                    value={props.values.glHead}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />

                  <label>B/s -PL Ref</label>
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
                </div>
                {/* Configuration */}
                <div>
                  <Radio.Group
                    name="ledgerType"
                    onChange={props.handleChange}
                    defaultValue="Normal"
                  >
                    <Radio.Button value="Normal">Normal</Radio.Button>
                    <Radio.Button value="Sub Ledger">Sub Ledger</Radio.Button>
                    <Radio.Button value="Bank">Bank</Radio.Button>
                    <Radio.Button value="Sales">Sales</Radio.Button>
                    <Radio.Button value="Purchase">Purchase</Radio.Button>
                  </Radio.Group>
                </div>
                <COADetails {...props} />
                <CRUDToolBar {...props} />

                <DisplayFormikState {...props} />
                
              </form>
            )}
          </Formik>
          
        </div>
      </div>
    </SliderLayout>
  )
}
const successHandler = () => {
  toast.notify(`Operation performed successfully.`,{
    duration: 5,
    type: "success"
  })
};
const transformCounts = (data) => {
  return {
    level1: data.level1.count.count,
    level2: data.level2.count.count,
    level3: data.level3.count.count,
    level4: data.level4.count.count,
  }
}
export default coa1
