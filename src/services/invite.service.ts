import { Types } from 'mongoose'
import { TFunction } from 'i18next'

import * as crudService from '../services/crud.service'
import * as emailService from '../services/email.service'
import { User, IUser } from '../models/user.model'
import { Person, IPerson } from '../models/person.model'
import { Invite, IInvite } from '../models/invite.model'
import { IInviteProject, InviteProject } from '../models/inviteProject.model'
import { IPermission, Permission } from '../models/permission.model'
import { Project, IProject } from '../models/project.model'
import HttpException from '../common/http-exception'

export type UserProject = {
  _id: string;
  firstname: string;
  email: string;
  projectNames: string[];
  permissions: IPermission[];
}

export async function handleInviteUserByEmail(reqT: TFunction, email: string, userFromId: Types.ObjectId, projectId: Types.ObjectId) {
  const existingUser = await User.findOne({ email, isActive: true })
  const person = await crudService.readByObj<IPerson>(Person, { userId: userFromId })
  const project = await crudService.read<IProject>(Project, projectId)
  if(existingUser) {

    // handle existing user
    const existingPerson = await Person.findOne({ userId: existingUser._id })
    if(!existingPerson) throw new HttpException(400, 'User exists but no person record found')
    const permission = await crudService.create<IPermission>(Permission, { userId: existingUser._id, documentId: projectId, valueType: 'project', level: 'view' })
    emailService.emailNotify(
      reqT,
      existingUser.email, 
      `${person._fullname} ${reqT('has invited you to join the project')} ${project.name}. ${reqT('You have automatically been added to the project')}.`
    )

    // TODO: socket - send permission existing user
    // TODO: socket - send alerts to both users

  } else {
    console.log('new user')
    // find or create invite
    const invite = await crudService.updateByObj<IInvite>(Invite, { email }, { email }, true) // find or create

    // find or create inviteProject
    await crudService.updateByObj<IInviteProject>(InviteProject, { userFromId, projectId, inviteId: invite._id }, { userFromId, projectId, inviteId: invite._id }, true) // find or create
    // email
    emailService.emailInvite(reqT, person._fullname, email, invite.code, project.name)

  }
}

export async function joinInvitedProjects(user: IUser, invite: IInvite) {

  // join any invited projects
  const inviteProjects = await crudService.readManyByObj<IInviteProject>(InviteProject, { inviteId: invite._id })
  const userProjects: UserProject[] = []
  inviteProjects.forEach(async (inviteProject: IInviteProject) => {
    const fromUser = await User.findById(inviteProject.userFromId)
    const fromPerson = await Person.findOne({ userId: inviteProject.userFromId })
    const project = await Project.findById(inviteProject.projectId)
    if(!fromUser || !fromPerson || !project) return

    // create permission
    const permission = await crudService.create<IPermission>(Permission, { userId: user._id, documentId: project._id, valueType: 'project', level: 'view' })

    // create userProject
    const index = userProjects.findIndex((userProject: UserProject) => userProject._id === fromUser._id.toString())
    if(index === -1) {
      userProjects.push({
        _id: fromUser._id.toString(),
        firstname: fromPerson.firstname!,
        email: fromUser.email,
        projectNames: [project.name],
        permissions: [permission]
      })
    } else {
      userProjects[index].projectNames.push(project.name)
    }

  })
  return userProjects
}