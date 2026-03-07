import { DataSource, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { SignatureSchemaRepository, GetAllParams } from "../core/domain/repositories/SignatureSchemaRepository";
import { SignatureSchema, SignatureSchemaId } from "../core/domain/entities/SignatureSchema";
import { TypeormSignatureSchema } from "./TypeormSignatureSchema";
import { SignatureSchemaNotFound } from "../core/domain/errors/SignatureSchemaNotFound";
import { EntriesResult } from "../../shared/domain/EntriesResult";
import { AccountId } from "../../accounts/core/domain/Account";

export class TypeormSignatureSchemaRepository implements SignatureSchemaRepository {
    private repository: Repository<TypeormSignatureSchema>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TypeormSignatureSchema);
    }

    private relations: FindOneOptions<TypeormSignatureSchema>['relations'] = {
        account: true,
    };

    async save(signatureSchema: SignatureSchema): Promise<SignatureSchema> {
        const signatureSchemaEntity = TypeormSignatureSchema.fromDomain(signatureSchema);
        await this.repository.save(signatureSchemaEntity);
        return signatureSchemaEntity.toDomain();
    }

    async getById(id: string): Promise<SignatureSchema | undefined> {
        const signatureSchema = await this.repository.findOneBy({ id });
        return signatureSchema ? signatureSchema.toDomain() : undefined;
    }

    async getAll(params: GetAllParams): Promise<EntriesResult<SignatureSchema>> {
        let where: FindOptionsWhere<TypeormSignatureSchema>[] = [];

        const [signatureSchemas, total] = await this.repository.findAndCount({
            where: where.length > 0 ? where : {},
            relations: this.relations,
            skip: params.pagination.skip(),
            take: params.pagination.take(),
            order: { createdAt: 'ASC' },
        });

        return {
            entries: signatureSchemas.map(signatureSchema => signatureSchema.toDomain()),
            pagination: {
                total,
                page: params.pagination.page,
                pageSize: params.pagination.pageSize,
            }
        };
    }


    async delete(id: SignatureSchemaId): Promise<SignatureSchema> {
        const signatureSchema = await this.repository.findOne({
            where: { id },
        });

        if (!signatureSchema) {
            throw new SignatureSchemaNotFound(id);
        }

        await this.repository.delete(id);

        return signatureSchema.toDomain();
    }

    async getNextVersionForAccount(accountId: AccountId): Promise<number> {
        const signatureSchemas = await this.repository.find({
            where: { accountId },
            order: { version: 'DESC' },
            take: 1,
        });

        return signatureSchemas.length > 0 ? signatureSchemas[0].version + 1 : 1;
    }
}

