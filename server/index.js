import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from "./routes/auth.js"
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import taskRouter from './routes/task.js'
import connectToDatabase from "./db/db.js"



connectToDatabase()
dotenv.config();
const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/uploads', express.static('public/uploads'));//for serving static files like images
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/task', taskRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})