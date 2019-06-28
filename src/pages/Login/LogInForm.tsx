import React, { useState } from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import {
  Button,
  CircularProgress,
  FormControl,
  // FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core'

import userModel from '@/models/state'

import { loginHandler } from '@/services/utils/errorHandler'

import img from '@/assets/login.png'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`

const SnowballImg = styled.img`
  width: 100px;
  margin-bottom: 30px;
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
`

const LogInButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  marginTop: 35,
  width: 150
})

const RegisterButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'secondary',
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

interface FormField {
  username: string
  password: string
}

interface LogInState {
  loading: boolean
  logInFail: boolean
}

const LogIn: React.FC = () => {
  const [formField, setFormField] = useState<FormField>({
    username: '',
    password: '',
  })

  const [logInState, setLogInState] = useState<LogInState>({
    loading: false,
    logInFail: false,
  })

  const handleChange = (field: keyof FormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormField({
      ...formField,
      [field]: event.target.value,
    })
  }

  const logIn = async () => {
    const { username, password } = formField

    setLogInState({
      loading: true,
      logInFail: false,
    })

    const token = await userModel.LOG_IN(username, password)

    token
      .fail(err => {
        setTimeout(() => {
          setLogInState({
            loading: false,
            logInFail: true,
          })
        }, 2000)

        loginHandler(err)
      })
      .succeed(_ => {
        setTimeout(() => navigate('/'), 1500)
      })
  }

  const register = () => navigate('/register')

  const { logInFail, loading } = logInState

  return (
    <WrapperDiv>
       <Typography variant="h4">登录</Typography>
      <Div>
        <img style={{ width: '500px' }} src={img} />
        <WrapperDiv>

          <FormDiv>
            <FormControl fullWidth style={{ marginTop: '60px' }}>
              <InputLabel htmlFor="username">用户名</InputLabel>
              <Input id="username" value={formField.username} onChange={handleChange('username')} />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '30px' }}>
              <InputLabel htmlFor="password">密码</InputLabel>
              <Input
                id="password"
                type="password"
                value={formField.password}
                onChange={handleChange('password')}
              />
            </FormControl>

          <Div style={{ justifyContent: 'space-between', width: '350px' }}>
            <LogInButton disabled={loading} onClick={logIn}>
              {logInFail ? '重试' : '登录'}
              {loading && <ButtonProgress />}
            </LogInButton>
            <RegisterButton onClick={register}>
              注册
      </RegisterButton>
          </Div>
          </FormDiv>
        </WrapperDiv>
      </Div>
    </WrapperDiv>
  )
}

export default LogIn
