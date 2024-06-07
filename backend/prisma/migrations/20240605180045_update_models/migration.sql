/*
  Warnings:

  - You are about to drop the `Kanji` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WordKanji` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WordKanji" DROP CONSTRAINT "WordKanji_kanjiId_fkey";

-- DropForeignKey
ALTER TABLE "WordKanji" DROP CONSTRAINT "WordKanji_wordId_fkey";

-- DropTable
DROP TABLE "Kanji";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Word";

-- DropTable
DROP TABLE "WordKanji";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "words" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "word" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "sentence" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kanjis" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kanji" TEXT NOT NULL,
    "onyomi" TEXT,
    "kunyomi" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "kanjis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wordsKanji" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "wordId" INTEGER NOT NULL,
    "kanjiId" INTEGER NOT NULL,

    CONSTRAINT "wordsKanji_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wordsKanji_wordId_kanjiId_key" ON "wordsKanji"("wordId", "kanjiId");

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kanjis" ADD CONSTRAINT "kanjis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wordsKanji" ADD CONSTRAINT "wordsKanji_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wordsKanji" ADD CONSTRAINT "wordsKanji_kanjiId_fkey" FOREIGN KEY ("kanjiId") REFERENCES "kanjis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
