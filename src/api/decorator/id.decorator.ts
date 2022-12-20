import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';

export const Id = createParamDecorator((name = 'id', ctx: ExecutionContext): number => {
  const request = ctx.switchToHttp().getRequest();

  if (!parseInt(request.params[name])) {
    throw new NotFoundException();
  }

  return parseInt(request.params[name]);
});
