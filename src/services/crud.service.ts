import _ from 'lodash'
import { Model, QueryOptions } from 'mongoose'
import { Types } from 'mongoose'

import HttpException from '../common/http-exception'

// Generic CRUD service functions

const create = async <T>(model: Model<T>, obj: Partial<T>) => {
  if(!obj) throw new HttpException(400, `Item object is required`)
  return await model.create(obj)
}

const read = async <T>(model: Model<T>, _id: string|Types.ObjectId) => {
  const doc = await model.findById(_id)
  if(!doc) throw new HttpException(404, `Item not found`)
  return doc
}

const readMany = async <T>(model: Model<T>, ids: (string|Types.ObjectId)[]) => {
  if(!ids || !_.isArray(ids)) throw new HttpException(404, `Item IDs need to be an array`)
  const docs = await model.find({ _id: { $in: ids } })
  if(!docs) throw new HttpException(404, `Item not found`)
  return docs
}

const readByObj = async <T>(model: Model<T>, query: QueryOptions<T>) => {
  const doc = await model.findOne(query)
  if(!doc) throw new HttpException(404, `Item not found`)
  return doc
}

const readManyByObj = async <T>(model: Model<T>, query: QueryOptions<T>) => {
  return await model.find(query)
}

const update = async <T>(model: Model<T>, _id: string|Types.ObjectId, obj: Partial<T>, upsert: boolean = false) => {
  const doc = await model.findOneAndUpdate({ _id }, obj, { new: true, upsert })
  if(!doc) throw new HttpException(404, `Item not found`)
  return doc
}

const updateMany = async <T>(model: Model<T>, ids: (string|Types.ObjectId)[], obj: Partial<T>) => {
  if(!ids || !_.isArray(ids)) throw new HttpException(404, `Item IDs need to be an array`)
  const docs = await model.updateMany({ _id: { $in: ids } }, obj, { new: true })
  if(!docs) throw new HttpException(404, `Item not found`)
  return docs
}

const updateByObj = async <T>(model: Model<T>, query: QueryOptions<T>, obj: Partial<T>, upsert: boolean = false) => {
  const doc = await model.findOneAndUpdate(query, obj, { new: true, upsert })
  if(!doc) throw new HttpException(404, `Item not found`)
  return doc
}

const destroy = async <T>(model: Model<T>, _id: string|Types.ObjectId) => {
  return await model.findOneAndRemove({ _id })
}

const destroyMany = async <T>(model: Model<T>, ids: (string|Types.ObjectId)[]) => {
  if(!ids || !_.isArray(ids)) throw new HttpException(404, `Item IDs need to be an array`)
  return await model.deleteMany({ _id: { $in: ids } })
}

const destroyByObj = async <T>(model: Model<T>, query: QueryOptions<T>) => {
  return await model.findOneAndRemove(query)
}

const destroyManyByObj = async <T>(model: Model<T>, query: QueryOptions<T>) => {
  return await model.deleteMany(query)
}

export { create, read, readMany, readByObj, readManyByObj, update, updateMany, updateByObj, destroy, destroyMany, destroyByObj, destroyManyByObj }
