import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { Request } from 'express'

@Controller("users")
export class UserController {
    @UseGuards(JwtGuard)
    @Get("profile")
    getUser(@Req() req: Request ) {
        return req.user
    }
}
