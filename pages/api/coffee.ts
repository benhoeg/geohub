/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import type { Readable } from 'node:stream'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

function verifyWebhookSignature(payload: any, signature: string) {
  const secret = process.env.BMC_SECRET ?? ''

  console.log(secret)
  console.log(signature)

  const hmac = crypto.createHmac('sha256', secret)
  const calculatedSignature = 'sha256=' + hmac.update(payload).digest('hex')

  console.log(calculatedSignature)

  return crypto.timingSafeEqual(Buffer.from(calculatedSignature), Buffer.from(signature))
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sig = req.headers['x-signature-sha256'] as string
  const buf = await buffer(req)
  const rawBody = buf.toString('utf8')

  const isSignatureValid = verifyWebhookSignature(rawBody, sig)

  console.log(isSignatureValid)

  res.status(200).send('All Good')
}
