import { config } from '@vue/test-utils'

// Best-effort stub for the global `$t` template helper. In practice the real
// i18n plugin's global injection wins for isolated `mountSuspended` trees and
// deterministically falls back to rendering the raw translation key, so we
// match that behaviour here.
config.global.mocks.$t = (key: string) => key

// Stub for the global `$localePath` template helper provided by @nuxtjs/i18n.
config.global.mocks.$localePath = (location: any) => {
  if (typeof location === 'string') {
    return location
  }
  if (location.name) {
    const routeMap: Record<string, string> = {
      index: '/',
      about: '/about',
      contact: '/contact',
      'analyses': '/analyses',
      'analyses-slug': '/analyses/[slug]',
      'analysis-catalogue': '/analysis-catalogue',
      'admin': '/admin',
      'admin-login': '/admin/login',
    }
    let path = routeMap[location.name] || `/${location.name}`
    
    // Replace dynamic segments with params
    if (location.params) {
      for (const [key, value] of Object.entries(location.params)) {
        path = path.replace(`[${key}]`, String(value))
      }
    }
    
    // Add query string if present
    if (location.query) {
      const params = new URLSearchParams()
      for (const [k, v] of Object.entries(location.query)) {
        if (v !== undefined) params.append(k, String(v))
      }
      const queryString = params.toString()
      if (queryString) path += `?${queryString}`
    }
    return path
  }
  return '/'
}

