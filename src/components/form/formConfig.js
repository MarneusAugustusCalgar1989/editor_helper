export const formConfig = [
  {
    name: 'name',
    placeholder: 'Enter your name',
    required: true,
  },
  { name: 'surname', placeholder: 'Enter your surname', required: true },
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
