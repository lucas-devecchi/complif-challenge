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
        business: true,
    };

    async save(account: Account): Promise<Account> {
        const accountEntity = TypeormAccount.fromDomain(account);
        await this.repository.save(accountEntity);
        return accountEntity.toDomain();
    }

    async getById(id: string): Promise<Account | undefined> {
        const account = await this.repository.findOneBy({ id });
        return account ? account.toDomain() : undefined;
    }

    async getAll(params: GetAllParams): Promise<EntriesResult<Account>> {
        let where: FindOptionsWhere<TypeormAccount>[] = [];

        const [accounts, total] = await this.repository.findAndCount({
            where: where.length > 0 ? where : {},
            relations: this.relations,
            skip: params.pagination.skip(),
            take: params.pagination.take(),
            order: { accountNumber: 'ASC' },
        });

        return {
            entries: accounts.map(account => account.toDomain()),
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

        return account.toDomain();
    }
}
