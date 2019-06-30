import React, { useState } from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import useInfList from '@/hooks/useInfList'
import InfiniteList from '@/components/InfiniteList'

import { List, Typography } from '@material-ui/core'
import useFetcher from '@/hooks/useFetcher'
import DetailItem from './components/DetailItem'
import Editor from './Editor'
import { getMessageContent, sendMessage } from '@/services/message'
import {getUserById} from '@/services/user'
const Root = styled.div`
  display: flex;
  width: 100%;
  justify-content:center;
`
const Div = styled.div`
  display: flex;
  justify-content:center;
  opacity: 0.54;
`
const ListS = muiStyled(List)({
  width: '100%',
  position: 'absolute',
  top: 86,
  bottom: 80,
  padding: '8px 0',
})

const FixBottomDiv = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
`
interface Props {
  /**
   * 联系人id (from url)
   */
  id: string
}

export default ({ id }: Props) => {
  const [messageListKey, setMessageListKey] = useState(0)

  return (
    <MessageList
      key={messageListKey}
      id={id}
      refresh={() => setMessageListKey(messageListKey + 1)}
    />
  )
}

/**
 * 私信-会话列表
 */
const MessageList = ({ id, refresh }: Props & { refresh: () => void }) => {
  const service = (from: number) => getMessageContent(id, from)
  const [user] = useFetcher<any>(()=>getUserById(id))
  const [list, state, callback] = useInfList(service, {
    step: 10,
  })

  const { isLoading, isEnd } = state

  const sendMsg = (content: string) => {
    sendMessage(id, content).then((res: any) => {
      res.fail().succeed((_: any) => {
        refresh()
        console.log(1)
      })
    })
  }

  return (
    <Root>
    <Div>{user && <Typography variant="h5">与{user.username}的对话</Typography>}</Div>
      <ListS>
        <InfiniteList
          reverse
          inFixedContainer
          isEnd={isEnd}
          isLoading={isLoading}
          callback={callback}
        >
          {list.map((item) => (
            <DetailItem key={item.id} message={item} />
          ))}
        </InfiniteList>
      </ListS>

      <FixBottomDiv>
        <Editor callback={sendMsg} />
      </FixBottomDiv>
    </Root>
  )
}
