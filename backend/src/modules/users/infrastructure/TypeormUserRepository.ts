import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import { UserRepository, GetAllParams } from "../core/domain/UserRepository";
import { User, UserId } from "../core/domain/User";
import { UserNotFound } from "../core/domain/errors/UserNotFound";
import { EntriesResult } from "../../shared/domain/EntriesResult";
import { TypeormUser } from "./TypeormUser";

export class TypeormUserRepository implements UserRepository {
    private repository: Repository<TypeormUser>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TypeormUser);
    }

    async save(user: User): Promise<User> {
        const userEntity = TypeormUser.fromDomain(user);
        await this.repository.save(userEntity);
        return userEntity.toDomain();
    }

    async getById(id: UserId): Promise<User | undefined> {
        const user = await this.repository.findOneBy({ id });
        return user ? user.toDomain() : undefined;
    }

    async getByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOneBy({ email });
        return user ? user.toDomain() : undefined;
    }

    async getAll(params: GetAllParams): Promise<EntriesResult<User>> {
        let where: FindOptionsWhere<TypeormUser>[] = [];

        const [users, total] = await this.repository.findAndCount({
            where: where.length > 0 ? where : {},
            skip: params.pagination.skip(),
            take: params.pagination.take(),
            order: { email: 'ASC' },
        });

        return {
            entries: users.map(user => user.toDomain()),
            pagination: {
                total,
                page: params.pagination.page,
                pageSize: params.pagination.pageSize,
            }
        };
    }

    async delete(id: UserId): Promise<User> {
        const user = await this.repository.findOne({
            where: { id },
        });

        if (!user) {
            throw new UserNotFound(id);
        }

        await this.repository.delete(id);

        return user.toDomain();
    }
}

