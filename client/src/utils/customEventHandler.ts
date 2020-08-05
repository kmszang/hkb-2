export const STORE_UPDATED = 'STORE_UPDATED' as const
export const POP_STATE = 'popstate' as const

const eventSet = new Set()

export const listenEvent = (eventName: string, cb: (e?) => void) => {
  if (eventSet.has(eventName)) {
    console.error('Already existed Event')
    return
  }

  eventSet.add(eventName)
  window.addEventListener(eventName, cb)
}

export const fireEvent = (eventName: string, detail: any) => {
  if (!eventSet.has(eventName)) {
    console.error('None existed event')
    return
  }

  window.dispatchEvent(new CustomEvent(eventName, { detail }))
}
