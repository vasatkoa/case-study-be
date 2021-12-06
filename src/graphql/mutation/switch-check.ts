import { ObjectID } from 'mongodb'

import { getDb } from '../../lib/mongo'
import { RequestResponse, RequestResult } from '../types'

interface Input {
	id: string
}

export default async ({ id }: Input): Promise<RequestResponse> => {
	const db = await getDb()
	const todo = await db.collection('to do').findOne({ _id: new ObjectID(id) })
	await db
		.collection('to do')
		.updateOne({ _id: new ObjectID(id) }, { $set: { checked: !todo.checked } })
	return {
		status: RequestResult.SUCCESS
	}
}
