/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { cursos } from './courses';
import { usuarios } from './users';

const prisma = new PrismaClient();

async function main() {
    for (const curso of cursos) {
        await prisma.courses.create({
            data: curso,
        })
    }

    for (const usuario of usuarios) {
        const userc = {
            ...usuario, password: await bcrypt.hash(usuario.password, 10)
        }
        if (userc.courseId !== undefined || userc.courseId !== null) {
            await prisma.user.create({
                data: { ...userc, cnpj: userc.cnpj, courseId: userc.courseId, address: userc.address },
            })
        }
    }
}


main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})