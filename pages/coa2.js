// test page for using multiple query/mutations 
// from same page 
// with different render functions (internal components)

import { Divider } from '@chakra-ui/core'
import { Box, Flex, Grid } from '@chakra-ui/core'
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { addGlCode, addSubGrpGlCode, getSubGroupsByGroupCode } from '../queries/accounts'

const coa2 = () => {
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
  
  return (
    <div>
      <Flex>

        <div
          style={{ height: "50vh", border: "1px solid red" }}>
          
          {AddGlCode()}
        </div>

        <Divider orientation="vertical" />

        <div
          style={{ height: "50vh", border: "1px solid red" }}>
          
          {AddSubGrpGlCode()}
        </div>

        <Divider orientation="vertical" />

        <div
          style={{ height: "40vh", border: "1px solid red" }}>
          
          {ShowData()}
        </div>

      </Flex>
    </div>
  )
}
export default coa2

const ShowData = () => {
    const [
        getSubGroupCodes, 
        { loading, data }
      ] = useLazyQuery(getSubGroupsByGroupCode)
    if (loading) return <div>loading</div>
    return (
    <div>
        Size {data ? data.subgrpglcodes.length : 'NA'}
        {data && data.subgrpglcodes.map(o => 
            <div key={o.subgrpglcode}>{o.subgrpglhead}</div>)}
        <hr/>
        <button onClick={() => getSubGroupCodes( { 
            variables: { val: '0103'}
        })}>Get Groups Data</button>
    </div>
    )
}

const AddGlCode = () => {
  const [addNewAccount, { data }] = useMutation(addGlCode);
  let code, title;

  // need to change the form to use formik
  return (
    <div>
     <h2>Add GL Code under <br/>(with prefix) 010102</h2>
     <hr/> 
     code example 010102511 (9 digits)
     {data ? <h3>got data</h3> : ''}
      <form
        onSubmit={e => {
          e.preventDefault();
          addNewAccount({ variables: { ep: {
              glcode: code.value,
              glhead: title.value,
              subgrpglcode: "010102",
              enteredby: "tsawan",
              enteredon: "2020-04-18"
            } } });
            console.log('res ', result);
        }}
      >
        <label>GL Code</label>
        <input
          ref={node => {
            code = node;
          }}
        />
        <br/>
        <label>GL Head (Title)</label>
        <input
          ref={node => {
            title = node;
          }}
        />
        <br/>

        <button type="submit">Add New GL Code</button>
      </form>
    </div>
  );
};

const AddSubGrpGlCode = () => {
    const [addNewAccount, { data }] = useMutation(addSubGrpGlCode);
    let code, title;
  
    // need to change the form to use formik
    if (data) { 
        const nested = Object.values(temp1)[0]
        console.warn('got data ', nested)
    }

    return (
      <div>
       <h2>Add SubGrp GL Code <br/>under (with prefix) 0103</h2>
       <br/>
       Add code like 010384 (6 digits)
        <form
          onSubmit={e => {
            e.preventDefault();
            addNewAccount({ variables: { ep: {
                subgrpglcode: code.value,
                subgrpglhead: title.value,
                grpglcode: "0103",
                enteredby: "tsawan",
                enteredon: "2020-04-18"
              } } });
            code.value = '';
            title.value = '';
          }}
        >
          <label>SubGrp GL Code</label>
          <input
            ref={node => {
              code = node;
            }}
          />
          <br/>
          <label>SubGrp GL Head (Title)</label>
          <input
            ref={node => {
              title = node;
            }}
          />
          <br/>
  
          <button type="submit">Add New SubGrp GL Code</button>
        </form>
      </div>
    );
  };
  