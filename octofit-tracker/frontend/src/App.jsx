import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Community'],
  ['/workouts', 'Workouts'],
]

function Overview() {
  return (
    <section className="overview">
      <span className="eyebrow">Your movement, made visible</span>
      <h1>Small steps.<br /><em>Big momentum.</em></h1>
      <p className="overview-copy">Track your effort, find your people, and keep the next good choice close at hand.</p>
      <div className="overview-links">{navigation.slice(1, 4).map(([path, label]) => <NavLink className="overview-link" to={path} key={path}><span>{label}</span><span aria-hidden="true">-&gt;</span></NavLink>)}</div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/"><span className="brand-mark">O</span><span>OctoFit</span></NavLink>
        <nav className="main-nav" aria-label="Main navigation">{navigation.map(([path, label]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}</nav>
      </header>
      <main><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
      <footer><span>OCTOFIT / 2026</span><span>Move with intention.</span></footer>
    </div>
  )
}

export default App
