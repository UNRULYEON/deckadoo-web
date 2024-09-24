import { Environment } from '@/constants'

export type Config = {
  env: Environment
  api: {
    ws: string
  }
}

const development: Config = {
  env: Environment.DEVELOPMENT,
  api: {
    ws: 'ws://localhost:3000/ws/estimations',
  },
}

const staging: Config = {
  env: Environment.STAGING,
  api: {
    ws: 'wss://api.staging.deckadoo.apps.amar.sh/ws/estimations',
  },
}

const production: Config = {
  env: Environment.PRODUCTION,
  api: {
    ws: 'wss://api.deckadoo.apps.amar.sh/ws/estimations',
  },
}

export const configs = {
  [Environment.DEVELOPMENT]: development,
  [Environment.STAGING]: staging,
  [Environment.PRODUCTION]: production,
}

const getConfig = (): Config => {
  const config = configs[import.meta.env.MODE as Environment]

  if (!config)
    throw new Error(`No config found for environment: ${import.meta.env.MODE}`)

  return config
}

export const config = getConfig()
