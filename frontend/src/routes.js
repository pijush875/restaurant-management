/**
 * Application Routes Configuration
 *
 * Defines all protected routes in the application using React lazy loading
 * for code splitting and performance optimization.
 *
 * Each route object contains:
 * - path: URL path for the route
 * - name: Human-readable name for breadcrumbs
 * - element: Lazy-loaded React component
 * - exact: (optional) Requires exact path match
 *
 * @module routes
 */

import React from 'react'

// Dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// Master
//FoodCategory
const FoodCategory = React.lazy(() => import('./views/master/FoodCategory'))
const FoodCategoryCreate = React.lazy(() => import('./views/master/FoodCategoryCreate'))
const FoodCategoryEdit = React.lazy(() => import('./views/master/FoodCategoryEdit'))
//Food Item
const FoodItem =React.lazy(() => import('./views/master/FoodItem'))


/**
 * Array of route configuration objects
 *
 * @type {Array<Object>}
 * @property {string} path - URL path pattern
 * @property {string} name - Display name for breadcrumbs and navigation
 * @property {React.LazyExoticComponent} element - Lazy-loaded component
 * @property {boolean} [exact] - Whether to match path exactly
 *
 * @example
 * // Route renders when URL matches '/dashboard'
 * { path: '/dashboard', name: 'Dashboard', element: Dashboard }
 *
 * @example
 * // Route with exact match required
 * { path: '/components', name: 'Components', element: Cards, exact: true }
 */
export const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/master/food-category', name: 'Food Category', element: FoodCategory },
  { path: '/master/food-category/create', name: 'Add Food Category', element: FoodCategoryCreate },
  { path: '/master/food-category/edit/:id', name: 'Edit Food Category', element: FoodCategoryEdit },
  { path: '/master/food-item',name: 'Food Item', element: FoodItem},
]
export default routes
