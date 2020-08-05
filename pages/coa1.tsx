import { Formik } from 'formik'
import { DisplayFormikState } from '../components/helper'

import AccountsTree from '../components/AccountsTree'

import { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { getRecCounts } from '../queries/accounts'

import SliderLayout from '../components/SliderPageLayout'
import { CRUDToolBar } from '../components/Toolbar'
import { PageHeader, Input, Radio, Switch, Select } from 'antd'
import {
  addGlCode,
  addSubGrpGlCode,
  getSubGroupsByGroupCode,
} from '../queries/accounts'
import moment from 'moment'
import { COADetails } from '../components/coa-details'
import { useMaxNumber } from '../hooks/utils'

const coa1 = () => {
  const [level, setLevel] = useState(0)
  const [addNewAccount, { data }] = useMutation(addGlCode)
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
        updValues.glGroupCode = (maxNumber + 1).toString()
        updValues.glGroupDesc = ''
        setValues(updValues)
        break
      case 2:
        updValues.subGroupCode = (maxNumber + 1).toString()
        updValues.subGroupDesc = ''
        setValues(updValues)
        break
      case 3:
        updValues.glCode = (maxNumber + 1).toString()
        updValues.glHead = ''
        setValues(updValues)
        break
    }
  }, [maxNumber])

  const flexSettings = {
    flex: '1',
    minW: '300px',
    //textAlign: 'center',
    color: 'black',
    mx: '6',
    mb: '6',
  }
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
      ></PageHeader>
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
                      /*
                      console.log('level 0 at the root level');
                      */
                      break
                    case 1:
                      console.log(
                        'level 1 >>formdata.mainGrpCode:' +
                          formdata.mainGrpCode,
                      )
                      fetchMaxNumber(2, formdata.mainGrpCode)
                      break
                    case 2:
                      console.log(
                        'level 2 >>formdata.glGroupCode:' +
                          formdata.glGroupCode,
                      )
                      fetchMaxNumber(3, formdata.glGroupCode)
                      break
                    case 3:
                      console.log(
                        'level 3 >>formdata.subGroupCode:' +
                          formdata.subGroupCode,
                      )
                      fetchMaxNumber(4, formdata.subGroupCode)
                      break
                    case 4:
                      console.log('level 4 >> cannot be added further')
                      break
                  }
                  /* addNewAccount({
                    variables: {
                      ep: {
                        glcode: values.glGroupCode,
                        glhead: values.glGroupDesc,
                        subgrpglcode: '010102',
                        enteredby: 'khanbx0a',
                        enteredon: moment(new Date()).format('YYYY-MM-DD'),
                      },
                    },
                  })*/
                }
                if (values.submitAction === 'Modify') {
                }
                if (values.submitAction === 'Delete') {
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
                {countState.data
                  ? console.log('counts', transformCounts(countState.data))
                  : 'No Counts yet'}
                <button onClick={() => recCounts()}>Get RecCounts</button>
              </form>
            )}
          </Formik>
          <h2>
            {maxNumber}...{level}
          </h2>
          <button onClick={() => fetchMaxNumber(1)}>Get Max Level1</button>
          <br />
          <button onClick={() => fetchMaxNumber(2, '03')}>
            Get Max Level2 (03)
          </button>
          <br />
          <button onClick={() => fetchMaxNumber(3, '0332')}>
            Get Max Level3 (0332)
          </button>
          <br />
          <button onClick={() => fetchMaxNumber(4, '033111')}>
            Get Max Level4 (033111)
          </button>
        </div>
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
