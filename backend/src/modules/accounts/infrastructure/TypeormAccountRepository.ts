import { DataSource, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { AccountRepository, GetAllParams } from "../core/domain/AccountRepository";
import { Account, AccountId } from "../core/domain/Account";
import { TypeormAccount } from "./TypeormAccount";
import { AccountNotFound } from "../core/domain/errors/AccountNotFound";
import { EntriesResult } from "../../shared/domain/EntriesResult";

export class TypeormAccountRepository implements AccountRepository {
    private repository: Repository<TypeormAccount>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TypeormAccount);
    }

    private relations: FindOneOptions<TypeormAccount>['relations'] = {
    };

    async save(account: Account): Promise<Account> {
        const accountEntity = this.toEntity(account);
        await this.repository.save(accountEntity);
        return this.toDomain(accountEntity);
    }

    async getById(id: string): Promise<Account | null> {
        const account = await this.repository.findOneBy({ id });
        return account ? this.toDomain(account) : null;
    }

    async getAll(params: GetAllParams): Promise<EntriesResult<Account>> {
        let where: FindOptionsWhere<TypeormAccount>[] = [];

        const [accountes, total] = await this.repository.findAndCount({
            where: where.length > 0 ? where : {},
            relations: this.relations,
            skip: params.pagination.skip(),
            take: params.pagination.take(),
            order: { accountNumber: 'ASC' },
        });

        return {
            entries: accountes.map(account => this.toDomain(account)),
            pagination: {
                total,
                page: params.pagination.page,
                pageSize: params.pagination.pageSize,
            }
        };
    }


    async delete(id: AccountId): Promise<Account> {
        const account = await this.repository.findOne({
            where: { id },
        });

        if (!account) {
            throw new AccountNotFound(id);
        }

        await this.repository.delete(id);

        return this.toDomain(account);
    }

    private toEntity(account: Account): TypeormAccount {
        const entity = new TypeormAccount();
        entity.id = account.id;
        entity.accountNumber = account.accountNumber;

        return entity;
    }

    private toDomain(entity: TypeormAccount): Account {
        return new Account({
            id: entity.id,
            accountNumber: entity.accountNumber,
        });
    }
}
