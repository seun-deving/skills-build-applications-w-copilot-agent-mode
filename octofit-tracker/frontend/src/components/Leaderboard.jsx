import { useEffect, useState } from 'react'
import { displayName, fetchResource } from '../api.js'
import { ResourceState, ResourceView } from './shared.jsx'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchResource(leaderboardEndpoint, controller.signal)
      .then(setLeaders)
      .then(() => setStatus('ready'))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') { setError(requestError.message); setStatus('error') }
      })
    return () => controller.abort()
  }, [])

  return (
    <ResourceView title="Leaderboard" description="See who is setting the pace">
      <ResourceState status={status} error={error} hasItems={leaders.length > 0} empty="The leaderboard is waiting for its first score." />
      {status === 'ready' && leaders.length > 0 && (
        <div className="leader-list">{leaders.map((leader, index) => (
          <div className="leader-row" key={leader._id ?? leader.user?._id ?? index}>
            <span className="leader-rank">{leader.rank ?? index + 1}</span>
            <div className="flex-grow-1"><strong>{displayName(leader.user)}</strong><small>{displayName(leader.team, 'Independent')}</small></div>
            <strong>{leader.points ?? 0} pts</strong>
          </div>
        ))}</div>
      )}
    </ResourceView>
  )
}

export default Leaderboard
