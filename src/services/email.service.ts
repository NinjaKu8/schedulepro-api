import { TFunction } from 'i18next'

import { sendMail } from '../common/sendMail'

const getYear = () => new Date().getFullYear().toString()

export const emailRegister = (reqT: TFunction, firstname: string, to: string, code: string) => {
  const subject = `Think Crew ${reqT('Registration')}`
  const context = { 
    subject, 
    firstname, 
    url: `https://thinkcrew.com/register?${code}`, 
    hi: reqT('hi'),
    registrationHtmlMessage1: reqT('registrationHtmlMessage1'),
    registrationHtmlMessage2: reqT('registrationHtmlMessage2'),
    registrationHtmlMessage3: reqT('registrationHtmlMessage3'),
    registrationHtmlMessage4: reqT('registrationHtmlMessage4'),
    allRightsReserved: reqT('allRightsReserved'),
    year: getYear(),
    registrationTextMessage1: reqT('forgotpasswordTextMessage1'), // reuse forgot password text message
    registrationTextMessage2: reqT('registrationTextMessage2'),
  }
  sendMail({ to, subject, template: 'registration', context })
}

export const emailWelcome = (reqT: TFunction, firstname: string, to: string) => {
  const subject = reqT('welcomeTextMessage1')
  const context = { 
    subject, 
    firstname, 
    welcomeHtmlMessage1: reqT('welcomeHtmlMessage1'),
    welcomeHtmlMessage2: reqT('welcomeHtmlMessage2'),
    welcomeHtmlMessage3: reqT('welcomeHtmlMessage3'),
    welcomeHtmlMessage4: reqT('welcomeHtmlMessage4'),
    welcomeHtmlMessage5: reqT('welcomeHtmlMessage5'),
    welcomeHtmlMessage6: reqT('welcomeHtmlMessage6'),
    welcomeHtmlMessage7: reqT('welcomeHtmlMessage7'),
    welcomeHtmlMessage8: reqT('welcomeHtmlMessage8'),
    welcomeHtmlMessage9: reqT('welcomeHtmlMessage9'),
    allRightsReserved: reqT('allRightsReserved'),
    year: getYear(),
    welcomeTextMessage1: reqT('welcomeTextMessage1'),
    welcomeTextMessage2: reqT('welcomeTextMessage2'),
  }
  sendMail({ to, subject, template: 'welcome', context })
}

export const emailForgotPassword = (reqT: TFunction, firstname: string, to: string, code: string) => {
  const subject = reqT('Forgot Password')
  const context = { 
    subject, 
    firstname, 
    url: `https://thinkcrew.com/forgotpassword?${code}`, 
    oops: reqT('oops'),
    forgotpasswordHtmlMessage1: reqT('forgotpasswordHtmlMessage1'),
    forgotpasswordHtmlMessage2: reqT('forgotpasswordHtmlMessage2'),
    forgotpasswordHtmlMessage3: reqT('forgotpasswordHtmlMessage3'),
    forgotpasswordHtmlMessage4: reqT('forgotpasswordHtmlMessage4'),
    allRightsReserved: reqT('allRightsReserved'),
    year: getYear(),
    forgotpasswordTextMessage1: reqT('forgotpasswordTextMessage1'),
    forgotpasswordTextMessage2: reqT('forgotpasswordTextMessage2')
  }
  sendMail({ to, subject, template: 'forgotpassword', context })
}

export const emailInvite = (reqT: TFunction, fullname: string, to: string, code: string, projectName: string) => {
  const subject = `Think Crew ${reqT('Invitation')}`
  const context = { 
    subject, 
    fullname, 
    url: `https://thinkcrew.com/invite?${code}`, 
    hi: reqT('hi'),
    projectName,
    inviteHtmlMessage1: reqT('inviteHtmlMessage1'),
    inviteHtmlMessage2: reqT('inviteHtmlMessage2'),
    inviteHtmlMessage3: reqT('inviteHtmlMessage3'),
    allRightsReserved: reqT('allRightsReserved'),
    year: getYear(),
    inviteTextMessage: reqT('inviteTextMessage'),
  }
  sendMail({
    to,
    subject,
    template: 'invite',
    context
  })
}

export const emailNotify = (reqT: TFunction, to: string, message: string) => {
  const subject = `Think Crew ${reqT('Notification')}`
  const context = { 
    subject, 
    message,
    notifyHtmlMessage1: reqT('notifyHtmlMessage1'),
    allRightsReserved: reqT('allRightsReserved'),
    year: getYear(),
  }
  sendMail({ to, subject, template: 'notify', context })
}

export const emailSubscribed = (reqT: TFunction, firstname: string, to: string, message?: string) => {
  const subject = `Think Crew ${reqT('Subscription')}`
  const context = { 
    subject, 
    firstname, 
    subscribedHtmlMessage1: reqT('subscribedHtmlMessage1'),
    subscribedHtmlMessage2: reqT('subscribedHtmlMessage2'),
    manageSubscriptions: reqT('manageSubscriptions'),
    allRightsReserved: reqT('allRightsReserved'),
    year: getYear(),
    subscribedTextMessage1: reqT('subscribedTextMessage1'),
    subscribedTextMessage2: reqT('subscribedTextMessage2'),
  }
  if(message) Object.assign(context, { message })
  sendMail({ to, subject, template: 'subscribed', context })
}

export const emailFarewell = (reqT: TFunction, firstname: string, to: string) => {
  const subject = `Think Crew ${reqT('is still here for you')}`
  const context = { 
    subject, 
    hi: reqT('Hi'),
    firstname, 
    farewellHtmlMessage1: reqT('farewellHtmlMessage1'),
    farewellHtmlMessage2: reqT('farewellHtmlMessage2'),
    manageSubscriptions: reqT('manageSubscriptions'),
    allRightsReserved: reqT('allRightsReserved'),
    year: getYear(),
    farewellText: reqT('farewellText')
  }
  sendMail({ to, subject, template: 'farewell', context })
}