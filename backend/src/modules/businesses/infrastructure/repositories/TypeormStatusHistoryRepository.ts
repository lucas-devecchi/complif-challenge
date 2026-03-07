import { DataSource, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { StatusHistoryRepository, GetAllParams } from '../../core/domain/repositories/StatusHistoryRepository';
import { StatusHistory, StatusHistoryId } from '../../core/domain/entities/StatusHistory';
import { EntriesResult } from '../../../shared/domain/EntriesResult';
import { TypeormStatusHistory } from '../entities/TypeormStatusHistory';

export class TypeormStatusHistoryRepository implements StatusHistoryRepository {
    private repository: Repository<TypeormStatusHistory>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TypeormStatusHistory);
    }

    private relations: FindOneOptions<TypeormStatusHistory>['relations'] = {
        business: true,
        user: true,
    };

    async save(history: StatusHistory): Promise<StatusHistory> {
        const entity = TypeormStatusHistory.fromDomain(history);
        const saved = await this.repository.save(entity);
        return saved.toDomain();
    }

    async getById(id: StatusHistoryId): Promise<StatusHistory | undefined> {
        const entity = await this.repository.findOne({
            where: { id },
            relations: this.relations,
        });
        return entity ? entity.toDomain() : undefined;
    }

    async getAll(params: GetAllParams): Promise<EntriesResult<StatusHistory>> {
        const where: FindOptionsWhere<TypeormStatusHistory> = {};
        if (params.businessId) {
            where.businessId = params.businessId;
        }

        const [entries, total] = await this.repository.findAndCount({
            where,
            relations: this.relations,
            skip: params.pagination.skip(),
            take: params.pagination.take(),
            order: { createdAt: 'DESC' },
        });

        return {
            entries: entries.map((e) => e.toDomain()),
            pagination: {
                total,
                page: params.pagination.page,
                pageSize: params.pagination.pageSize,
            },
        };
    }

    async getByBusinessId(businessId: string): Promise<StatusHistory[]> {
        const entries = await this.repository.find({
            where: { businessId },
            relations: this.relations,
            order: { createdAt: 'DESC' },
        });
        return entries.map((e) => e.toDomain());
    }
}
