/* eslint-disable prettier/prettier */
import {usuarios} from './users';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { cursos } from './courses';
import { jobs } from './jobs'

const prisma = new PrismaClient();

async function main(){
    // for(const job of jobs){
    //     await prisma.jobs.create({
    //         data: job,
    //     })
    // }
    for(const curso of cursos){
        await prisma.courses.create({
            data: curso,
        })
    }
    for(let i = 0; i <= 3; i++){
        const usuario = usuarios[i];
        const us = {
            ...usuario,
            password: await bcrypt.hash(usuario.password, 10),
          }
        
        if(i === 0){
        await prisma.user.create({
            data: {...us, role: 'ADMIN'},
        })
        }
        else if(i === 1){
        await prisma.user.create({
            data: {...us, role: 'SENAC'},
        })
        }
        if(i === 2){
        await prisma.user.create({
            data: {...us, role: 'ENTERPRISE'},
        })
        }
        if(i === 3){
        await prisma.user.create({
            data: {...us, role: 'USER'},
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