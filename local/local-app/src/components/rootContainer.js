import React, { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import { useSelector } from 'react-react'

const Home = lazy(() => import('./home'))
const Register = lazy(() => import('./register'))
const Login = lazy(() => import('./login'))
const Blogs = lazy(() => import('./blog'))
// const Profile = lazy(() => import('./containers/profile'))
// const IssueScreen = lazy(() => import('./containers/issueScreen'))
// const LayoutScreen = lazy(() => import('./containers/layoutScreen'))
// const EstimationScreen = lazy(() => import('./containers/estimationScreen'))
// const ResultScreen = lazy(() => import('./containers/resultScreen'))
// const ErrorPage = lazy(() => import('./containers/errorPage'))

function Router() {
return (
    <div className={`main_container`}>
      <Switch>
        <Redirect from="//*" to="/*" />
        <Route exact path="/" component={Home} />
         <Route exact path="/register" component={Register} />
         <Route exact path="/login" component={Login} />
         <Route exact path="/blogs" component={Blogs} />
      </Switch>
    </div>
  )
}
export default Router
