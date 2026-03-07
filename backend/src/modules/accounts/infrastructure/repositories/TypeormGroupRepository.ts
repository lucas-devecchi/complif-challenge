import { DataSource, Repository } from 'typeorm';
import { GroupRepository } from '../../core/domain/GroupRepository';
import { Group, GroupId } from '../../core/domain/Group';
import { TypeormGroup } from '../entities/TypeormGroup';
import { BusinessId } from '../../../businesses/core/domain/Business';
import { GroupNotFound } from '../../core/domain/errors/SignerGroupNotFound';

export class TypeormGroupRepository implements GroupRepository {
    private repository: Repository<TypeormGroup>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TypeormGroup);
    }

    async save(group: Group): Promise<Group> {
        const entity = TypeormGroup.fromDomain(group);
        await this.repository.save(entity);
        return entity.toDomain();
    }

    async getById(id: GroupId): Promise<Group | undefined> {
        const group = await this.repository.findOneBy({ id });
        return group ? group.toDomain() : undefined;
    }

    async getByBusinessId(businessId: BusinessId): Promise<Group[]> {
        const groups = await this.repository.find({
            where: { businessId },
            order: { name: 'ASC' },
        });
        return groups.map((sg) => sg.toDomain());
    }

    async delete(id: GroupId): Promise<Group> {
        const group = await this.repository.findOneBy({ id });
        if (!group) {
            throw new GroupNotFound(id);
        }
        await this.repository.delete(id);
        return group.toDomain();
    }
}
