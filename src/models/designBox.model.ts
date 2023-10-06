import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface IDesignBox {
  _id: Types.ObjectId;
  designId: Types.ObjectId;
  w: number;
  h: number;
  x: number;
  y: number;
  r: number;
  isDraggable: boolean;
  continueToEdge: boolean;
  fieldType: 'breakdownField' | 'categoryColumn' | 'elementList' | 'elementCount';
  listType: 'id' | 'name' | 'idName';
  countType: 'count' | 'text' | 'textCount';
  ussId: number;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  classNames: string[];
  style: object;
  textBefore: string|null;
  textAfter: string|null;
  dateFormat: string;
  updatedAt?: Date;
}
interface IDesignBoxMethods {} // define methods here
interface IDesignBoxModel extends Model<IDesignBox, {}, IDesignBoxMethods> {} // define static methods here

const schema = new Schema<IDesignBox, IDesignBoxModel, IDesignBoxMethods>({
  designId: {
    type: Schema.Types.ObjectId, 
    ref: 'Design'
  },
  w: {
    type: Number,
    default: 100
  }, 
  h: {
    type: Number,
    default: 25
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  r: {
    type: Number,
    default: 0
  },
  isDraggable: {
    type: Boolean,
    default: false,
  },
  continueToEdge: [{
    type: String,
  }],
  fieldType: {
    type: String,
    default: 'breakdownField' // 'breakdownField' | 'categoryColumns' | 'elementList' | 'elementCount'
  }, 
  listType: {
    type: String, // 'id' | 'name' | 'idName'
    default: 'id'
  },
  countType: {
    type: String, // 'count' | 'text' | 'textCount'
    default: 'count'
  },
  ussId: {
    type: Number,
    default: 1
  },
  fontSize: {
    type: Number,
    default: 9
  }, 
  fontFamily: {
    type: String,
    default: 'Roboto'
  },
  lineHeight: {
    type: Number,
    default: 1.5
  }, 
  classNames: [{
    type: String,
    default: ['vmiddle']
  }], 
  textBefore: {
    type: String,
    default: ''
  }, 
  textAfter: {
    type: String,
    default: ''
  }, 
  dateFormat: {
    type: String,
    default: 'EEE, MMMM d, yyyy'
  }, 
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const DesignBox = model<IDesignBox, IDesignBoxModel>('DesignBox', schema)