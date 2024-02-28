import React from 'react'
import error from '../../Assets/imgs/error.svg'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Sorry!</title>
      </Helmet>
    <div className='text-center py-5'>
      <h1>Sorry!</h1>
      <img src={error} alt="not found" />
    </div>
    </>
  )
}
