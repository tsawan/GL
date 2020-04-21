import gql from "graphql-tag";
import { useState } from "react";
import { Tree, Input } from "antd";
import { useQuery } from '@apollo/react-hooks';

const { Search } = Input;

// check why (query getAccounts) is not working while it's required
// for mutations
const query_test = gql`{
    coa:grpglcodesl2 {
      key: grpglcodel2
      title
      children: grpglcodes {
      key: grpglcode
      title
    }
  }
}`;

const query = gql`{
  coa:grpglcodesl2 {
    key: grpglcodel2
    title
    children: grpglcodes {
      key: grpglcode
      title
      children: subgrpglcodes {
        key:subgrpglcode
        title
        children: glcodes {
          key:glcode
          title
        }
      }
    }
}
}`;

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const onSelect = (selectedKeys, info) => {
  console.log(info.node);
};

const AccountsTree = () => {
  const [treeData, setTreeData] = useState([]);
  const [init, setInit] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(false);
  const [dataList, setDataList] = useState([])

  const _list = [];
  const generateList = data => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      _list.push({ key, title: node.title });
      if (node.children) {
        generateList(node.children);
      }
    }
  };

  const onExpand = _expandedKeys => {
    setExpandedKeys(_expandedKeys);
    setAutoExpandParent(false);
  };

  const onSearch = value => {

    const _expandedKeys = dataList
      .map(item => {
        if (item.title.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    //console.log(_expandedKeys);
    setSearchValue(value);
    setExpandedKeys(_expandedKeys);
    setAutoExpandParent(true);
  };
  const loop = data =>
    data.map(item => {
      const searchLength = searchValue.length;
      const index = item.title.toUpperCase().indexOf(searchValue.toUpperCase());
      const beforeStr = item.title.substr(0, index);
      const highlightStr = item.title.substr(index, searchLength);
      const afterStr = item.title.substr(index + searchLength);
      const title =
        ((searchLength > 0) && (index > -1)) ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{highlightStr}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });
  const formatData = data => {
    let tree = [
      {
        key: "000000",
        title: "Chart of Account",
        children: data
      }
    ];

    setTimeout(() => {
      generateList(tree);
      setDataList(_list);
      console.warn('datalist ' + dataList.length);
      setTreeData(tree);
      setInit(true);
    }, 100);
  };

  const { loading, data, error } = useQuery(query);
  if (loading || !data) {
    return <div>Loading data...</div>;
  }
  if (error) {
    return <div>Error..</div>;
  }
  if (data) {
    if (!init) formatData(data.coa);
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" enterButton={true}
          onSearch={onSearch} />

        <Tree
          defaultExpandAll={false}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          draggable={true}
          selectable={true}
          showLine={true}
          showIcon={false}
          onSelect={onSelect}
          treeData={loop(treeData)}
        />
        </div>
    );
  }
};

export default AccountsTree;
