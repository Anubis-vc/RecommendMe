import { Request, Response } from 'express';
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async (req:Request, res:Response) => {
	try {
		const users = await prisma.users.findMany();
		res.json({ users });
	}
	catch (err) {
		console.error(err);
		res.json({ error: "Internal server error" });
	}
}

export default { getUsers }