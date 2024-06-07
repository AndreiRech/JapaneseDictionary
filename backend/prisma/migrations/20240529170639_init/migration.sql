-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "sentence" TEXT,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kanji" (
    "id" SERIAL NOT NULL,
    "kanji" TEXT NOT NULL,
    "onyomi" TEXT,
    "kunyomi" TEXT,

    CONSTRAINT "Kanji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordKanji" (
    "id" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,
    "kanjiId" INTEGER NOT NULL,

    CONSTRAINT "WordKanji_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WordKanji_wordId_kanjiId_key" ON "WordKanji"("wordId", "kanjiId");

-- AddForeignKey
ALTER TABLE "WordKanji" ADD CONSTRAINT "WordKanji_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordKanji" ADD CONSTRAINT "WordKanji_kanjiId_fkey" FOREIGN KEY ("kanjiId") REFERENCES "Kanji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
