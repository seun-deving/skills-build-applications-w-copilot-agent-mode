import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
/**
 * Replace the demo dataset so the script is safe to run repeatedly.
 */
async function seedDatabase() {
    try {
        await connectDatabase();
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.create([
            { username: 'maya.runner', email: 'maya@octofit.example', firstName: 'Maya', lastName: 'Chen', points: 420 },
            { username: 'jordan.moves', email: 'jordan@octofit.example', firstName: 'Jordan', lastName: 'Rivera', points: 365 },
            { username: 'sam.strong', email: 'sam@octofit.example', firstName: 'Sam', lastName: 'Okafor', points: 310 },
        ]);
        const teams = await Team.create([
            { name: 'Peak Performers', description: 'Small steps, strong finishes.', members: [users[0]._id, users[1]._id], totalPoints: 785 },
            { name: 'Steady Strides', description: 'Consistency is our superpower.', members: [users[2]._id], totalPoints: 310 },
        ]);
        await Activity.create([
            { user: users[0]._id, type: 'running', durationMinutes: 32, points: 180, completedAt: new Date('2026-08-25T16:30:00Z') },
            { user: users[1]._id, type: 'walking', durationMinutes: 45, points: 125, completedAt: new Date('2026-08-26T15:00:00Z') },
            { user: users[2]._id, type: 'strength', durationMinutes: 28, points: 150, completedAt: new Date('2026-08-26T17:15:00Z') },
        ]);
        await Leaderboard.create([
            { user: users[0]._id, team: teams[0]._id, points: 420, rank: 1 },
            { user: users[1]._id, team: teams[0]._id, points: 365, rank: 2 },
            { user: users[2]._id, team: teams[1]._id, points: 310, rank: 3 },
        ]);
        await Workout.create([
            { title: 'Fresh-air 5K', description: 'A conversational run with a relaxed finish.', category: 'running', difficulty: 'intermediate', durationMinutes: 35 },
            { title: 'Walk and reset', description: 'A brisk walk to build a steady daily habit.', category: 'walking', difficulty: 'beginner', durationMinutes: 25 },
            { title: 'Full-body foundations', description: 'A balanced strength circuit using bodyweight movements.', category: 'strength', difficulty: 'beginner', durationMinutes: 20 },
        ]);
        console.log('Database seeding complete');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose.disconnect();
    }
}
seedDatabase();
