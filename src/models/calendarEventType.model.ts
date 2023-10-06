import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ICalendarEventType {
  _id: Types.ObjectId;
  scheduleId: Types.ObjectId;
  name: string|null;
  shortName: string|null;
  updatedAt?: Date;
}
interface ICalendarEventTypeMethods {} // define methods here
interface ICalendarEventTypeModel extends Model<ICalendarEventType, {}, ICalendarEventTypeMethods> {} // define static methods here

const schema = new Schema<ICalendarEventType, ICalendarEventTypeModel, ICalendarEventTypeMethods>({
  scheduleId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    default: null, 
  },
  shortName: {
    type: String,
    default: null,
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const CalendarEventType = model<ICalendarEventType, ICalendarEventTypeModel>('CalendarEventType', schema)