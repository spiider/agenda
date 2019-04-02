/// <reference path="../react-app-env.d.ts" />
// TODO: handle errors
export const loadUser = (): IFullUser => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser && serializedUser === 'undefined') {
      // @ts-ignore
      return undefined;
    }
    // @ts-ignore
    return JSON.parse(serializedUser);
  } catch (err) {
    console.log(err)
    // @ts-ignore
    return undefined;
  }
};

export const saveUser = (user: IFullUser) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
  } catch (err) {
    console.log(err)
    return undefined;
  }
};
