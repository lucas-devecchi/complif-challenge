import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { BusinessId } from '../core/domain/Business';

@Entity('businesses')
export class TypeormBusiness {
    @PrimaryGeneratedColumn("uuid")
    id: BusinessId;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ name: 'tax_id', type: 'varchar' })
    taxId: string;

    @Column({ type: 'varchar' })
    country: string;

    @Column({ type: 'varchar' })
    industry: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
}
