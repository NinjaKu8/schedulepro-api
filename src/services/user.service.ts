
import HttpException from '../common/http-exception'
import { emailDuplicateCheck, validateEmail, validatePassword } from '../services/root.service'
import { User, IUser } from '../models/user.model'
import { Person, IPerson } from '../models/person.model'
import { Contact, IContact } from '../models/contact.model'
import * as crudService from '../services/crud.service'
import { rolesList } from '../config/rolesList'

type JoinObject = {
  firstname: string
  middlename: string
  lastname: string
  email: string
  password: string
}

export const join = async (body: JoinObject): Promise<{ user: IUser, person: IPerson, contact: IContact }> => {
  const { firstname, middlename, lastname, email, password } = body
  if(!firstname || !lastname || !email || !password) throw new HttpException(400, 'Missing required field')
  // validate
  validateEmail(email)
  validatePassword(password)
  // check for duplicate user email
  await emailDuplicateCheck(email)
  // create new user, person, contact, register
  const user = await crudService.create<IUser>(User, { email, password, roles: [{ role: 'user', code: rolesList['user'] }] })
  const person = await crudService.create<IPerson>(Person, { firstname, middlename, lastname, userId: user._id })
  const contact = await crudService.create<IContact>(Contact, { personId: person._id, valueType: 'email', name: 'Work', value: email })
  return { user, person, contact }
}
