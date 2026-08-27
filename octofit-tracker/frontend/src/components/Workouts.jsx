import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState, ResourceView } from './shared.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchResource('workouts', controller.signal).then(setWorkouts).then(() => setStatus('ready')).catch((requestError) => {
      if (requestError.name !== 'AbortError') { setError(requestError.message); setStatus('error') }
    })
    return () => controller.abort()
  }, [])

  return (
    <ResourceView title="Workouts" description="A little structure for your next strong day">
      <ResourceState status={status} error={error} hasItems={workouts.length > 0} empty="No workouts are available yet." />
      {status === 'ready' && workouts.length > 0 && <div className="row g-3">{workouts.map((workout) => <div className="col-md-6" key={workout._id ?? workout.title}><article className="resource-card h-100"><span className="eyebrow text-capitalize">{workout.category ?? 'Training'} / {workout.difficulty ?? 'all levels'}</span><h2>{workout.title}</h2><p>{workout.description}</p><strong>{workout.durationMinutes ?? 0} min</strong></article></div>)}</div>}
    </ResourceView>
  )
}

export default Workouts
