import { model, Model, Schema, Types } from 'mongoose'

import { isValidEmail } from '../common/isValidEmail'
import { createUUID } from '../common/createUUID'
import { schemaOptions } from '../config/schemaOptions'

export interface IInvite {
  _id: Types.ObjectId;
  email: string;
  code: string;
  updatedAt?: Date;
}
export interface IInviteMethods {} // define methods here
interface IInviteModel extends Model<IInvite, {}, IInviteMethods> {} // define static methods here

const schema = new Schema<IInvite, IInviteModel, IInviteMethods>({
  email: {
    type: String,
    lowercase: true,
    required: [true, 'You must provide a valid email address'],
    trim: true,
    unique: true,
    validate: [isValidEmail, 'You must provide a valid email address']
  },
  code: {
    type: String,
    default: createUUID()
  },
}, schemaOptions)

export const inviteKeys = Object.keys(schema.paths) // array of keys of schema

export const Invite = model<IInvite, IInviteModel>('Invite', schema)