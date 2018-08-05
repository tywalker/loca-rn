/**
 * Checks for an empty object
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
