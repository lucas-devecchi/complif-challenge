import { DataSource, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { BusinessRepository, GetAllParams } from "../core/domain/BusinessRepository";
import { Business, BusinessId } from "../core/domain/Business";
import { TypeormBusiness } from "./TypeormBusiness";
import { BusinessNotFound } from "../core/domain/errors/BusinessNotFound";
import { EntriesResult } from "../../shared/domain/EntriesResult";

export class TypeormBusinessRepository implements BusinessRepository {
    private repository: Repository<TypeormBusiness>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TypeormBusiness);
    }

    private relations: FindOneOptions<TypeormBusiness>['relations'] = {
    };

    async save(business: Business): Promise<Business> {
        const businessEntity = this.toEntity(business);
        await this.repository.save(businessEntity);
        return this.toDomain(businessEntity);
    }

    async getById(id: string): Promise<Business | null> {
        const business = await this.repository.findOneBy({ id });
        return business ? this.toDomain(business) : null;
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
            entries: businesses.map(business => this.toDomain(business)),
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

        return this.toDomain(business);
    }

    private toEntity(business: Business): TypeormBusiness {
        const entity = new TypeormBusiness();
        entity.id = business.id;
        entity.name = business.name;
        entity.taxId = business.taxId;
        entity.country = business.country;
        entity.industry = business.industry;

        return entity;
    }

    private toDomain(entity: TypeormBusiness): Business {
        return new Business({
            id: entity.id,
            name: entity.name,
            taxId: entity.taxId,
            country: entity.country,
            industry: entity.industry,
        });
    }
}