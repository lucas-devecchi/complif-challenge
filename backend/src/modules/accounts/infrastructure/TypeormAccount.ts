import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { AccountId } from '../core/domain/Account';
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
}