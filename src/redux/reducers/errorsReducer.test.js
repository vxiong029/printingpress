import errors from './errorsReducer';

describe('testing errors reducer', () => {
  test('login message reducer will clear login error', () => {
    let action = { type: 'CLEAR_LOGIN_ERROR' };

    expect(errors('Enter your username and password!', action)).toEqual({ "loginMessage": "", "registrationMessage": "" });
  })

  test(`login message reducer will ask to enter user's info`, () => {
    let action = { type: 'LOGIN_INPUT_ERROR' };

    expect(errors(undefined, action)).toEqual({ "loginMessage": "Enter your username and password!", "registrationMessage": "" });
  })
})