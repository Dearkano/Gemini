import React from 'react'

import LayoutCenter from '@/components/LayoutCenter'

import LogInForm from './LogInForm'

import styled from 'styled-components'

const Div = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding-top:40px;
`

const LogIn: React.FC = () => (
  <Div>

<LogInForm />
  </Div>

)

export default LogIn
