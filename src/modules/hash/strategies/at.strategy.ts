import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { HashService } from "../hash.service";

type JwtPayload = {
  sub: string;
  email: string;
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt' ) {
  constructor(
    config: ConfigService,
    private authService: HashService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('AT_SECRET'),
      passReqToCallback: true,
      ignoreExpiration: false
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const user = await this.authService.getUserId(payload.sub);
    const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim();
    const rtMatches = await bcrypt.compare(refreshToken, user.hashed_rt);
    if (!rtMatches) throw new UnauthorizedException();

    return payload;
  }
}