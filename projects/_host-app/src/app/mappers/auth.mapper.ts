import { LoginResponseDto } from '../dtos/auth.dto';
import { AuthToken } from '../models/auth.model';

export function mapLoginDtoToAuthToken(dto: LoginResponseDto): AuthToken {
  return {
    id: dto.user.id,
    token: dto.accessToken,
  };
}
