import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
  getMaxLevel1,
  getMaxLevel2,
  getMaxLevel3,
  getMaxLevel4,
} from '../queries/accounts'

// todo: add enum for parameters
export const useMaxNumber = () => {
  const [maxNumber, setMaxNumber] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(0)

  const level1 = useQuery(getMaxLevel1, { skip: currentLevel != 1 })
  const level2 = useQuery(getMaxLevel2, { skip: currentLevel != 2 })
  const level3 = useQuery(getMaxLevel3, { skip: currentLevel != 3 })
  const level4 = useQuery(getMaxLevel4, { skip: currentLevel != 4 })

  useEffect(() => {
    if (currentLevel === 0) return
    if (level1.data) setMaxNumber(+level1.data.result[0].max)
    else if (level2.data) setMaxNumber(+level2.data.result[0].max)
    else if (level3.data) setMaxNumber(+level3.data.result[0].max)
    else if (level4.data) setMaxNumber(+level4.data.result[0].max)
  }, [level1.data, level2.data, level3.data, level4.data])

  // todo: refactor to remove duplication
  const fetchMaxNumber = (level: number, parent?: string): void => {
    if (level === currentLevel) return
    level1.data = level2.data = level3.data = level4.data = undefined

    if (level === 1) level1.refetch()
    else if (level === 2) level2.refetch({ val: parent })
    else if (level === 3) level3.refetch({ val: parent })
    else if (level === 4) level4.refetch({ val: parent })
    setCurrentLevel(level)
  }

  return { maxNumber, fetchMaxNumber }
}
