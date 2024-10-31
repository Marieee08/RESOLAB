import type { NextRequest } from 'next/server'
import type { ClerkMiddlewareConfig } from '@clerk/nextjs'

interface UserMetadata {
    role?: 'admin' | 'user';
  }
  
  declare global {
    interface CustomUserMetadata extends UserMetadata {}
  }