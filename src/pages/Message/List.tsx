import React from 'react'
import styled from 'styled-components'
import useInfList from '@/hooks/useInfList'
import InfiniteList from '@/components/InfiniteList'

import { List } from '@material-ui/core'

import ListItem from './components/ListItem'

import { getRecentMessage } from '@/services/message'

const Root = styled.div`
  display: flex;
  width: 100%;
  justify-content:center;
  min-width:300px;
`
/**
 * 私信-联系人列表
 */
export default () => {
  const [recentList, state, callback] = useInfList(getRecentMessage)
  const { isEnd, isLoading } = state

  return (
    <Root>
    <List>
      <InfiniteList isEnd={isEnd} isLoading={isLoading} callback={callback}>
        {recentList.map((item: any) => (
          <ListItem key={item.userId} message={item} />
        ))}
      </InfiniteList>
    </List>
    </Root>
  )
}
