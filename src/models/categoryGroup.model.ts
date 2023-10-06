import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ICategoryGroup {
  _id: Types.ObjectId;
  categoriesOrdered: Types.ObjectId[];
  updatedAt?: Date;
}
interface ICategoryGroupMethods {} // define methods here
interface ICategoryGroupModel extends Model<ICategoryGroup, {}, ICategoryGroupMethods> {} // define static methods here

const schema = new Schema<ICategoryGroup, ICategoryGroupModel, ICategoryGroupMethods>({
  categoriesOrdered: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const CategoryGroup = model<ICategoryGroup, ICategoryGroupModel>('CategoryGroup', schema)