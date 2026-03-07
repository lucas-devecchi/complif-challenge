import { TypeormGroupRepository } from '../../infrastructure/repositories/TypeormGroupRepository';
import { Group, GroupId } from './Group';
import { TypeormConnectionManager } from '../../../../config/TypeormConnectionManager';
import { BusinessId } from '../../../businesses/core/domain/Business';

export interface GroupRepository {
    save(group: Group): Promise<Group>;
    getById(id: GroupId): Promise<Group | undefined>;
    getByBusinessId(businessId: BusinessId): Promise<Group[]>;
    delete(id: GroupId): Promise<Group>;
}

export const groupRepository = new TypeormGroupRepository(TypeormConnectionManager.getDataSource());
