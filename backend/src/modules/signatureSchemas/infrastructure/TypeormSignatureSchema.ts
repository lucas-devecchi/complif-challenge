import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { SignatureSchemaId } from '../core/domain/entities/SignatureSchema';
import { TypeormAccount } from '../../accounts/infrastructure/TypeormAccount';

@Entity('signatureSchemas')
export class TypeormSignatureSchema {
    @PrimaryGeneratedColumn("uuid")
    id: SignatureSchemaId;

    @Column({ type: 'int' })
    version: number;

    @OneToOne(() => TypeormAccount, (account) => account.signatureSchema)
    account: TypeormAccount;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
}