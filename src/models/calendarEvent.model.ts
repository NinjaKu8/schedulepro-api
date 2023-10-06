import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ICalendarEvent {
  _id: Types.ObjectId;
  isStart: boolean;
  isDayOff: boolean;
  isHoliday: boolean;
  calendarEventTypeId: Types.ObjectId|null;
  date: Date;
  updatedAt?: Date;
}
interface ICalendarEventMethods {} // define methods here
interface ICalendarEventModel extends Model<ICalendarEvent, {}, ICalendarEventMethods> {} // define static methods here

const schema = new Schema<ICalendarEvent, ICalendarEventModel, ICalendarEventMethods>({
  isStart: {
    type: Boolean,
    default: false,
  },
  isDayOff: {
    type: Boolean,
    default: false,
  },
  isHoliday: {
    type: Boolean,
    default: false,
  },
  calendarEventTypeId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'CalendarEventType'
  },
  date: {
    type: Date,
    required: true,
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const CalendarEvent = model<ICalendarEvent, ICalendarEventModel>('CalendarEvent', schema)