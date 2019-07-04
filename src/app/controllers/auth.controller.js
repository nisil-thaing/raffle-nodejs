import { sign } from 'jsonwebtoken';
import { envVars } from '@app/configs';

export function generateToken(user) {
  const payload = JSON.stringify(user);
  const token = sign(payload, envVars.jwtSecret);

  return token;
}