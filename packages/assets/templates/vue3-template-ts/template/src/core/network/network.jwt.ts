// import { refreshToken } from '~/api/auth/route.auth'
// import { AuthPairsData } from '~/types/network/network-types.jwt'

// const LOCALSTORAGE_KEY = 'app-signature-pairs'

// export function createPairs({
//   accessToken,
//   accessTokenExpiration,
//   refreshToken,
//   refreshTokenExpiration
// }: AuthPairsData) {
//   localStorage.setItem(
//     LOCALSTORAGE_KEY,
//     JSON.stringify({
//       accessToken,
//       refreshToken,
//       accessTokenExpiration,
//       refreshTokenExpiration
//     })
//   )
// }

// export function removePairs() {
//   localStorage.removeItem(LOCALSTORAGE_KEY)
// }

// export function getPairs(): AuthPairsData | null {
//   if (!hasPairs()) return null
//   const saved = localStorage.getItem(LOCALSTORAGE_KEY) ?? ''
//   const pairs = JSON.parse(saved) as AuthPairsData
//   return pairs
// }

// export function hasPairs(): boolean {
//   return localStorage.getItem(LOCALSTORAGE_KEY) !== null
// }

// export function pairsIsExpired(): boolean {
//   return accessIsExpired() || refreshIsExpired()
// }

// export function accessIsExpired(): boolean {
//   const pairs = getPairs()
//   if (pairs === null) return true
//   const access_expires = new Date(Date.parse(pairs.accessTokenExpiration))
//   const now = new Date()
//   return now > access_expires
// }

// export function refreshIsExpired(): boolean {
//   const pairs = getPairs()
//   if (pairs === null) return true
//   const refresh_expires = new Date(Date.parse(pairs.refreshTokenExpiration))
//   const now = new Date()
//   return now > refresh_expires
// }

// export async function refreshPairs(): Promise<AuthPairsData | null> {
//   const pairs = getPairs()
//   if (!pairs) return null
//   const { status, data } = await refreshToken(pairs.refreshToken)
//   if (status === 200) {
//     createPairs(data)
//   } else {
//     return null
//   }
//   return data
// }
