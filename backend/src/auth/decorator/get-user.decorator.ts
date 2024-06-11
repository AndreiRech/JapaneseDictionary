import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  return data ? request.user[data] : request.user;
});
