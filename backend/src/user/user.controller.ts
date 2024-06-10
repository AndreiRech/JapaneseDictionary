import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { User } from '@prisma/client'

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
    @Get("profile")
    getUser(@GetUser() user: User) {
        return user
    }
}
