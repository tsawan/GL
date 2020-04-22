import gql from "graphql-tag";

/*
{
  "data": {
    "insert_glcodes_one": {
      "glcode": "010102711  ",
      "glhead": "New account 711"
    }
  }
}
*/
const addGlCode_with_array = gql`
    mutation addGlCode($ep:[glcodes_insert_input!]!) {
        insert_glcodes(objects: $ep) {
            returning {
            glcode
            glhead
            }
        }
    }
`;

const addGlCode = gql`
    mutation addGlCode($ep:glcodes_insert_input!) {
        insert_glcodes_one(object: $ep) {
            glcode
            glhead
        }
    }
`;

const addSubGrpGlCode = gql`
    mutation addGlCode2($ep:subgrpglcodes_insert_input!) {
        insert_subgrpglcodes_one(object: $ep) {
            subgrpglcode
            subgrpglhead
        }
    }
`;

const getSubGroupsByGroupCode = gql`
    query getSubGrpGlCodes($val: bpchar) {
        subgrpglcodes(where: {grpglcode: {_eq: $val}}) {
            subgrpglcode
            subgrpglhead
        }
    }
`;

export { addGlCode, addSubGrpGlCode, getSubGroupsByGroupCode }