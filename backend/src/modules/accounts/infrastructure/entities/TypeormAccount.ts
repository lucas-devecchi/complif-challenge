import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { TypeormBusiness } from '../../../businesses/infrastructure/entities/TypeormBusiness';
import { TypeormSignatureSchema } from '../../../signatureSchemas/infrastructure/TypeormSignatureSchema';
import { BusinessId } from '../../../businesses/core/domain/entities/Business';
import { Account, AccountId } from '../../core/domain/Account';

@Entity('accounts')
export class TypeormAccount {
    @PrimaryGeneratedColumn("uuid")
    id: AccountId;

    @Column({ type: 'varchar' })
    accountNumber: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @Column({ type: 'uuid' })
    businessId: BusinessId;

    @OneToOne(() => TypeormSignatureSchema, (signatureSchema) => signatureSchema.account)
    signatureSchema: TypeormSignatureSchema;

    @ManyToOne(() => TypeormBusiness, (business) => business.accounts)
    business: TypeormBusiness;

    toDomain(): Account {
        return new Account({
            id: this.id,
            accountNumber: this.accountNumber,
            business: !!this.business ? this.business.toDomain() : { id: this.businessId },
        });
    }

    static fromDomain(account: Account): TypeormAccount {
        const entity = new TypeormAccount();
        entity.id = account.id;
        entity.accountNumber = account.accountNumber;
        entity.businessId = account.business.id;
        return entity;
    }
}
