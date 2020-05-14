import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { userList } from './data/usersData'
export default {
  bootstrap () {
    const mock = new MockAdapter(axios)
    mock.onPost('/loginWithEmail').reply(config => {
      return new Promise((resolve, reject) => {
        const { email, password } = JSON.parse(config.data)
        const account = userList.find(user => user.email === email)
        if (!account) {
          resolve([401, {
            status: 401,
            result: 'FAILED',
            message: 'User not found'
          }])
          return
        }
        account.password === password
          ? resolve([200, {
            status: 200,
            result: 'SUCCESS',
            message: 'Login successfully'
          }])
          : resolve([401, {
            status: 401,
            result: 'FAILED',
            message: 'Wrong password'
          }])
      })
    })
    mock.onPost('/loginWithFacebook').reply((config) => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          status: 200,
          result: 'SUCCESS',
          message: 'Log in successfully'
        }])
      })
    })
    mock.onPost('/loginWithTwitter').reply((config) => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          status: 200,
          result: 'SUCCESS',
          message: 'Log in successfully'
        }])
      })
    })
    mock.onPost('/loginWithGoogle').reply((config) => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          status: 200,
          result: 'SUCCESS',
          message: 'Log in successfully'
        }])
      })
    })
  }
}
