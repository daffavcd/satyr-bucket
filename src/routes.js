import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Bucket = React.lazy(() => import('./views/bucket/Bucket'))
const Login = React.lazy(() => import('./views/auth/login'))
const Register = React.lazy(() => import('./views/auth/register'))
const AddBucket = React.lazy(() => import('./views/bucket/AddBucket'))
const EditBucket = React.lazy(() => import('./views/bucket/EditBucket'))
const DetailBucket = React.lazy(() => import('./views/bucket/DetailBucket'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/bucket', name: 'Travel Bucket', element: Bucket },
  { path: '/add_bucket', name: 'Add Travel Bucket', element: AddBucket },
  { path: '/edit_bucket/:id', name: 'Edit Travel Bucket', element: EditBucket },
  { path: '/detail_bucket/:id', name: 'Detail Travel Bucket', element: DetailBucket },
]

export default routes
