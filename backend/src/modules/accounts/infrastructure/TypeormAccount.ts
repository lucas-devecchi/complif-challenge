import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { AccountId } from '../core/domain/Account';
import { TypeormBusiness } from '../../businesses/infrastructure/TypeormBusiness';

@Entity('accountes')
export class TypeormAccount {
    @PrimaryGeneratedColumn("uuid")
    id: AccountId;

    @Column({ type: 'varchar' })
    accountNumber: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(() => TypeormBusiness, (business) => business.id)
    business: TypeormBusiness
}