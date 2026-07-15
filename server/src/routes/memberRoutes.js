import express from 'express';
import prisma from "../db.js"
import { hashPassword } from '../utils/password.js';
const router = express.Router();

router.get("/", async (req,res) => {
    const members = await prisma.member.findMany()
    res.json(members);
})

router.post("/", async (req,res) => {
    const data = { ...req.body };
    if (data.password) {
        data.password = await hashPassword(data.password);
    }

    const member = await prisma.member.create({
        data
    })
    res.status(201).json(member)
})

router.put("/:id", async (req, res) => {
    const data = { ...req.body };
    if (data.password) {
        data.password = await hashPassword(data.password);
    }

    const member = await prisma.member.update({
        where: {
            id: Number(req.params.id)
        },  
        data
    })
    res.json(member)
})

router.delete("/:id", async (req,res) => {
    await prisma.member.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.json({ message: "Member deleted successfully."})
})
export default router