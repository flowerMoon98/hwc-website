// src/payload.config.ts
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { BlocksFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collection imports
import { Users } from '@/payload/collections/Users'
import { Media } from '@/payload/collections/Media'
import { ServicePages } from '@/payload/collections/ServicePages'
import { TeamMembers } from '@/payload/collections/TeamMembers'
import { Posts } from '@/payload/collections/Posts'
import { Pages } from '@/payload/collections/Pages'
import { AboutUs } from '@/payload/collections/AboutUs'

// Global imports
import { Header } from '@/payload/Globals/Header'
import { Footer } from '@/payload/Globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- HWC Admin',
    },
    components: {},
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ServicePages, TeamMembers, Posts, Pages, AboutUs],
  globals: [Header, Footer],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [
          // If you need to reference block types here
        ],
      }),
    ],
  }),
  cors: ['https://hwc.com', process.env.FRONTEND_URL || 'http://localhost:3000'].filter(Boolean),
  csrf: ['https://hwc.com', process.env.FRONTEND_URL || 'http://localhost:3000'].filter(Boolean),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_KEY',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
})
