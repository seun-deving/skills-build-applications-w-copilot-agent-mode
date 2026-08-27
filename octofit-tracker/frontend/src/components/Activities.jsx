import { useEffect, useState } from 'react'
import { fetchResource, formatDate } from '../api.js'
import { ResourceState, ResourceView } from './shared.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchResource('activities', controller.signal)
      .then(setActivities)
      .then(() => setStatus('ready'))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
          setStatus('error')
        }
      })
    return () => controller.abort()
  }, [])

  return (
    <ResourceView title="Activity log" description="Recent movement and earned points">
      <ResourceState status={status} error={error} hasItems={activities.length > 0} empty="No activities recorded yet." />
      {status === 'ready' && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>Type</th><th>Duration</th><th>Points</th><th>Completed</th></tr></thead>
            <tbody>{activities.map((activity) => (
              <tr key={activity._id ?? `${activity.type}-${activity.completedAt}`}>
                <td className="text-capitalize fw-semibold">{activity.type ?? 'Activity'}</td>
                <td>{activity.durationMinutes ?? 0} min</td>
                <td>{activity.points ?? 0}</td>
                <td>{formatDate(activity.completedAt)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </ResourceView>
  )
}

export default Activities
