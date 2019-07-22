import { UserDto } from './user.dto';

export class TaskDto {
    id?: number;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    users?: UserDto[];
}
