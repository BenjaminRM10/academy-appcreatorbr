import { createClient } from '@supabase/supabase-js'

// Cache para evitar llamadas repetidas
const configCache: Map<string, { value: string; timestamp: number }> = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos

/**
 * Obtiene un valor de configuración encriptado de app_config
 * Usa la función RPC get_decrypted_config de Supabase
 */
export async function getEncryptedConfig(key: string): Promise<string | null> {
  // Check cache first
  const cached = configCache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.value
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const encryptionKey = process.env.SUPABASE_ENCRYPTION_KEY

  if (!encryptionKey) {
    console.error('SUPABASE_ENCRYPTION_KEY not set')
    return null
  }

  // Usar service role key si está disponible, sino anon key
  const supabaseKey = supabaseServiceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const { data, error } = await supabase.rpc('get_decrypted_config', {
      config_key: key,
      encryption_key: encryptionKey
    })

    if (error) {
      console.error(`Error getting config for ${key}:`, error)
      return null
    }

    if (data) {
      // Cache the result
      configCache.set(key, { value: data, timestamp: Date.now() })
    }

    return data
  } catch (err) {
    console.error(`Exception getting config for ${key}:`, err)
    return null
  }
}

/**
 * Obtiene múltiples valores de configuración en paralelo
 */
export async function getMultipleConfigs(keys: string[]): Promise<Record<string, string | null>> {
  const results = await Promise.all(keys.map(async (key) => ({ key, value: await getEncryptedConfig(key) })))
  return Object.fromEntries(results.map(r => [r.key, r.value]))
}

// Aliases para configuraciones comunes
export const getGoogleClientId = () => getEncryptedConfig('GOOGLE_CLIENT_ID')
export const getGoogleClientSecret = () => getEncryptedConfig('GOOGLE_CLIENT_SECRET')
export const getGoogleRefreshToken = () => getEncryptedConfig('GOOGLE_REFRESH_TOKEN')
export const getStripeSecretKey = () => getEncryptedConfig('STRIPE_SECRET_KEY')
export const getStripeWebhookSecret = () => getEncryptedConfig('STRIPE_WEBHOOK_SECRET')
export const getResendApiKey = () => getEncryptedConfig('RESEND_API_KEY')
