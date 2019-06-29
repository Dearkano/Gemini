import React, { useState } from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { uploadImage } from '@/services/qiniu'
import uploadIcon from '@/assets/upload.png'
import validate from '@/utils/validate'
import rules from './rules'
import { uploadBook } from '@/services/book'
import {
  Button,
  CircularProgress,
  FormControl,
  // FormHelperText,
  Input,
  InputLabel,
  Typography,
  Select,
  Menu,
  MenuItem,
  TextField,
  FormHelperText
} from '@material-ui/core'

import userModel from '@/models/state'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  height: 130px;
`
const Div = styled.div`
  display: flex;
  align-items:center;
  width:320px;
`

const SubmitButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  marginTop: 35,
  width: 150
})
const UploadButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  width: 150
})

const ButtonProgress = muiStyled(CircularProgress).attrs({
  size: 20,
  color: 'secondary',
})({
  marginLeft: 15,
})


interface FormField {
  name: string
  class: number
  origin_price: number
  price: number
  introduction: string
  url: string
  imgUrl: string
}

interface SubmitState {
  submitFail: boolean
  loading: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      width: 320,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const LayoutCenter = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  align-items:center;
  padding-top:20px;
`

export default () => {
  const classes = useStyles();
  const [formField, setFormField] = useState<FormField>({
    name: '',
    class: 1,
    origin_price: 0,
    price: 0,
    introduction: '',
    url: '',
    imgUrl: ''
  })
  const [errMessage, setErrMessage] = useState<FormField>({
    name: '',
    class: 1,
    origin_price: 0,
    price: 0,
    introduction: '',
    url: '',
    imgUrl: ''
  })
  const [submitState, setSubmitState] = useState<SubmitState>({
    loading: false,
    submitFail: false,
  })
  const { loading, submitFail } = submitState

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => setFormField({ ...formField, class: Number(event.target.value) })

  const handleCheck = (field: string) => {
    if (field === 'name') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          name: formField.name
        }
      });
      setErrMessage({...errMessage ,name: errInfo.errors[0].message.errMsg})
    } else if (field === 'origin_price') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          origin_price: formField.origin_price
        }
      });
      setErrMessage({...errMessage ,origin_price: errInfo.errors[1].message.errMsg})
    } else if (field === 'price') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          price: formField.price
        }
      });
      setErrMessage({...errMessage ,price: errInfo.errors[2].message.errMsg})
    } else if (field === 'introduction') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          introduction: formField.introduction
        }
      });
      setErrMessage({...errMessage ,introduction: errInfo.errors[3].message.errMsg})
    }  else if (field === 'url') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          url: formField.url
        }
      });
      setErrMessage({...errMessage ,url: errInfo.errors[4].message.errMsg})
    }
  }

  const handleChange = (field: keyof FormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormField({
      ...formField,
      [field]: event.target.value,
    })
  }

  const submit = async () => {
    const response = await uploadImage(files)
    setSubmitState({
      loading: true,
      submitFail: false
    })
    if (response.status === 200) {
      const data = await response.json()
      const url = `http://cdn.vaynetian.com/${data.key}`
      const params = {
        ...formField,
        imgUrl: url,
        origin_price: Number(formField.origin_price),
        price: Number(formField.price)
      }
      const res = await uploadBook(params)
      res.fail(() => setSubmitState({
        loading: false,
        submitFail: false
      })).succeed(() => setSubmitState({
        loading: false,
        submitFail: false
      }))
    } else {
      setSubmitState({
        loading: false,
        submitFail: true
      })
    }
  }

  const [files, setFiles] = useState<Array<any> | null>(null)
  const handleFileChange = (e: any) => {
    setFiles(e.target.files)
  }

  return (
    <LayoutCenter>
      <WrapperDiv>
        <Typography variant="h4">发布图书</Typography>

        <FormDiv>
          <FormControl className={classes.formControl} style={{ marginTop: '60px' }}>
            <InputLabel htmlFor="name">书名</InputLabel>
            <Input onBlur={() => handleCheck('name')} id="name" value={formField.name} onChange={handleChange('name')} />
            <FormHelperText error={true}  id="name-simple">{errMessage.name}</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">类别</InputLabel>
            <Select
              value={formField.class}
              onChange={handleSelectChange}
              inputProps={{
                name: 'age',
                id: 'age-simple',
              }}
            >
              <MenuItem value={1}>网络文学</MenuItem>
              <MenuItem value={2}>教育</MenuItem>
              <MenuItem value={3}>小说</MenuItem>
              <MenuItem value={4}>文艺</MenuItem>
              <MenuItem value={5}>青春文学</MenuItem>
              <MenuItem value={6}>动漫</MenuItem>
              <MenuItem value={7}>童书</MenuItem>
              <MenuItem value={8}>人文社科</MenuItem>
              <MenuItem value={9}>经管</MenuItem>
              <MenuItem value={10}>成功</MenuItem>
              <MenuItem value={11}>生活</MenuItem>
              <MenuItem value={12}>外语</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="url">外部链接（当当/京东/Amazon）</InputLabel>
            <Input onBlur={() => handleCheck('url')}  id="url" value={formField.url} onChange={handleChange('url')} />
            <FormHelperText error={true}  id="name-simple">{errMessage.url}</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
             onBlur={() => handleCheck('origin_price')}
              label="原价"
              onChange={handleChange('origin_price')}
              type="number" />
                    <FormHelperText error={true}  id="name-simple">{errMessage.origin_price}</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
            onBlur={() => handleCheck('price')}
              label="卖价"
              onChange={handleChange('price')}
              type="number" />
                    <FormHelperText error={true}  id="name-simple">{errMessage.price}</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <Div>
              <Typography style={{ color: 'rgba(0,0,0,0.54)' }} variant="body1">上传图片</Typography>
              <input id='upload-image' style={{ display: 'none' }} type="file" onChange={handleFileChange} />
              <label htmlFor='upload-image'><img style={{ width: '30px', marginLeft: '20px' }} src={uploadIcon} /></label>
            </Div>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
            onBlur={() => handleCheck('introduction')}
              id="outlined-multiline-flexible"
              label="书籍简介"
              multiline
              rowsMax="10"
              rows="5"
              value={formField.introduction}
              onChange={handleChange('introduction')}
              margin="normal"
              variant="outlined"
            />
            <FormHelperText error={true}  id="name-simple">{errMessage.introduction}</FormHelperText>
          </FormControl>

          <SubmitButton disabled={loading} onClick={submit}>
            {submitFail ? '重试' : '发布'}
            {loading && <ButtonProgress />}
          </SubmitButton>
        </FormDiv>
      </WrapperDiv >
    </LayoutCenter>
  )
}
