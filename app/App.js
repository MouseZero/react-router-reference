import React, {Component} from 'react'
import {Router, Route, Link, IndexRoute,
  hashHistory, browserHistory, IndexLink} from 'react-router'

class App extends Component {
  render(){
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Home} />
          <Route path='/namedComponents' component={NamedComponents}>
            <IndexRoute components={{title: Title, subTitle: SubTitle}} />
          </Route>
          <Route path='/address' component={Address}>
            <IndexRoute component={TwitterFeed} />
            <Route path='instagram' component={Instagram} />
            <Route path='query' component={Query} />
          </Route>
          <Route path='/about(/:name)' component={About} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}

const Query = (props) => (
  <h2>{props.location.query.message}</h2>
)

const Home = () => <h3>Hello from Home!</h3>
const About = (props) => (
  <div>
    <h3>Welcome to the About Page</h3>
    {props.params.name && <h2>Hello, {props.params.name}</h2>}
  </div>
)
const Address = (props) => {
  return (
    <div>
      <h1>Address</h1>
      <br />
      <Link to='/address'>Twitter Feed</Link>&nbsp;
      <Link to='/address/instagram'>Instagram Feed</Link>
      <h2>We are located at 555 Jackson St.</h2>
      {props.children}
    </div>
  )
}
const TwitterFeed = () => <h1>Twitter Feed</h1>
const Instagram = () => <h1>Instagram Feed</h1>

const NotFound = () => (
  <h1>404.. This page is not found!</h1>
)

const Nav = () => (
  <div>
    <IndexLink onlyActiveOnIndex activeClassName='active' to='/'>
    Home
    </IndexLink>&nbsp;
    <IndexLink activeClassName='active' to='/address'>Address</IndexLink>&nbsp;
    <IndexLink activeClassName='active' to='/about'>About</IndexLink>&nbsp;
    <IndexLink activeClassName='active' to='namedComponents'>
      Named Components
    </IndexLink>&nbsp;
    <IndexLink
      activeClassName='active'
      to={{
        pathname: '/address/query',
        query: { message: 'Hello from Route Query' }
      }}>Route Query</IndexLink>
  </div>
)

const Container = (props) => (
  <div>
    <Nav />
    {props.children}
  </div>
)

const Title = () => (
  <h1>Hello from Title Component</h1>
)
const SubTitle = () => (
  <h1>Hello from SubTitle Component</h1>
)

const NamedComponents = (props) => (
  <div>
    {props.title}<br />
    {props.subTitle}
  </div>
)

export default App
