import React, { useState, useEffect } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import PlusIcon from '@material-ui/icons/addCircle'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getBuyList, issueWish } from '@/services/buy'
import Wish from './wish'

const Root = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  align-items:center;
  padding-top: 15px;
`
interface FormField {
  bookName: string
  introduction: string
  price: number
}
export default () => {
  const [list, setList] = useState([])
  const [formField, setFormField] = useState<FormField>({
    bookName: '',
    introduction: '',
    price: 0
  })
  async function getAll() {
    const res = await getBuyList()
    res.map((l: any) => setList(l))
  }
  useEffect(() => {
    getAll()
  }, [])

  const add = async () => {
    await issueWish(formField)
    handleClose()
    await getAll()
  }
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = (field: keyof FormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormField({
      ...formField,
      [field]: event.target.value,
    })
  }

  const D = <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">求购</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="书名"
        onChange={handleChange('bookName')}
        fullWidth
      />

      <TextField
        label="价格"
        onChange={handleChange('price')}
        type="number" />
      <TextField
        multiline
        rowsMax="10"
        rows="3"
        margin="dense"
        id="name"
        label="简介"
        fullWidth
        onChange={handleChange('introduction')}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        取消
    </Button>
      <Button onClick={add} color="primary">
        提交
    </Button>
    </DialogActions>
  </Dialog>

  return (
    <Root>
      {D}
      <IconButton onClick={handleClickOpen} size="medium"><PlusIcon color="primary" /></IconButton>
      <List>
        {
          list && list.map((i: any) => (
            <ListItem>
              <Wish data={i} />
            </ListItem>
          ))
        }
      </List>
    </Root>
  )
}
