export class Job {
    readonly id?: string;
    enterprise: string;
    owner: string;
    description: string;
    published: Date;
    active: boolean;
    quantity: number;
    place: string;
    courseId: string;
}
