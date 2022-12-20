import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((property: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return property ? request.currentUser && request.currentUser[property] : request.currentUser;
});
