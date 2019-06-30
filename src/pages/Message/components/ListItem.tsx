import React from 'react'
import styled from 'styled-components'
import { navigate } from '@/utils/history'
import { IRecentMessage } from '@gemini'
import dayjs from 'dayjs'
import AccountCircle from '@material-ui/icons/AccountCircle'
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'

import useFetcher from '@/hooks/useFetcher'

const Text = styled.span`
  display: block;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

interface Props {
  message: IRecentMessage
}

const navigateToDetail = (userId: number) => navigate(`/messageDetail/${userId}`)

export default ({ message }: Props) => {

  return (
    <ListItem button onClick={() => navigateToDetail(message.userId)}>
      <ListItemAvatar>
        <AccountCircle />
      </ListItemAvatar>
      <ListItemText primary={message.username} secondary={<Text>{message.lastContent}</Text>} />
      <ListItemSecondaryAction>
        <ListItemText secondary={dayjs(message.time).fromNow()} />
      </ListItemSecondaryAction>
    </ListItem>
  )
}
