import { Request, Response } from 'express'

const getProducts = (req: Request, res: Response) => {
  const { limit, offset } = req.query

  res.json({ limit, offset })
}

export { getProducts }
