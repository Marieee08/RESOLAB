export {}

export type Roles = 'ADMIN' | 'USER'

declare global {
  interface CustomJwtSessionClaims {
    firstName?: string
    primaryEmail?: string
    metadata: {
        role?: Roles
      }
  }
}