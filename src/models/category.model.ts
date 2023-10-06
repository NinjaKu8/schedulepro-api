import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  ussId: number;
  elementsOrdered: Types.ObjectId[];
  isRemovable: boolean;
  breakdownField: string|null;
  updatedAt?: Date;
}
interface ICategoryMethods {} // define methods here
interface ICategoryModel extends Model<ICategory, {}, ICategoryMethods> {} // define static methods here

const schema = new Schema<ICategory, ICategoryModel, ICategoryMethods>({
  name: {
    type: String,
    maxlength: [50, 'Category names cannot be longer than 50 characters'],
    trim: true
  },
  ussId: {
    type: Number,
    default: null
  },
  elementsOrdered: [{
    type: Schema.Types.ObjectId,
    ref: 'Element',
    default: null
  }],
  isRemovable: {
    type: Boolean,
    default: true
  },
  breakdownField: {
    type: String,
    default: null
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const Category = model<ICategory, ICategoryModel>('Category', schema)