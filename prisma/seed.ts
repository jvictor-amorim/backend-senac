/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { cursos } from './courses';
import { usuarios } from './users';
import { jobs } from './jobs';

const prisma = new PrismaClient();

async function main() {
    for (const curso of cursos) {
        await prisma.courses.create({
            data: curso,
        })
    }

    for (const job of jobs) {
        const data = new Date();

        const br = new Date(data.setHours(data.getHours() - 3));

        await prisma.jobs.create({
            data: {...job, published: br, description: job.description},
        })
    }

    for (const usuario of usuarios) {
        const userc = {
            ...usuario, password: await bcrypt.hash(usuario.password, 10)
        }
            await prisma.user.create({
                data: { ...userc, cnpj: userc.cnpj, courseId: userc.courseId, address: userc.address },
            })
    }
}


main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})