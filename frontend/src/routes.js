import Home from './components/Home'
import Host from './components/Host'
import Guest from './components/Guest'
import Result from './components/Result'

export default [
  { path: '/', component: Home },
  { path: '/host', component: Host },
  { path: '/guest', component: Guest },
  { path: '/result', component: Result },
]