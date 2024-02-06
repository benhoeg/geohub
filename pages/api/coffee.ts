/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)
  console.log(req)

  res.status(200).send('All Good')
}
