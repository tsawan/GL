import { useState } from "react";
import { Formik } from 'formik';
import { Divider } from "@chakra-ui/core";
import {
  Box,
  Flex,
  Grid,
} from "@chakra-ui/core";


const coa = () => {
  //defining layouts
  const flexSettings = {
    flex: "1",
    minW: "300px",
    textAlign: "center",
    color: "black",
    mx: "6",
    mb: "6"
  };

  const gridSettings = {
    w: "100%",
    textAlign: "center",
    color: "black",
  };

  const [count, setCount] = useState(5);

  return <div>

    <Flex>{/*for settng up divider for the form*/}

      <Box {...flexSettings} >
        <span>Tree/Grid Component</span>
      </Box>

      <Divider orientation="vertical" />

      <Box {...flexSettings} >{/* enclosing the top form defining the basic codes*/}
        <Formik
          initialValues={
            {
              mainGrpCode: '01',
              mainGroupDesc: 'Property and Assets',
              glGroup: '0108',
              glGroupDesc: 'Trade debitors',
              subGroupCode: '010802',
              subGroupDesc: 'Local debitors'
            }
          }
          validate={values => {
            const errors = {};
            if (!values.mainGrpCode) {
              errors.mainGrpCode = 'Required';
            }           
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
              <form onSubmit={handleSubmit}>
                <Box borderWidth="1px" rounded="lg">{/* Upper section defining the basic codes*/}

                  <Grid w="100%" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={2}>
                    <input type="text" name="mainGrpCode"   value={values.mainGrpCode}/>
                    <input type="text" name="mainGroupDesc" value={values.mainGroupDesc}/>
                    <input type="text" name="glGroup"       value={values.glGroup}/>
                    <input type="text" name="glGroupDesc"   value={values.glGroupDesc}/>
                    <input type="text" name="subGroupCode"  value={values.subGroupCode}/>
                    <input type="text" name="subGroupDesc"  value={values.subGroupDesc}/>
                  </Grid>
                </Box>


                <Box borderWidth="1px" rounded="lg">{/* Lower section defining the G/L codes*/}


                  <label>
                    G/L Code
                    <input name="glCode" value="010802001" />
                  </label>

                  <label>
                    G/L Head
                    <input id="glHead" value="Local debitors" />
                  </label>

      #
                  {/* Configuration */}
                  {/*<Box borderWidth="1px" rounded="lg">
                    <RadioGroup>
                      <Grid w="100%" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                        <Radio value="1">Normal</Radio>
                        <Radio value="2">Sub Ledger</Radio>
                        <Radio value="3">Bank</Radio>
                        <Radio value="3">Cash</Radio>
                        <Radio value="3">Sales</Radio>
                        <Radio value="3">Purchase</Radio>
                      </Grid>
                    </RadioGroup>
                  </Box>         */}
                </Box>
              </form>

            )}
        </Formik>

      </Box>

    </Flex>

  </div>;
};
export default coa;

