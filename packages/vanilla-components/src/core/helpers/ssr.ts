/**
 * Check if its not running server side nad window or document are available
 * @returns {Boolean}
 */
export const isClient = () => typeof window !== 'undefined' && typeof document !== 'undefined'

/**
 * Check its running server side
 * @returns {Boolean}
 */

export const isServer = () => typeof window === 'undefined' || typeof document === 'undefined'
