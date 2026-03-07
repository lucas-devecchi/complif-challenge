import { DataSource, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { BusinessRepository, GetAllParams } from "../../core/domain/repositories/BusinessRepository";
import { Business, BusinessId } from "../../core/domain/entities/Business";
import { TypeormBusiness } from "../entities/TypeormBusiness";
import { BusinessNotFound } from "../../core/domain/errors/BusinessNotFound";
import { EntriesResult } from "../../../shared/domain/EntriesResult";

export class TypeormBusinessRepository implements BusinessRepository {
    private repository: Repository<TypeormBusiness>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TypeormBusiness);
    }

    private relations: FindOneOptions<TypeormBusiness>['relations'] = {
    };

    async save(business: Business): Promise<Business> {
        const businessEntity = TypeormBusiness.fromDomain(business);
        await this.repository.save(businessEntity);
        return businessEntity.toDomain();
    }

    async getById(id: string): Promise<Business | undefined> {
        const business = await this.repository.findOneBy({ id });
        return business ? business.toDomain() : undefined;
    }

    async getAll(params: GetAllParams): Promise<EntriesResult<Business>> {
        let where: FindOptionsWhere<TypeormBusiness>[] = [];

        const [businesses, total] = await this.repository.findAndCount({
            where: where.length > 0 ? where : {},
            relations: this.relations,
            skip: params.pagination.skip(),
            take: params.pagination.take(),
            order: { name: 'ASC' },
        });

        return {
            entries: businesses.map(business => business.toDomain()),
            pagination: {
                total,
                page: params.pagination.page,
                pageSize: params.pagination.pageSize,
            }
        };
    }


    async delete(id: BusinessId): Promise<Business> {
        const business = await this.repository.findOne({
            where: { id },
        });

        if (!business) {
            throw new BusinessNotFound(id);
        }

        await this.repository.delete(id);

        return business.toDomain();
    }
}
