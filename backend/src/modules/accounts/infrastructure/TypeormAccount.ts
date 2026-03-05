import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { Account, AccountId } from '../core/domain/Account';
import { TypeormBusiness } from '../../businesses/infrastructure/TypeormBusiness';
import { TypeormSignatureSchema } from '../../signatureSchemas/infrastructure/TypeormSignatureSchema';

@Entity('accounts')
export class TypeormAccount {
    @PrimaryGeneratedColumn("uuid")
    id: AccountId;

    @Column({ type: 'varchar' })
    accountNumber: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @OneToOne(() => TypeormSignatureSchema, (signatureSchema) => signatureSchema.account)
    @JoinColumn({ name: 'signature_schema_id' })
    signatureSchema: TypeormSignatureSchema;

    @ManyToOne(() => TypeormBusiness, (business) => business.accounts)
    @JoinColumn({ name: 'business_id' })
    business: TypeormBusiness;

    static fromDomain(account: Account): TypeormAccount {
        const entity = new TypeormAccount();
        entity.id = account.id;
        entity.accountNumber = account.accountNumber;
        entity.business = { id: account.business.id } as TypeormBusiness;
        entity.signatureSchema = { id: account.signatureSchema.id } as TypeormSignatureSchema;
        return entity;
    }

    toDomain(): Account {
        return new Account({
            id: this.id,
            accountNumber: this.accountNumber,
            business: { id: this.business.id },
            signatureSchema: { id: this.signatureSchema.id },
        });
    }
}