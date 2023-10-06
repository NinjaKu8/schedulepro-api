import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface IElement {
  _id: Types.ObjectId;
  name: string;
  elementNumber: string|null;
  isLocked: boolean;
  isInclude: boolean;
  isHold: boolean;
  isDrop: boolean;
  dropDays: number;
  linkIds: Types.ObjectId[];
  calendarEventIds: Types.ObjectId[];
  daysOff: number[];
  paletteCoord: number | null;
  updatedAt?: Date;
}
interface IElementMethods {} // define methods here
interface IElementModel extends Model<IElement, {}, IElementMethods> {} // define static methods here

const schema = new Schema<IElement, IElementModel, IElementMethods>({
  name: {
    type: String,
    maxlength: [100, 'Element names cannot be longer than 100 characters'],
    trim: true,
  },
  elementNumber: {
    type: String,
    maxlength: [10, 'Element IDs cannot be longer than 10 characters'],
    trim: true,
    default: null,
    sparse: true,
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  isInclude: {
    type: Boolean,
    default: true
  },
  isHold: {
    type: Boolean,
    default: true
  },
  isDrop: {
    type: Boolean,
    default: true
  },
  dropDays: {
    type: Number,
    default: 0
  },
  linkIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Element',
    default: null
  }],
  calendarEventIds: [{
    type: Schema.Types.ObjectId,
    ref: 'CalendarEvent',
    default: null
  }],
  daysOff: [{
    type: Number,
  }],
  paletteCoord: {
    type: Number,
    default: null
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const Element = model<IElement, IElementModel>('Element', schema)