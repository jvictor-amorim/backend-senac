import { Role } from "@prisma/client";

/* eslint-disable prettier/prettier */
export const usuarios = [
    {
        courseId: '8a63260c-f948-415b-a05e-3714f67e7ace',
        email: 'admin@admin.com',
        cpf: '12345678901',
        cnpj: '',
        address: 'Rua dos bobos, 0',
        password: 'Adm001',
        name: 'System',
        phone: '(81) 98765-4321',
        status: false,
        role: Role.ADMIN,
    },
    {
        courseId: '8a63260c-f948-415b-a05e-3714f67e7ace',
        email: 'senac@example.com',
        cpf: '13345678901',
        cnpj: '',
        address: 'Rua dos bobos, 0',
        password: 'Senac001',
        name: 'Funcionario',
        phone: '(81) 98765-4321',
        status: true,
        role: Role.SENAC,
    },
    {
        courseId: '8a63260c-f948-415b-a05e-3714f67e7ace',
        email: 'enterprise@example.com',
        cpf: '',
        cnpj: '1212123412121212',
        address: 'Rua dos bobos, 0',
        password: 'Enterprise001',
        name: 'Enterprise',
        phone: '(81) 98765-4321',
        status: true,
        role: Role.ENTERPRISE,
    },
    {
        courseId: '8a63260c-f948-415b-a05e-3714f67e7ace',
        email: 'user@example.com',
        cpf: '15345678901',
        cnpj: '',
        address: 'Rua dos bobos, 0',
        password: 'User001',
        name: 'User',
        phone: '(81) 98765-4321',
        status: true,
        role: Role.USER,
    }
]
