import { DataSource, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { RuleOptionRepository, GetAllParams } from '../../core/domain/repositories/RuleOptionRepository';
import { RuleOption, RuleOptionId } from '../../core/domain/entities/RuleOption';
import { TypeormRuleOption } from '../entities/TypeormRuleOption';
import { RuleOptionNotFound } from '../../core/domain/errors/RuleOptionNotFound';
import { EntriesResult } from '../../../shared/domain/EntriesResult';

export class TypeormRuleOptionRepository implements RuleOptionRepository {
    private repository: Repository<TypeormRuleOption>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TypeormRuleOption);
    }

    private relations: FindOneOptions<TypeormRuleOption>['relations'] = {
        rule: true,
        requirements: true,
    };

    async save(option: RuleOption): Promise<RuleOption> {
        const entity = TypeormRuleOption.fromDomain(option);
        const saved = await this.repository.save(entity);
        return saved.toDomain();
    }

    async getById(id: RuleOptionId): Promise<RuleOption | undefined> {
        const entity = await this.repository.findOne({
            where: { id },
            relations: this.relations,
        });
        return entity ? entity.toDomain() : undefined;
    }

    async getAll(params: GetAllParams): Promise<EntriesResult<RuleOption>> {
        const where: FindOptionsWhere<TypeormRuleOption> = {};
        if (params.ruleId) where.ruleId = params.ruleId;

        const [entries, total] = await this.repository.findAndCount({
            where,
            relations: this.relations,
            skip: params.pagination.skip(),
            take: params.pagination.take(),
            order: { id: 'ASC' },
        });

        return {
            entries: entries.map((e) => e.toDomain()),
            pagination: { total, page: params.pagination.page, pageSize: params.pagination.pageSize },
        };
    }

    async delete(id: RuleOptionId): Promise<RuleOption> {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) throw new RuleOptionNotFound(id);
        await this.repository.delete(id);
        return entity.toDomain();
    }

    async getByRuleId(ruleId: string): Promise<RuleOption[]> {
        const entities = await this.repository.find({
            where: { ruleId },
            relations: this.relations,
            order: { id: 'ASC' },
        });
        return entities.map((e) => e.toDomain());
    }
}
