import { TypeormGroupRepository } from '../../infrastructure/repositories/TypeormGroupRepository';
import { Group, GroupId } from './Group';
import { AccountId } from './Account';
import { TypeormConnectionManager } from '../../../../config/TypeormConnectionManager';

export interface GroupRepository {
    save(group: Group): Promise<Group>;
    getById(id: GroupId): Promise<Group | undefined>;
    getByAccountId(accountId: AccountId): Promise<Group[]>;
    delete(id: GroupId): Promise<Group>;
}

export const groupRepository = new TypeormGroupRepository(TypeormConnectionManager.getDataSource());
