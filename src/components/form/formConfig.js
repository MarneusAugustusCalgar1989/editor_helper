export const signUpConfig = [
  {
    name: 'name',
    placeholder: 'Enter your name',
    required: true,
    maxLength: 15,
  },
  {
    name: 'surname',
    placeholder: 'Enter your surname',
    required: true,
    maxLength: 15,
  },
  {
    name: 'email',
    placeholder: 'Enter your e-mail',
    required: true,
    pattern: '\\S+@\\S+\\.\\S+$',
    errorMessage: 'Wrong e-mail',
    validate: e => (e.email ? e.email : ''),
  },

  {
    name: 'duplicate',
    placeholder: 'Enter your password',
    required: true,
    type: 'password',
  },
  {
    name: 'password',
    placeholder: 'Duplicate your password',
    required: true,
    type: 'password',
    minLength: 6,
    errorMessage: 'Passwords not equal',
    validate: e => !(e.password === e.duplicate),
  },
];

export const initState = {
  name: '',
  surname: '',
  password: '',
  duplicate: '',
  email: '',
};

export const loginFormConfig = [
  {
    name: 'login',
    placeholder: 'Enter your login',
    required: true,
    type: 'text',
    errorMessage: 'Some trouble with login',
    minLength: 5,
  },
  {
    name: 'password',
    placeholder: 'Enter your password',
    required: true,
    type: 'password',
    errorMessage: 'Something wrong with password',
    minLength: 5,
  },
];

export const loginInitState = {
  login: '',
  password: '',
};
