export const getDarkModePreference = (): Boolean => {

  const prefence = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false
  return prefence;

}