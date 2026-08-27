import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl })
})

const resources = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: Leaderboard,
  workouts: Workout,
} as const

for (const [resource, model] of Object.entries(resources)) {
  app.get(`/api/${resource}/`, async (_request, response) => {
    try {
      const documents = await model.find().sort({ createdAt: 1 }).lean()
      response.json(documents)
    } catch (error) {
      console.error(`Error reading ${resource}:`, error)
      response.status(500).json({ error: `Unable to load ${resource}` })
    }
  })
}

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit backend listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error)
    process.exit(1)
  })
