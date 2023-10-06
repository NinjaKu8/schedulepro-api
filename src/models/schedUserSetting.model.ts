import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ISchedUserSetting {
  _id: Types.ObjectId;
  scheduleId: Types.ObjectId;
  userId: Types.ObjectId;
  currentSchedScenarioId: Types.ObjectId;
  currentSchedDesignId: Types.ObjectId;
  currentSchedPaneSetId: Types.ObjectId;
  updatedAt?: Date;
}
interface ISchedUserSettingMethods {} // define methods here
interface ISchedUserSettingModel extends Model<ISchedUserSetting, {}, ISchedUserSettingMethods> {} // define static methods here

const schema = new Schema<ISchedUserSetting, ISchedUserSettingModel, ISchedUserSettingMethods>({
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  currentSchedScenarioId: {
    type: Schema.Types.ObjectId,
    ref: 'SchedScenario',
    default: null,
  },
  currentSchedDesignId: {
    type: Schema.Types.ObjectId,
    ref: 'SchedDesign',
    default: null,
  },
  currentSchedPaneSetId: {
    type: Schema.Types.ObjectId,
    ref: 'SchedPaneSet',
    default: null,
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const SchedUserSetting = model<ISchedUserSetting, ISchedUserSettingModel>('SchedUserSetting', schema)