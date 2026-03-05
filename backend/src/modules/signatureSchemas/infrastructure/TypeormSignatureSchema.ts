import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { SignatureSchema, SignatureSchemaId } from '../core/domain/entities/SignatureSchema';
import { TypeormAccount } from '../../accounts/infrastructure/TypeormAccount';
import { AccountId } from '../../accounts/core/domain/Account';

@Entity('signatureSchemas')
export class TypeormSignatureSchema {
    @PrimaryGeneratedColumn("uuid")
    id: SignatureSchemaId;

    @Column({ type: 'int' })
    version: number;

    @Column()
    accountId: AccountId;
    
    @OneToOne(() => TypeormAccount, (account) => account.signatureSchema)
    account: TypeormAccount;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    static fromDomain(signatureSchema: SignatureSchema): TypeormSignatureSchema {
        const entity = new TypeormSignatureSchema();
        entity.id = signatureSchema.id;
        entity.version = signatureSchema.version;
        entity.accountId = signatureSchema.account.id;
        entity.account = { id: signatureSchema.account.id } as TypeormAccount;
        return entity;
    }

    toDomain(): SignatureSchema {
        return new SignatureSchema({
            id: this.id,
            version: this.version,
            account: { id: this.account.id },
        });
    }
}