/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect, throwError } from '@backend/utils'
import { ObjectId } from 'mongodb'
import crypto from 'crypto'
import type { Readable } from 'node:stream'

export const config = {
  api: {
    bodyParser: false,
  },
}

const buffer = async (readable: Readable) => {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  return Buffer.concat(chunks)
}

const verifyWebhookSignature = (payload: string, signature: string) => {
  const secret = process.env.BMC_SECRET ?? ''
  const hmac = crypto.createHmac('sha256', secret)
  const calculatedSignature = hmac.update(payload).digest('hex')

  return crypto.timingSafeEqual(Buffer.from(calculatedSignature), Buffer.from(signature))
}

const getUserIdFromNote = (note: string) => {
  const objectIdRegex = /[0-9a-fA-F]{24}/
  const match = note.match(objectIdRegex)

  return match ? match[0] : false
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const signature = req.headers['x-signature-sha256'] as string
  const buf = await buffer(req)
  const rawBody = buf.toString('utf8')

  const isSignatureValid = verifyWebhookSignature(rawBody, signature)

  if (!isSignatureValid) {
    return throwError(res, 401, 'Unauthorized')
  }

  await dbConnect()

  console.log(req.body)

  const { type, data } = req.body

  if (type !== 'donation.created' || !data) {
    return throwError(res, 403, 'Invalid request')
  }

  const { supporter_email, support_note, amount } = data

  const userByEmail = await collections.users?.findOne({ email: supporter_email })
  const userId = userByEmail ? userByEmail._id : getUserIdFromNote(support_note)

  if (!userId) {
    return res.status(200).send('Unable to link donation to an account')
  }

  await collections.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { donated: amount } })

  res.status(200).send('Successfully linked donation to user account')
}
