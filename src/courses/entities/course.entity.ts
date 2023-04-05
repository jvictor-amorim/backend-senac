import { Jobs, User,  } from "@prisma/client";

export class Course {
    readonly id?: string;
    name: string;
    level: string;
    modality: string;
    duration: string;
    description: string;
    area: string;
    jobs: Jobs[];
    users: User[];
}
