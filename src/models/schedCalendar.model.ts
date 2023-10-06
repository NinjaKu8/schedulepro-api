import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ISchedCalendar {
  _id: Types.ObjectId;
  name: string;
  calendarEventIds: Types.ObjectId[];
  daysOff: number[];
  updatedAt?: Date;
}
interface ISchedCalendarMethods {} // define methods here
interface ISchedCalendarModel extends Model<ISchedCalendar, {}, ISchedCalendarMethods> {} // define static methods here

const schema = new Schema<ISchedCalendar, ISchedCalendarModel, ISchedCalendarMethods>({
  name: {
    type: String,
    maxlength: [100, 'Calendar names cannot be longer than 100 characters'],
    trim: true,
    default: 'Calendar',
  },
  calendarEventIds: [{
    type: Schema.Types.ObjectId,
    ref: 'CalendarEvent',
    default: null
  }],
  daysOff: [{
    type: Number,
  }],
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const SchedCalendar = model<ISchedCalendar, ISchedCalendarModel>('SchedCalendar', schema)