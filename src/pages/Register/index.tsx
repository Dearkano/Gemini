import React, { useState } from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'
import LayoutCenter from '@/components/LayoutCenter'
import validate from '@/utils/validate'
import rules from './rules'
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core'
import {register} from '@/services/register'

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
const RegisterButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  marginTop: 35,
  width: 150
})
const ButtonProgress = muiStyled(CircularProgress).attrs({
  size: 20,
  color: 'secondary',
})({
  marginLeft: 15,
})

export interface FormField {
  username: string
  password: string
  confirmPassword: string
  email: string
  address: string
}

interface RegisterState {
  loading: boolean
  registerFail: boolean
}

const Register: React.FC = () => {
  const [formField, setFormField] = useState<FormField>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    address: ''
  })

  const [errMessage, setErrMessage] = useState<FormField>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    address: ''
  })

  const [registerState, setRegisterState] = useState<RegisterState>({
    loading: false,
    registerFail: false,
  })

  const handleChange = (field: keyof FormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormField({
      ...formField,
      [field]: event.target.value,
    })
  }
  const { registerFail, loading } = registerState
  const handleRegister = async () => {
    let params = Object.assign({}, formField)
    delete params.confirmPassword
    const res= await register(params)
    res.map(d=>navigate('/'))
  }
  const handleCheck = (field: string) => {
    if (field === 'username') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          username: formField.username
        }
      });
      setErrMessage({...errMessage ,username: errInfo.errors[0].message.errMsg})
    } else if (field === 'email') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          email: formField.email
        }
      });
      setErrMessage({...errMessage ,email: errInfo.errors[1].message.errMsg})
    } else if (field === 'password') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          password: formField.password
        }
      });
      setErrMessage({...errMessage ,password: errInfo.errors[2].message.errMsg})
    } else if (field === 'confirmPassword') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          confirmPassword: [formField.password, formField.confirmPassword]
        }
      });
      setErrMessage({...errMessage ,confirmPassword: errInfo.errors[3].message.errMsg})
    }else if (field === 'address') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          address: formField.address
        }
      });
      setErrMessage({...errMessage ,address: errInfo.errors[4].message.errMsg})
    }
  }
  return (
    <LayoutCenter style={{alignItems: 'flex-start', marginTop: '200px'}}>
      <WrapperDiv>
        <Typography variant="h4">注册</Typography>

        <FormDiv>

          <FormControl fullWidth style={{ marginTop: '60px' }}>
            <InputLabel htmlFor="username">用户名</InputLabel>
            <Input onBlur={() => handleCheck('username')} id="username" value={formField.username} onChange={handleChange('username')} />
            <FormHelperText error={true} id="name-simple">{errMessage.username}</FormHelperText>
          </FormControl>

          <FormControl fullWidth style={{ marginTop: '60px' }}>
            <InputLabel htmlFor="password">密码</InputLabel>
            <Input type="password" onBlur={()=>handleCheck('password')} id="password" value={formField.password} onChange={handleChange('password')} />
            <FormHelperText error={true}  id="name-simple">{errMessage.password}</FormHelperText>
          </FormControl>

          <FormControl fullWidth style={{ marginTop: '60px' }}>
            <InputLabel htmlFor="confirmPassword">确认密码</InputLabel>
            <Input type="password" onBlur={()=>handleCheck('confirmPassword')} id="confirmPassword" value={formField.confirmPassword} onChange={handleChange('confirmPassword')} />
            <FormHelperText error={true} id="name-simple">{errMessage.confirmPassword}</FormHelperText>
          </FormControl>

          <FormControl fullWidth style={{ marginTop: '60px' }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input type="email" onBlur={()=>handleCheck('email')} id="email" value={formField.email} onChange={handleChange('email')} />
            <FormHelperText error={true}  id="name-simple">{errMessage.email}</FormHelperText>
          </FormControl>

          <FormControl fullWidth style={{ marginTop: '60px' }}>
            <InputLabel htmlFor="address">地址</InputLabel>
            <Input onBlur={()=>handleCheck('address')} id="address" value={formField.address} onChange={handleChange('address')} />
            <FormHelperText error={true}  id="name-simple">{errMessage.address}</FormHelperText>
          </FormControl>

          <RegisterButton disabled={loading} onClick={handleRegister}>
            {registerFail ? '重试' : '注册'}
            {loading && <ButtonProgress />}
          </RegisterButton>
        </FormDiv>
      </WrapperDiv>
    </LayoutCenter>
  )
}

export default Register
