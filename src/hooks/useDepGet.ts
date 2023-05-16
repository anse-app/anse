export function useDeepGet(target: any, path: string | string[], defaultValue: any) {
  if (!Array.isArray(path) && typeof path !== 'string')
    throw new TypeError('path must be string or array')
  if (target === null)
    return defaultValue

  let pathArray = path
  if (typeof path === 'string') {
    path = path.replace(/\[(\w*)\]/g, '.$1')
    path = path.startsWith('.') ? path.slice(1) : path

    pathArray = path.split('.')
  }

  let index = 0
  let levelPath: string
  while (target !== null && index < pathArray.length) {
    levelPath = pathArray[index++]
    target = target[levelPath]
  }

  return index === pathArray.length ? target : defaultValue
}
