// src/payload/getPayloadClient.ts
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

// Create a cached version of the Payload client to improve performance
export const getPayloadClient = cache(async () => {
  const payload = await getPayload({
    config: configPromise,
  })
  
  return payload
})
