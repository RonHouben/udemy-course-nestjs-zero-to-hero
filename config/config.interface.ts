export interface DbConfig {
  type: 'postgres';
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize: true;
}

export interface JwtConfig {
  secret: string;
  expiresIn: number;
}

export interface ServerConfig {
  port: number;
  origin: string | string[];
}
