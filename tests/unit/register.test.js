const { registerValidation } = require('../../validation')

const validReturn = {
  value: {
    name: 'devTT1',
    email: 'devTT@gmail.com',
    password: '123456'
  }
}

describe('Testing register validation', () => {
  test('Accurate validation', async () => {
    const testingData = {
      name: 'devTT1',
      email: 'devTT@gmail.com',
      password: '123456'
    }
    expect(JSON.stringify(registerValidation(testingData))).toBe(JSON.stringify(validReturn))
  })

  test('Username size too small', async () => {
    const testingData = {
      name: 'devTT',
      email: 'devTT@gmail.com',
      password: '123456'
    }
    expect(JSON.stringify(registerValidation(testingData))).toContain('length must be at least 6 characters long')
  })

  test('Email size too small', async () => {
    const testingData = {
      name: 'devTT1',
      email: 'devTT',
      password: '123456'
    }

    expect(JSON.stringify(registerValidation(testingData))).toContain('length must be at least 6 characters long')
  })

  test('Password size too small', async () => {
    const testingData = {
      name: 'devTT1',
      email: 'devTT1@gmail.com',
      password: '12345'
    }

    expect(JSON.stringify(registerValidation(testingData))).toContain('length must be at least 6 characters long')
  })
})
