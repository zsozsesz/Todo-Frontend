import { UserDto } from './user.dto';

export class TaskDto {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    users?: UserDto[];
}
