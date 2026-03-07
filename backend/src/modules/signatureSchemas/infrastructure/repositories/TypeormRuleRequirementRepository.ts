import { DataSource, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { RuleRequirementRepository, GetAllParams } from '../../core/domain/repositories/RuleRequirementRepository';
import { RuleRequirement, RuleRequirementId } from '../../core/domain/entities/RuleRequirement';
import { TypeormRuleRequirement } from '../entities/TypeormRuleRequirement';
import { RuleRequirementNotFound } from '../../core/domain/errors/RuleRequirementNotFound';
import { EntriesResult } from '../../../shared/domain/EntriesResult';

export class TypeormRuleRequirementRepository implements RuleRequirementRepository {
    private repository: Repository<TypeormRuleRequirement>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TypeormRuleRequirement);
    }

    private relations: FindOneOptions<TypeormRuleRequirement>['relations'] = {
        option: true,
        group: true,
    };

    async save(requirement: RuleRequirement): Promise<RuleRequirement> {
        const entity = TypeormRuleRequirement.fromDomain(requirement);
        const saved = await this.repository.save(entity);
        return saved.toDomain();
    }

    async getById(id: RuleRequirementId): Promise<RuleRequirement | undefined> {
        const entity = await this.repository.findOne({
            where: { id },
            relations: this.relations,
        });
        return entity ? entity.toDomain() : undefined;
    }

    async getAll(params: GetAllParams): Promise<EntriesResult<RuleRequirement>> {
        const where: FindOptionsWhere<TypeormRuleRequirement> = {};
        if (params.optionId) where.optionId = params.optionId;

        const [entries, total] = await this.repository.findAndCount({
            where,
            relations: this.relations,
            skip: params.pagination.skip(),
            take: params.pagination.take(),
            order: { minSignatures: 'ASC' },
        });

        return {
            entries: entries.map((e) => e.toDomain()),
            pagination: { total, page: params.pagination.page, pageSize: params.pagination.pageSize },
        };
    }

    async delete(id: RuleRequirementId): Promise<RuleRequirement> {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) throw new RuleRequirementNotFound(id);
        await this.repository.delete(id);
        return entity.toDomain();
    }

    async getByOptionId(optionId: string): Promise<RuleRequirement[]> {
        const entities = await this.repository.find({
            where: { optionId },
            relations: this.relations,
            order: { minSignatures: 'ASC' },
        });
        return entities.map((e) => e.toDomain());
    }
}
