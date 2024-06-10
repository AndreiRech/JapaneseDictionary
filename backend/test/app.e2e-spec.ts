import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { PrismaService } from "../src/prisma/prisma.service"
import * as pactum from "pactum"
import { AuthDto } from "src/auth/dto"

describe ("App e2e", () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }))
    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()

    pactum.request.setBaseUrl("http://localhost:3333")
  })

  afterAll(() => {
    app.close()
  })
  
  describe ("Auth", () => {
    const dto: AuthDto = {
      email: "test@email.com",
      password: "123"
    }

    describe ("SignUp", () => {
      it("Should throw if - email empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({password: dto.password})
          .expectStatus(400)
      })

      it("Should throw if - password empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({email: dto.email})
          .expectStatus(400)
      })

      it("Should throw if - no body", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({})
          .expectStatus(400)
      })

      it("Should SignUp", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody(dto)
          .expectStatus(201)
      })
    })

    describe ("SignIn", () => {
      it("Should throw if - email empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({password: dto.password})
          .expectStatus(400)
      })

      it("Should throw if - password empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({email: dto.email})
          .expectStatus(400)
      })

      it("Should throw if - no body", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({})
          .expectStatus(400)
      })

      it("Should SignIn", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody(dto)
          .expectStatus(200)
          .stores("userAt", "access_token")
      })
    })
  })

  describe ("User", () => {
    describe ("Get User", () => {
      it("Should get current user", () => {
        return pactum
          .spec()
          .get("/users/profile")
          .withHeaders({Authorization: "Bearer $S{userAt}"})
          .expectStatus(200)
      })
    })

    describe ("Edit User", () => {
      
    })

    describe ("Remove User", () => {
      
    })
  })

  describe ("Kanjis", () => {
    describe ("Get Kanji", () => {
      
    })

    describe ("Get Kanji by Id", () => {
      
    })

    describe ("Get all Kanjis", () => {
      
    })

    describe ("Create Kanji", () => {
      
    })

    describe ("Create Kanji Word Association", () => {
      
    })

    describe ("Edit Kanji", () => {
      
    })

    describe ("Remove Kanji", () => {
      
    })
  })

  describe ("Words", () => {
    describe ("Get Word", () => {
      
    })

    describe ("Get Word by Id", () => {
      
    })

    describe ("Get Word by Meaning", () => {
      
    })

    describe ("Get Word by Pronunciation", () => {
      
    })

    describe ("Get all Words", () => {
      
    })

    describe ("Create Word", () => {
      
    })

    describe ("Edit Word", () => {
      
    })

    describe ("Remove Word", () => {
      
    })
  })
})