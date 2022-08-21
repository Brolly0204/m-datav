import ResizeObserver from 'resize-observer-polyfill';

export type ResizeListener = (element: HTMLDivElement) => void

const elementListeners = new Map<HTMLDivElement, Set<ResizeListener>>()

const ro = new ResizeObserver((entries, observer) => {
    for (const entry of entries) {
        const listeners = elementListeners.get(entry.target as HTMLDivElement)
        if (listeners) {
          listeners.forEach(listener => listener(entry.target  as HTMLDivElement))
        }
    }
});

export function observer(
  element: HTMLDivElement | null,
  callback: ResizeListener
) {
  if (!element) return false
  if (!elementListeners.has(element)) {
    elementListeners.set(element, new Set<ResizeListener>())
    ro.observe(element)
  }
  elementListeners.get(element)?.add(callback)
}

export function unObserver(
  element: HTMLDivElement | null,
  callback: ResizeListener
) {
  if (!element) return false
  if (elementListeners.has(element)) {
    const cds = elementListeners.get(element)
    cds?.delete(callback)
    if (!cds?.size) {
      ro.unobserve(element)
      elementListeners.delete(element)
    }
  }
}
