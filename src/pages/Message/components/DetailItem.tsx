import React from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import stateModel from '@/models/state'
import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import AccountCircle from '@material-ui/icons/AccountCircle'

import {IMessageContent} from '@gemini'
import dayjs from 'dayjs'
import { navigate } from '@/utils/history'

const ListItemS = muiStyled(ListItem)({
  flexShrink: 0,
})

const ListItemAvatarS = muiStyled(ListItemAvatar)({
  alignSelf: 'flex-start',
})

const MessageRoot = styled.div`
  width: 50%;
  max-width: 30em;
  min-width: 15em;
  display: flex;
  flex-direction: column;
  padding: 0 1em;
`

const MessageContent = styled.div`
  background-color: #eee;
  line-height: 2em;
  padding: 0.25em 0.5em;
  position: relative;
  font-size: 0.85em;
  border-radius: 3px;
  min-height: 3em;
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  word-break: break-all;
`

const MessageContentLeft = styled(MessageContent)`
  &::before {
    content: '';
    border-style: solid;
    border-width: 0.5em 0.5em 0.5em 0;
    border-color: transparent;
    border-right-color: #eee;
    left: -0.4em;
    position: absolute;
    top: 1em;
  }
`

const MessageContentRight = styled(MessageContent)`
  &::after {
    content: '';
    border-style: solid;
    border-width: 0.5em 0 0.5em 0.5em;
    border-color: transparent;
    border-left-color: #eee;
    right: -0.4em;
    position: absolute;
    top: 1em;
  }
`

const MessageDate = styled.span<{ right?: boolean }>`
  color: #aaa;
  font-size: 0.7em;
  align-self: ${props => (props.right ? 'flex-end' : '')};
`

interface Props {
  message: IMessageContent
}

// TODO: 消息气泡
const renderItem = (message: IMessageContent,  isCurrSend: boolean) =>
  !isCurrSend ? (
    <ListItemS button>
      <AccountCircle />
      <MessageRoot>
        <MessageContentLeft>{message.content}</MessageContentLeft>
        <MessageDate right>{dayjs(message.time).format('YYYY-MM-DD HH:mm:ss')}</MessageDate>
      </MessageRoot>
    </ListItemS>
  ) : (
    <ListItemS button>
      <ListItemText />
      <MessageRoot>
        <MessageContentRight>{message.content}</MessageContentRight>
        <MessageDate>{dayjs(message.time).format('YYYY-MM-DD HH:mm:ss')}</MessageDate>
      </MessageRoot>
      <AccountCircle />
    </ListItemS>
  )

export default ({ message }: Props) => {
  const { myInfo } = useModel(stateModel)
  if(!myInfo)return
  return renderItem(message, myInfo.username === message.senderName)
}
