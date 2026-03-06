import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Group, GroupId } from '../../core/domain/Group';
import { TypeormAccount } from './TypeormAccount';
import { AccountId } from '../../core/domain/Account';

@Entity('signer_groups')
export class TypeormGroup {
    @PrimaryGeneratedColumn('uuid')
    id: GroupId;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ name: 'account_id', type: 'uuid' })
    accountId: AccountId;

    @ManyToOne(() => TypeormAccount, (account) => account.groups)
    @JoinColumn({ name: 'account_id' })
    account: TypeormAccount;

    toDomain(): Group {
        return new Group({
            id: this.id,
            name: this.name,
            account: this.account ? { id: this.account.id } : { id: this.accountId },
        });
    }

    static fromDomain(group: Group): TypeormGroup {
        const entity = new TypeormGroup();
        entity.id = group.id;
        entity.name = group.name;
        entity.accountId = group.account.id;
        return entity;
    }
}
