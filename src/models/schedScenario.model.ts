import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ISchedScenario {
  _id: Types.ObjectId;
  name: string;
  schedBoardsOrdered: Types.ObjectId[];
  calendarId: Types.ObjectId;
  revisionName: string|null;
  revisionDate: Date|null;
  revisionScriptName: string|null;
  revisionScriptDate: Date|null;
  updatedAt?: Date;
}
interface ISchedScenarioMethods {} // define methods here
interface ISchedScenarioModel extends Model<ISchedScenario, {}, ISchedScenarioMethods> {} // define static methods here

const schema = new Schema<ISchedScenario, ISchedScenarioModel, ISchedScenarioMethods>({
  name: {
    type: String,
    maxlength: [100, 'Scenario names cannot be longer than 100 characters'],
    trim: true,
    default: 'Scenario'
  },
  schedBoardsOrdered: [{
    type: Schema.Types.ObjectId,
    ref: 'SchedBoard',
    default: null
  }],
  calendarId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'SchedCalendar'
  },
  revisionName: {
    type: String,
    maxlength: [25, 'Revision name cannot be longer than 25 characters'],
    trim: true,
    default: ''
  },
  revisionDate: {
    type: Date,
    default: null
  },
  revisionScriptName: {
    type: String,
    maxlength: [25, 'Revision name cannot be longer than 25 characters'],
    trim: true,
    default: ''
  },
  revisionScriptDate: {
    type: Date,
    default: null,
  }, 
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const SchedScenario = model<ISchedScenario, ISchedScenarioModel>('SchedScenario', schema)