import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState, ResourceView } from './shared.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchResource('teams', controller.signal).then(setTeams).then(() => setStatus('ready')).catch((requestError) => {
      if (requestError.name !== 'AbortError') { setError(requestError.message); setStatus('error') }
    })
    return () => controller.abort()
  }, [])

  return (
    <ResourceView title="Teams" description="Find your crew and chase the next milestone">
      <ResourceState status={status} error={error} hasItems={teams.length > 0} empty="No teams have been created yet." />
      {status === 'ready' && teams.length > 0 && <div className="row g-3">{teams.map((team) => (
        <div className="col-md-6" key={team._id ?? team.name}><article className="resource-card h-100"><span className="eyebrow">Team</span><h2>{team.name}</h2><p>{team.description}</p><strong>{team.totalPoints ?? 0} points</strong><span className="muted-line">{team.members?.length ?? 0} members</span></article></div>
      ))}</div>}
    </ResourceView>
  )
}

export default Teams
