export const USER_ROLES = {
  ADMIN: 'admin',
  CREATOR: 'creator',
  VIEWER: 'viewer'
} as const;

export const ROLE_HIERARCHY = {
  [USER_ROLES.ADMIN]: 3,
  [USER_ROLES.CREATOR]: 2,
  [USER_ROLES.VIEWER]: 1
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
