-- CreateTable
CREATE TABLE "UserJobs" (
    "userId" TEXT NOT NULL,
    "jobsId" TEXT NOT NULL,

    CONSTRAINT "UserJobs_pkey" PRIMARY KEY ("userId","jobsId")
);

-- AddForeignKey
ALTER TABLE "UserJobs" ADD CONSTRAINT "UserJobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJobs" ADD CONSTRAINT "UserJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
