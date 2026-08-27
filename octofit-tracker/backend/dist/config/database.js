import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;
export async function connectDatabase() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionString);
    }
    return db;
}
db.on('error', console.error.bind(console, 'connection error:'));
export default db;
