import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface IScriptScene {
  _id: Types.ObjectId;
  isActive: boolean;
  isOmit: boolean;
  content: string;
  updatedAt?: Date;
}
interface IScriptSceneMethods {} // define methods here
interface IScriptSceneModel extends Model<IScriptScene, {}, IScriptSceneMethods> {} // define static methods here

const schema = new Schema<IScriptScene, IScriptSceneModel, IScriptSceneMethods>({
  isActive: {
    type: Boolean,
    default: true,
  },
  isOmit: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    set: function(data: any) {
      return JSON.stringify(data)
    },
    default: '',
  },
  updatedAt: {
    type: Date,
    default: new Date().toISOString()
  }
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const ScriptScene = model<IScriptScene, IScriptSceneModel>('ScriptScene', schema)