// auth.dto.ts
export interface LoginResponseDto {
  accessToken: string;
  user: { id: number; email: string };
}

export interface RegisterResponseDto extends LoginResponseDto {}
