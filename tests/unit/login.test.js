const { loginValidation } = require('../../validation.js')

const validReturn = {
  value: {
    email: 'devTT@gmail.com',
    password: '123456'
  }
}

describe('Testing login validation', () => {
  test('Accurate validation', async () => {
    const testingData = {
      email: 'devTT@gmail.com',
      password: '123456'
    }
    expect(JSON.stringify(loginValidation(testingData))).toBe(JSON.stringify(validReturn))
  })

  test('Email login size too small', async () => {
    const testingData = {
      email: 'devTT',
      password: '123456'
    }
    expect(JSON.stringify(loginValidation(testingData))).toContain('length must be at least 6 characters long')
  })

  test('Password size too small', async () => {
    const testingData = {
      email: 'devTT@gmail.com',
      password: '12345'
    }
    expect(JSON.stringify(loginValidation(testingData))).toContain('length must be at least 6 characters long')
  })
})
