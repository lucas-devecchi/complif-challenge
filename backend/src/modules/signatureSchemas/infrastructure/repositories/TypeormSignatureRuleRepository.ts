import { DataSource, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { SignatureRuleRepository, GetAllParams } from '../../core/domain/repositories/SignatureRuleRepository';
import { SignatureRule, SignatureRuleId } from '../../core/domain/entities/SignatureRule';
import { TypeormSignatureRule } from '../entities/TypeormSignatureRule';
import { SignatureRuleNotFound } from '../../core/domain/errors/SignatureRuleNotFound';
import { EntriesResult } from '../../../shared/domain/EntriesResult';

export class TypeormSignatureRuleRepository implements SignatureRuleRepository {
    private repository: Repository<TypeormSignatureRule>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TypeormSignatureRule);
    }

    private relations: FindOneOptions<TypeormSignatureRule>['relations'] = {
        schema: true,
    };

    async save(rule: SignatureRule): Promise<SignatureRule> {
        const entity = TypeormSignatureRule.fromDomain(rule);
        const saved = await this.repository.save(entity);
        return saved.toDomain();
    }

    async getById(id: SignatureRuleId): Promise<SignatureRule | undefined> {
        const entity = await this.repository.findOne({
            where: { id },
            relations: this.relations,
        });
        return entity ? entity.toDomain() : undefined;
    }

    async getAll(params: GetAllParams): Promise<EntriesResult<SignatureRule>> {
        const where: FindOptionsWhere<TypeormSignatureRule> = {};
        if (params.schemaId) where.schemaId = params.schemaId;

        const [entries, total] = await this.repository.findAndCount({
            where,
            relations: this.relations,
            skip: params.pagination.skip(),
            take: params.pagination.take(),
            order: { faculty: 'ASC' },
        });

        return {
            entries: entries.map((e) => e.toDomain()),
            pagination: { total, page: params.pagination.page, pageSize: params.pagination.pageSize },
        };
    }

    async delete(id: SignatureRuleId): Promise<SignatureRule> {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) throw new SignatureRuleNotFound(id);
        await this.repository.delete(id);
        return entity.toDomain();
    }

    async getBySchemaId(schemaId: string): Promise<SignatureRule[]> {
        const entities = await this.repository.find({
            where: { schemaId },
            relations: this.relations,
            order: { faculty: 'ASC' },
        });
        return entities.map((e) => e.toDomain());
    }
}
