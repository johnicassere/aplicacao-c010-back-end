-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobreNome" TEXT,
    "senha" TEXT NOT NULL,
    "imagem" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mesa" (
    "id" TEXT NOT NULL,
    "numeroMesa" SERIAL NOT NULL,
    "livre" BOOLEAN NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "mesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "observacao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MenuToMesa" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_MenuToMesa_AB_unique" ON "_MenuToMesa"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuToMesa_B_index" ON "_MenuToMesa"("B");

-- AddForeignKey
ALTER TABLE "mesa" ADD CONSTRAINT "mesa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToMesa" ADD FOREIGN KEY ("A") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToMesa" ADD FOREIGN KEY ("B") REFERENCES "mesa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
