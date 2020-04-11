import gql from "graphql-tag";
import { Query } from "react-apollo";
import withData from "../config";
import { useState } from "react";
import { Tree } from "antd";

const query = gql`{
  coa:grpglcodesl2 {
    key: grpglcodel2
    title
    children: grpglcodesl2_grpglcodes {
      key: grpglcode
      title
      children: grpglcodes_subgrpglcodes {
        key: subgrpglcode
        title
        children: subgrpglcodes_glcodes {
          key: glcode
          title
        }
      }
    }
  }
}`;

const onSelect = () => {};

const AccountsTree = () => {
  const [treeData, setTreeData] = useState([]);
  const [init, setInit] = useState(false);

  const formatData = data => {
    let tree = [
      {
        key: "000000",
        title: "Chart of Account",
        children: data
      }
    ];

    setTimeout(() => {
      setTreeData(tree);
      setInit(true);
    }, 100);
  };
  return (
    <Query query={query} fetchPolicy={"cache-and-network"}>
      {({ loading, data, error }) => {
        if (loading) {
          return <div>Loading data...</div>;
        }
        if (error) {
          return <div>Error..</div>;
        }
        if (data) {
          if (!init) formatData(data.coa);
          return (
              <Tree
                defaultExpandAll={false}
                draggable={true}
                selectable={true}
                showLine={true}
                showIcon={false}
                onSelect={onSelect}
                treeData={treeData}
              />
          );
        }
      }}
    </Query>
  );
};

export default withData(AccountsTree);
