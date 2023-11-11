// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
    if(req.method == "POST"){
        try {
            const data = await prisma.driver.create({
                data:req.body
            })
            return res.json(data)
        } catch (error) {
            return res.json(error)
        }
    }else if (req.method == "GET" && req.query.id){
        try {
            const data = await prisma.driver.findFirst({
                where:{
                    id:+req.query.id
                }
            })

            return res.json(data)
        } catch (error) {
            return res.json(error)
        }
    }else if(req.method == "GET"){
        try {
            const data = await prisma.driver.findMany({
                include:{
                    author:true
                }
            })
            return res.json(data)
        } catch (error) {
            return res.json(error)
        }
    }else if (req.method == "DELETE" && req.query.id){
        try {
            const data = await prisma.driver.delete({
                where:{
                    id:+req.query.id
                }
            })
            return res.json(data)
        } catch (error) {
            return res.json(error)
        }
    }else if(req.method == "PUT" && req.query.id){
        try {
            const data = await prisma.driver.update({
                where:{
                    id:+req.query.id
                },
                data:req.body
            })
            return res.json(data)
        } catch (error) {
            return res.json(error)
        }
    }
}
