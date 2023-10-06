import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface IBreakdown {
  _id: Types.ObjectId;
  isComplete: boolean;
  completedTime: string|null; 
  status: 'part'|'shooting'|null;
  scriptSceneId: Types.ObjectId|null;
  valueType: 'strip'|'banner'|'day';
  scene: string|null;
  description: string|null;
  bannerText: string|null;
  scriptPage: string|null;
  pages: number|null;
  duration: number|null;
  comments: string|null;
  elementIds: Types.ObjectId[]|null;
  ie: Types.ObjectId|null;
  set: Types.ObjectId|null;
  dn: Types.ObjectId|null;
  scriptDay: Types.ObjectId|null;
  unit: Types.ObjectId|null;
  location: Types.ObjectId|null;
  sequence: Types.ObjectId|null;
  groupCode: string|null;
  updatedAt?: Date;
}
interface IBreakdownMethods {} // define methods here
interface IBreakdownModel extends Model<IBreakdown, {}, IBreakdownMethods> {} // define static methods here

const schema = new Schema<IBreakdown, IBreakdownModel, IBreakdownMethods>({
  isComplete: {
    type: Boolean,
    default: false
  },
  completedTime: {
    type: Date,
    default: null
  }, 
  status: {
    type: String,
    default: null
  },
  scriptSceneId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'ScriptScene'
  },
  valueType: {
    type: String,
    default: 'strip'
  },
  scene: {
    type: String,
    maxlength: [50, 'Breakdown scene number cannot be longer than 50 characters'],
    trim: true,
    default: null
  },
  description: {
    type: String,
    maxlength: [500, 'Breakdown description cannot be longer than 500 characters'],
    trim: true,
    default: null
  },
  bannerText: {
    type: String,
    maxlength: [500, 'Breakdown banners cannot be longer than 500 characters'],
    trim: true,
    default: null
  },
  scriptPage: {
    type: String,
    maxlength: [50, 'Breakdown script page cannot be longer than 50 characters'],
    trim: true,
    default: null
  },
  pages: {
    type: Number,
    default: null
  },
  duration: {
    type: Number,
    default: null
  },
  comments: {
    type: String,
    maxlength: [500, 'Breakdown comments cannot be longer than 500 characters'],
    trim: true,
    default: null
  },
  elementIds: [{
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'SchedElement'
  }],
  ie: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'SchedElement'
  },
  set: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'SchedElement'
  },
  dn: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'SchedElement'
  },
  scriptDay: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'SchedElement'
  },
  unit: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'SchedElement'
  },
  location: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'SchedElement'
  }, 
  sequence: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'SchedElement'
  },
  groupCode: {
    type: String,
    default: null
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const Breakdown = model<IBreakdown, IBreakdownModel>('Breakdown', schema)