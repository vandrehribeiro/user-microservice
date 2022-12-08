import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

import { Hash } from "./entities/hash.entity";
import { JwtPayload, Tokens } from "./types";
import { AuthDto, HashDto } from "./dto";
import { User } from "../users/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { CreateHashDto } from "./dto/create-hash.dto";

@Injectable()
export class HashService {
  @Inject('USERS_REPOSITORY')
  private userRepository: Repository<User>;

  @Inject('HASH_REPOSITORY')
  private hashRepository: Repository<Hash>;

  constructor(
    private jwtService: JwtService,
    private config: ConfigService
  ) {}
    
  async getUserId(userId: string) {
      const hashedUser = await this.hashRepository.findOne({ where: { id: userId }});
      if (!hashedUser) throw new UnauthorizedException();
      return hashedUser;
  }

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    try {
      const hash = await this.hashData(dto.password);
      const date = new Date();
      const newHash: CreateHashDto = this.hashRepository.create(
        {
          user_id: dto.user_id,
          hash,
          role: dto.role,
          hashed_rt: '',
          updated_at: date
        }
      );
      const savedHash = await this.hashRepository.save(newHash);
      const tokens = await this.getTokens(savedHash.id, savedHash.user_id, savedHash.role);
      await this.updateRtHash(savedHash.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new Error(error);
    }
  }

  async signinLocal(dto: HashDto): Promise<Tokens> {
    const User = await this.userRepository.findOne({ where:
        { email: dto.email }
    });
    
    if (!User) throw new UnauthorizedException();
    
    const UserHash = await this.hashRepository.findOne({ where:
        { user_id: User.id }
    });

    const passwordMatches = await bcrypt.compare(dto.password, UserHash.hash);
    
    if (!passwordMatches) throw new UnauthorizedException();

    const tokens = await this.getTokens(UserHash.id, UserHash.user_id, UserHash.role);
    await this.updateRtHash(UserHash.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    const hashedUser = await this.hashRepository.findOne({ where: { user_id: userId }});
    
    if (!hashedUser) throw new UnauthorizedException();

    const hashed_token = hashedUser.hashed_rt = '';
    const { id, user_id, hash, created_at, ...rest } = hashedUser
    const hashedUpdate = await this.hashRepository.preload({
    id,
    ...rest
    });

    return this.hashRepository.save(hashedUpdate);
  }

  async refreshTokens(userId: string, rt: string) {
    const hashedUser = await this.hashRepository.findOne({ where: { user_id: userId }});
    
    if (!hashedUser || !hashedUser.hashed_rt) throw new UnauthorizedException();
    
    const rtMatches = await bcrypt.compare(rt, hashedUser.hashed_rt)
    if (!rtMatches) throw new UnauthorizedException();

    const tokens = await this.getTokens(hashedUser.id, hashedUser.user_id, hashedUser.role)
    await this.updateRtHash(hashedUser.id, tokens.refresh_token);

    return tokens
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    const preloadHash = await this.hashRepository.preload({
      id: userId,
      hashed_rt: hash
    })

    this.hashRepository.save(preloadHash);
  }

  hashData(data: string) {
    return bcrypt.hash(data, 12);
  }

  async getTokens(userId: string, user_id: string, role: 'Admin' | 'Editor' | 'Tutor' | 'Ong'): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      user_id,
      role
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '7d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}