import { TypeormConnectionManager } from '../../../../../config/TypeormConnectionManager';
import { Group, GroupId } from '../entities/Group';
import { BusinessId } from '../entities/Business';
import { TypeormGroupRepository } from '../../../infrastructure/repositories/TypeormGroupRepository';

export interface GroupRepository {
    save(group: Group): Promise<Group>;
    getById(id: GroupId): Promise<Group | undefined>;
    getByBusinessId(businessId: BusinessId): Promise<Group[]>;
    delete(id: GroupId): Promise<Group>;
}

export const groupRepository = new TypeormGroupRepository(TypeormConnectionManager.getDataSource());
