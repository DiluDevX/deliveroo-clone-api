/**
 * User role types
 */
export type UserRole = 'user' | 'platform_admin' | 'restaurant_admin' | 'restaurant_user';

export interface RestaurantAssignmentDTO {
  id: string;
  restaurantId: string;
  role: string;
}

/**
 * User profile from auth-service
 */
export interface UserProfileDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  restaurantId?: string;
  restaurantRole?: string;
  restaurantUsers?: RestaurantAssignmentDTO[];
}

/**
 * Auth service response wrapper
 */
export interface AuthServiceResponseDTO<T> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Response from auth-service /v1/auth/me endpoint
 */
export type GetMeResponseDTO = AuthServiceResponseDTO<UserProfileDTO>;

/**
 * Response from auth-service /v1/auth/login endpoint
 */
export interface LoginResponseDTO {
  accessToken: string;
  refreshToken?: string;
  user?: UserProfileDTO;
}

export type AuthServiceLoginResponseDTO = AuthServiceResponseDTO<LoginResponseDTO>;

/**
 * Response from auth-service /v1/auth/refresh endpoint
 */
export interface RefreshResponseDTO {
  accessToken: string;
  refreshToken?: string;
}

export type AuthServiceRefreshResponseDTO = AuthServiceResponseDTO<RefreshResponseDTO>;

/**
 * Actor context that gets injected into requests
 */
export type ActorType = 'USER' | 'PLATFORM_ADMIN' | 'RESTAURANT_ADMIN' | 'SYSTEM';

export interface ActorContextDTO {
  userId: string;
  actorId: string;
  actorUserId: string;
  actorType: ActorType;
  restaurantId?: string;
  restaurantRole?: string;
  email: string;
  firstName: string;
  lastName: string;
}
