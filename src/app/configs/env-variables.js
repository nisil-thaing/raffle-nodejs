import Joi from 'joi';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const envVarsSchema = Joi.object().keys({
  NODE_ENV: Joi.string()
    .allow(['development', 'production'])
    .default('development'),
  PORT: Joi.number()
    .default(3000),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string()
    .default('mongodb://localhost/mean')
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017)
}).unknown().required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const {
  NODE_ENV: env,
  PORT: port,
  JWT_SECRET: jwtSecret,
  MONGO_HOST,
  MONGO_PORT
} = envVars;
const config = {
  env,
  port,
  jwtSecret,
  mongo: {
    host: MONGO_HOST,
    port: MONGO_PORT
  }
};

export default config;
