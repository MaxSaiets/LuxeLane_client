function validate(values, includePassword) {
  let errors = {};

  const patterns = {
    firstName: {
      pattern: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ]{2,}$/,
      emptyError: "First Name is required",
      invalidError: "First Name is invalid"
    },
    role: {
      pattern: /^[A-Z]{2,}$/,
      emptyError: "Role is required",
      invalidError: "Role is invalid"
    },
    email: {
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      emptyError: "Email is required",
      invalidError: "Email is invalid"
    },
    password: includePassword ? {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      emptyError: "Password is required",
      invalidError: "Password is invalid"
    } : null,
    phoneNumber: {
      pattern: /^\d{10}$/,
      emptyError: "Phone number is required",
      invalidError: "Phone number is invalid"
    },
  };

  for (let field in values) {
    if (patterns[field]) {
      if (!values[field] || values[field].trim() === "") {
        errors[field] = patterns[field].emptyError;
      } else if (!patterns[field].pattern.test(values[field])) {
        errors[field] = patterns[field].invalidError;
      }
    }
  }
  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
}

export function ValidationNewUserForm(values) {
  return validate(values, true);
}

export function ValidationUpdateUserForm(values) {
  return validate(values, false);
}