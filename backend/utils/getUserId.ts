import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

const getUserId = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession()

  if (!session) return undefined

  return session.user.id
}

export default getUserId
