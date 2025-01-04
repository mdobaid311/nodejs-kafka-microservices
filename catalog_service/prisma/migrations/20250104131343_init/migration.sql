-- CreateTable
CREATE TABLE "Proudct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Proudct_pkey" PRIMARY KEY ("id")
);
