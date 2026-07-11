import express from 'express'
import memberRoutes from './routes/memberRoutes.js'
import  cors from "cors"
import attendanceRoutes from "./routes/attendanceRoutes.js"

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 5000;

app.get("/", (req,res) => {
    res.send("FLC Attendance Backend Running")
})

app.use("/members", memberRoutes);
app.use("/attendance", attendanceRoutes)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})
