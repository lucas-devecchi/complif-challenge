import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { AccountId } from '../core/domain/Account';

@Entity('accountes')
export class TypeormAccount {
    @PrimaryGeneratedColumn("uuid")
    id: AccountId;

    @Column({ type: 'varchar' })
    accountNumber: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
}

