import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import {
  getMaxLevel1,
  getMaxLevel2,
  getMaxLevel3,
  getMaxLevel4,
} from '../queries/accounts'

// todo: add enum for parameters
export const useAll = () => {
  const [maxNum, setMaxNum] = useState(0)
  const [curLevel, setLevel] = useState(0)
  const [tick, setTick] = useState(1)

  // todo: fix skip logic
  const level1 = useQuery(getMaxLevel1, { skip: false })
  const level2 = useQuery(getMaxLevel2, { skip: false })
  const level3 = useQuery(getMaxLevel3, { skip: false })
  const level4 = useQuery(getMaxLevel4, { skip: false })

  useEffect(() => {
    if (curLevel === 1 && level1.data) setMaxNum(+level1.data.result[0].max)
    if (curLevel === 2 && level2.data) setMaxNum(+level2.data.result[0].max)
    if (curLevel === 3 && level3.data) setMaxNum(+level3.data.result[0].max)
    if (curLevel === 4 && level4.data) setMaxNum(+level4.data.result[0].max)
  }, [tick])

  // todo: refactor to remove duplication
  const invoke = (level: number, parent?: string): void => {
    if (level === curLevel) return

    if (level === 1) level1.refetch()
    if (level === 2) level2.refetch({ val: parent })
    if (level === 3) level3.refetch({ val: parent })
    if (level === 4) level4.refetch({ val: parent })
    setLevel(level)
    setTick(tick + 1)
  }

  return { maxNum, invoke }
}
