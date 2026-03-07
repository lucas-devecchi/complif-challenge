import { TypeormConnectionManager } from '../../../../config/TypeormConnectionManager';
import { BusinessId } from '../../../businesses/core/domain/entities/Business';
import { EntriesResult } from '../../../shared/domain/EntriesResult';
import { Pagination } from '../../../shared/domain/Pagination';
import { TypeormUserRepository } from '../../infrastructure/TypeormUserRepository';
import { User, UserId } from './User';

export type GetAllParams = {
    pagination: Pagination;
};

export interface UserRepository {
    save(user: User): Promise<User>;
    getById(id: UserId): Promise<User | undefined>;
    getByEmail(email: string): Promise<User | undefined>;
    getAll(params: GetAllParams): Promise<EntriesResult<User>>;
    delete(id: UserId): Promise<User>;
}

export const userRepository = new TypeormUserRepository(TypeormConnectionManager.getDataSource());

