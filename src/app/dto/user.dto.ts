import { TaskDto } from './task.dto';

export class UserDto {
    id?: number;
    name?: string;
    email?: string;
    avatar?: string;
    role?: string;
    tasks?: TaskDto[];
}
