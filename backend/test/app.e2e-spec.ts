import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from "pactum";
import { AuthDto } from "../src/auth/dto";
import { EditUserDto } from "../src/user/dto";
import { CreateKanjiDto, EditKanjiDto } from "../src/kanji/dto";

describe("App e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl("http://localhost:3333");
  });

  afterAll(() => {
    app.close();
  });

  describe("Auth", () => {
    const dto: AuthDto = {
      email: "test@email.com",
      password: "123",
    };

    describe("SignUp", () => {
      it("Should throw if - email empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it("Should throw if - password empty", () => {
        return pactum.spec().post("/auth/signup").withBody({ email: dto.email }).expectStatus(400);
      });

      it("Should throw if - no body", () => {
        return pactum.spec().post("/auth/signup").withBody({}).expectStatus(400);
      });

      it("Should SignUp", () => {
        return pactum.spec().post("/auth/signup").withBody(dto).expectStatus(201);
      });
    });

    describe("SignIn", () => {
      it("Should throw if - email empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it("Should throw if - password empty", () => {
        return pactum.spec().post("/auth/signin").withBody({ email: dto.email }).expectStatus(400);
      });

      it("Should throw if - no body", () => {
        return pactum.spec().post("/auth/signin").withBody({}).expectStatus(400);
      });

      it("Should SignIn", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody(dto)
          .expectStatus(200)
          .stores("userAt", "access_token");
      });
    });
  });

  describe("User", () => {
    describe("Get User", () => {
      it("Should get current user", () => {
        return pactum
          .spec()
          .get("/users/profile")
          .withHeaders({ Authorization: "Bearer $S{userAt}" })
          .expectStatus(200);
      });
    });

    describe("Edit User", () => {
      it("Should edit user", () => {
        const dto: EditUserDto = {
          firstName: "Andrei",
          email: "andrei123@email.com",
        };
        return pactum
          .spec()
          .patch("/users")
          .withHeaders({ Authorization: "Bearer $S{userAt}" })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });

    describe("Remove User", () => {});
  });

  describe("Words", () => {
    describe("Get Word", () => {});

    describe("Get Word by Id", () => {});

    describe("Get Word by Meaning", () => {});

    describe("Get Word by Pronunciation", () => {});

    describe("Create Word", () => {});

    describe("Edit Word by Id", () => {});

    describe("Remove Word by Id", () => {});
  });

  describe("Kanjis", () => {
    describe("Get Empty Kanjis", () => {
      it("Should get kanjis", () => {
        return pactum
          .spec()
          .get("/kanjis")
          .withHeaders({ Authorization: "Bearer $S{userAt}" })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe("Create Kanji", () => {
      const dto: CreateKanjiDto = {
        kanji: "正",
        onyomi: "セイ ショウ",
      };
      it("Should create kanji", () => {
        return pactum
          .spec()
          .post("/kanjis/create")
          .withHeaders({ Authorization: "Bearer $S{userAt}" })
          .withBody(dto)
          .expectStatus(201)
          .stores("kanjiId", "id");
      });
    });

    describe("Get Kanji", () => {
      it("Should get kanjis", () => {
        return pactum
          .spec()
          .get("/kanjis")
          .withHeaders({ Authorization: "Bearer $S{userAt}" })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe("Get Kanji by Id", () => {
      it("Should get kanjis by id", () => {
        return pactum
          .spec()
          .get("/kanjis/{id}")
          .withPathParams("id", "$S{kanjiId}")
          .withHeaders({ Authorization: "Bearer $S{userAt}" })
          .expectStatus(200)
          .expectBodyContains("$S{kanjiId}");
      });
    });

    describe("Create Kanji Word Association", () => {});

    describe("Edit Kanji by Id", () => {
      const dto: EditKanjiDto = {
        kunyomi: "ただ まさ",
      };
      it("Should edit kanjis", () => {
        return pactum
          .spec()
          .patch("/kanjis/{id}")
          .withPathParams("id", "$S{kanjiId}")
          .withHeaders({ Authorization: "Bearer $S{userAt}" })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.kunyomi);
      });
    });

    describe("Remove Kanji by Id", () => {
      it("Should delete kanjis", () => {
        return pactum
          .spec()
          .delete("/kanjis/{id}")
          .withPathParams("id", "$S{kanjiId}")
          .withHeaders({ Authorization: "Bearer $S{userAt}" })
          .expectStatus(204);
      });

      it("Should get empty kanjis", () => {
        return pactum
          .spec()
          .get("/kanjis")
          .withHeaders({ Authorization: "Bearer $S{userAt}" })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
