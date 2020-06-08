import gql from 'graphql-tag'

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

const getMaxLevel4 = gql`
  query Level4($val: bpchar) {
    result: glcodes(
      order_by: { glcode: desc }
      limit: 1
      where: { subgrpglcode: { _eq: $val } }
    ) {
      max: glcode
    }
  }
`

const getMaxLevel3 = gql`
  query Level3($val: bpchar) {
    result: subgrpglcodes(
      order_by: { subgrpglcode: desc }
      limit: 1
      where: { grpglcode: { _eq: $val } }
    ) {
      max: subgrpglcode
    }
  }
`

const getMaxLevel2 = gql`
  query Level2($val: bpchar) {
    result: grpglcodes(
      order_by: { grpglcode: desc }
      limit: 1
      where: { grpglcodel2: { _eq: $val } }
    ) {
      max: grpglcode
    }
  }
`
const getMaxLevel1 = gql`
  query Level1 {
    result: grpglcodesl2(order_by: { grpglcodel2: desc }, limit: 1) {
      max: grpglcodel2
    }
  }
`

const addGlCode_with_array = gql`
  mutation addGlCode($ep: [glcodes_insert_input!]!) {
    insert_glcodes(objects: $ep) {
      returning {
        glcode
        glhead
      }
    }
  }
`

const addGlCode = gql`
  mutation addGlCode($ep: glcodes_insert_input!) {
    insert_glcodes_one(object: $ep) {
      glcode
      glhead
    }
  }
`

const addSubGrpGlCode = gql`
  mutation addGlCode2($ep: subgrpglcodes_insert_input!) {
    insert_subgrpglcodes_one(object: $ep) {
      subgrpglcode
      subgrpglhead
    }
  }
`

const getSubGroupsByGroupCode = gql`
  query getSubGrpGlCodes($val: bpchar) {
    subgrpglcodes(where: { grpglcode: { _eq: $val } }) {
      subgrpglcode
      subgrpglhead
    }
  }
`

const getRecCounts = gql`
  {
    level4: glcodes_aggregate {
      count: aggregate {
        count
      }
    }
    level3: subgrpglcodes_aggregate {
      count: aggregate {
        count
      }
    }
    level2: grpglcodes_aggregate {
      count: aggregate {
        count
      }
    }
    level1: grpglcodesl2_aggregate {
      count: aggregate {
        count
      }
    }
  }
`
export {
  addGlCode,
  addSubGrpGlCode,
  getSubGroupsByGroupCode,
  getRecCounts,
  getMaxLevel1,
  getMaxLevel2,
  getMaxLevel3,
  getMaxLevel4,
}
