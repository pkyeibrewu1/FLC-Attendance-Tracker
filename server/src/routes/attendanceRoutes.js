import express from "express"
import prisma from "../db.js"

const router = express.Router()

router.get("/", async (req,res) =>{
    const attendance = await prisma.attendance.findMany()
    res.json(attendance)
});

router.post("/", async (req,res) =>{
    const attendance = await prisma.attendance.create({
        data: req.body
    })

    res.status(201).json(attendance)
});

router.put("/:id", async (req,res) => {
    const attendance = await prisma.attendance.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.json(attendance)
})

router.delete("/:id", async (req,res) => {
    await prisma.attendance.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.json({message: "Attendance deleted."})
})

export default router