// TODO: handle errors
export const loadUser = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser && serializedUser === 'undefined') {
      return undefined;
    }
    return JSON.parse(serializedUser);
  } catch (err) {
    console.log(err)
    return undefined;
  }
};

export const saveUser = (state) => {
  try {
    const serializedUser = JSON.stringify(state);
    localStorage.setItem('user', serializedUser);
  } catch (err) {
    console.log(err)
    return undefined;
  }
};
