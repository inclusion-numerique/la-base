'use client'

import React from 'react'
import { Toaster as BaseToaster } from 'react-hot-toast'

const Toaster = () => (
  <BaseToaster
    position="top-center"
    reverseOrder={false}
    gutter={8}
    toastOptions={{
      duration: 10_000,
    }}
  />
)

export default Toaster
