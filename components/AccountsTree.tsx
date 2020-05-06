import gql from 'graphql-tag'
import { useState } from 'react'
import { Tree, Input } from 'antd'
import { useQuery } from '@apollo/react-hooks'

const { Search } = Input

// todo: move out
const MAX_LEVEL: number = 4

// check why (query getAccounts) is not working while it's required
// for mutations
const query_test = gql`
  {
    coa: grpglcodesl2 {
      key: grpglcodel2
      title
      children: grpglcodes {
        key: grpglcode
        title
      }
    }
  }
`

const query = gql`
  {
    coa: grpglcodesl2 {
      key: grpglcodel2
      title
      children: grpglcodes {
        key: grpglcode
        title
        children: subgrpglcodes {
          key: subgrpglcode
          title
          children: glcodes {
            key: glcode
            title
          }
        }
      }
    }
  }
`

const getParent = (key, tree) => {
  let parent
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parent = { key: node.key, title: node.title }
      } else if (getParent(key, node.children)) {
        parent = getParent(key, node.children)
      }
    }
  }
  return parent
}

const AccountsTree = () => {
  const [treeData, setTreeData] = useState([])
  const [init, setInit] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [expandedKeys, setExpandedKeys] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(false)
  const [dataList, setDataList] = useState([])

  const _list = []
  const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const { key } = node
      _list.push({ key, title: node.title })
      if (node.children) {
        generateList(node.children)
      }
    }
  }

  const onSelect = (selectedKeys, info) => {
    let level: number = 1
    const title = dataList
      .filter((item) => item.key === info.node.key)
      .map((node) => node.title)
    const result = []
    let current: any = { key: info.node.key, title: title[0] }
    let selected = current
    result.push(current)
    while (current) {
      let _parent = getParent(current.key, treeData)
      if (_parent && _parent.key !== '0') {
        //console.log(`key: ${_parent.key}, title: ${_parent.title}`)
        result.push(_parent)
        level++
      }
      current = _parent
    }
    if (level === MAX_LEVEL) {
      let account = result[0]
      // fetch account details
      //  use some dummy props for now
      const details = { type: 'seller', address: 'dhahran' }
      result[0] = { ...account, ...details }
    }
    // reverse the array
    const data = []
    for (let j = result.length - 1, i = 0; j >= 0; ) {
      data[i++] = result[j--]
    }
    console.log('==> ', data)
  }

  const onExpand = (_expandedKeys) => {
    setExpandedKeys(_expandedKeys)
    setAutoExpandParent(false)
  }

  const onSearch = (value) => {
    const _expandedKeys = dataList
      .map((item) => {
        if (item.title.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          return getParent(item.key, treeData).key
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    //console.log(_expandedKeys);
    setSearchValue(value)
    setExpandedKeys(_expandedKeys)
    setAutoExpandParent(true)
  }
  const loop = (data) =>
    data.map((item) => {
      const searchLength = searchValue.length
      const index = item.title.toUpperCase().indexOf(searchValue.toUpperCase())
      const beforeStr = item.title.substr(0, index)
      const highlightStr = item.title.substr(index, searchLength)
      const afterStr = item.title.substr(index + searchLength)
      const title =
        searchLength > 0 && index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{highlightStr}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        )
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) }
      }

      return {
        title,
        key: item.key,
      }
    })
  const formatData = (data) => {
    let tree = [
      {
        key: '0',
        title: 'Chart of Account',
        children: data,
      },
    ]

    setTimeout(() => {
      generateList(tree)
      setDataList(_list)
      console.warn('datalist ' + dataList.length)
      setTreeData(tree)
      setInit(true)
    }, 100)
  }

  const { loading, data, error } = useQuery(query)
  if (loading || !data) {
    return <div>Loading data...</div>
  }
  if (error) {
    return <div>Error..</div>
  }
  if (data) {
    if (!init) formatData(data.coa)
    return (
      <div>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search"
          enterButton={true}
          onSearch={onSearch}
        />

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
    )
  }
}

export default AccountsTree
