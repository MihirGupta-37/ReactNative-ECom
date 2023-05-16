export const IsEmpty = value => !value;

export const validateEmail = value => {
  if (IsEmpty(value)) {
    return 'Please enter the email address';
  }
  if (
    !value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/,
    )
  ) {
    // eslint-disable-line
    return 'Invalid email address';
  }
  return false;
};

export const validatePassword = value => {
  const isNonWhiteSpace = /^\S*$/;
  if (!value) {
    return 'Please enter the password.';
  }
  if (!isNonWhiteSpace.test(value)) {
    return 'Password must not contain Whitespaces.';
  }

  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(value)) {
    return 'Password must have at least one Uppercase Character.';
  }

  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  if (!isContainsLowercase.test(value)) {
    return 'Password must have at least one Lowercase Character.';
  }

  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(value)) {
    return 'Password must contain at least one Digit.';
  }

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
  if (!isContainsSymbol.test(value)) {
    return 'Password must contain at least one Special Symbol.';
  }

  const isValidLength = /^.{10,16}$/;
  if (!isValidLength.test(value)) {
    return 'Password must be 10-16 Characters Long.';
  }
  console.log(value, 'valuesdsad');

  return false;
};

export const validateName = value => {
  if (IsEmpty(value)) {
    return 'Please enter Full Name';
  }
  if (!value.match(/^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$/)) {
    // eslint-disable-line
    return 'Invalid Full Name';
  }
  return false;
};

export const validconfPassword = (value, cValue) => {
  if (cValue === '') {
    return 'Please enter Confirm password';
  }

  if (value !== cValue) {
    return 'Password and Confirm Password does not match.';
  }
  return '';
};

export const validateOtp = value => {
  console.log('value::::', value);
  if (IsEmpty(value)) {
    return 'Please enter OTP';
  }
};

export function numberWithCommas(x) {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export const validateCardNo = value => {
  if (IsEmpty(value)) {
    return 'Please enter Card No.';
  }
  if (!value.match(/^[\d]{16}$/)) {
    // eslint-disable-line
    return 'Invalid Card No.';
  }
  return false;
};

export const validateAddress = value => {
  // console.log('value::::', value);
  if (IsEmpty(value)) {
    return 'Please Enter Your Address';
  }
};

export const validateComment = value => {
  // console.log('value::::', value);
  if (IsEmpty(value)) {
    return 'This is Required Field!';
  }
};
