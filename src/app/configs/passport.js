import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';
import { compareSync } from 'bcrypt';

import userModel from '../models/user.model';
import ENV_CONFIGS from './env-variables';

async function verifyLocalStrategyLogin(email, password, done) {
  let user = await userModel.findOne({ email });

  if (!user || !compareSync(password, user.hashedPassword)) {
    return done(
      null,
      false,
      { error: 'Your login details could not be verified. Please try again.' }
    );
  }

  user = user.toObject();
  delete user.hashedPassword;

  done(null, user);
}

async function verifyJwtStrategyLogin(payload, done) {
  let user = await userModel.findById(payload._id);

  if (!user) {
    return done(null, false);
  }

  user = user.toObject();
  delete user.hashedPassword;

  done(null, user);
}

(function initPassportConfig() {
  const localLogin = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, verifyLocalStrategyLogin);

  const jwtLogin = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ENV_CONFIGS.jwtSecret
  }, verifyJwtStrategyLogin);

  passport.use('local', localLogin);
  passport.use('jwt', jwtLogin);
})();

export default passport;