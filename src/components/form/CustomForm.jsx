import { useState } from 'react';
import styles from '../../styles/CustomForm.module.css';
import { formConfig, initState } from './formConfig';

const CustomForm = props => {
  const { placeholder, errorMessage, error = false, type, ...rest } = props;

  return (
    <label className={styles.input_container}>
      <input
        className='input'
        autoComplete='off'
        data-error={error}
        type={type || 'text'}
        {...rest}
        placeholder={placeholder}
      />

      <p className={styles.input_error} data-error={error}>
        {errorMessage}
      </p>
    </label>
  );
};

export default CustomForm;
