import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Business, BusinessId, BusinessStatus } from '../../core/domain/entities/Business';
import { TypeormAccount } from '../../../accounts/infrastructure/TypeormAccount';
import { TypeormGroup } from './TypeormGroup';

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

    @Column({ type: 'enum', enum: BusinessStatus })
    status: BusinessStatus;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @OneToMany(() => TypeormAccount, (account) => account.business)
    accounts?: TypeormAccount[];

    @OneToMany(() => TypeormGroup, (group) => group.business)
    groups?: TypeormGroup[];

    toDomain(): Business {
        return new Business({
            id: this.id,
            name: this.name,
            taxId: this.taxId,
            country: this.country,
            industry: this.industry,
            status: this.status,
        });
    }

    static fromDomain(business: Business): TypeormBusiness {
        const entity = new TypeormBusiness();
        entity.id = business.id;
        entity.name = business.name;
        entity.taxId = business.taxId;
        entity.country = business.country;
        entity.industry = business.industry;
        entity.status = business.status;
        return entity;
    }
}
