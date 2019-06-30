import React from 'react'
// https://reach.tech/router/api/Router
import { Router, RouteComponentProps, WindowLocation } from '@reach/router'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Issue from '@/pages/Issue'
import Message from '@/pages/Message/List'
import MessageDetail from '@/pages/Message/Detail'
import Buy from '@/pages/Buy'

export const Route: React.FC<
  RouteComponentProps & {
    // @types/react 里 createElement 签名很混乱
    component: any
    // component: React.FC<any>
  }
> = props => {
  const { path, component, ...otherProps } = props

  return React.createElement(component, otherProps)
}

export interface ILocation {
  location: WindowLocation
}

const MyRouter: React.FC<ILocation> = ({ location }) => (
  <Router location={location}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/issue' component={Issue} />
    <Route path='/message' component={Message} />
    <Route path="/messageDetail/:id" component={MessageDetail} />
    <Route path="/buy" component={Buy} />
  </Router>
)

export default React.memo(({ location }: ILocation) => <MyRouter location={location} />)
