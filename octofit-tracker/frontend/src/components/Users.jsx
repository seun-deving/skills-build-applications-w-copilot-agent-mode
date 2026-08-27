import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState, ResourceView } from './shared.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchResource(usersEndpoint, controller.signal).then(setUsers).then(() => setStatus('ready')).catch((requestError) => {
      if (requestError.name !== 'AbortError') { setError(requestError.message); setStatus('error') }
    })
    return () => controller.abort()
  }, [])

  return (
    <ResourceView title="Community" description="Meet the people moving with OctoFit">
      <ResourceState status={status} error={error} hasItems={users.length > 0} empty="No users have joined yet." />
      {status === 'ready' && users.length > 0 && <div className="row g-3">{users.map((user) => <div className="col-md-6" key={user._id ?? user.username}><article className="resource-card h-100"><div className="avatar">{(user.firstName?.[0] ?? user.username?.[0] ?? '?').toUpperCase()}</div><h2>{user.firstName} {user.lastName}</h2><p>@{user.username}</p><strong>{user.points ?? 0} points</strong></article></div>)}</div>}
    </ResourceView>
  )
}

export default Users
