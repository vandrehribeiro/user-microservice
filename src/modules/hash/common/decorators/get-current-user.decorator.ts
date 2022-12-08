import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from '../../types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    
    
    if (!data) {
      //console.log('get-current-user-decorator.ts', request.user);
      return request.user;
    }

    //console.log('get-current-user-decorator.ts', request.user);
    
    return request.user[data];
  },
);
