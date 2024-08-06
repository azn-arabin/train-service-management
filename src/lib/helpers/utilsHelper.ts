export const removeSensitiveData = (value: any) => {
  value = value.toObject(); // Convert to plain JavaScript object
  delete value.password; // Remove the password field
  return value;
};
