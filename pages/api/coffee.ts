/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

function verifyWebhookSignature(payload: any, signature: string) {
  const secret = process.env.BMC_SECRET ?? ''

  const hmac = crypto.createHmac('sha256', secret)
  const calculatedSignature = 'sha256=' + hmac.update(payload).digest('hex')

  return crypto.timingSafeEqual(Buffer.from(calculatedSignature), Buffer.from(signature))
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sig = req.headers['x-signature-sha256'] as string
  const isSignatureValid = verifyWebhookSignature(req.body, sig)

  console.log(isSignatureValid)

  res.status(200).send('All Good')
}
