// types/index.ts
export type UserRole = 'admin' | 'user';

export interface UserPublicMetadata {
    role: UserRole;
}