import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Group, GroupId } from '../../core/domain/Group';
import { TypeormBusiness } from '../../../businesses/infrastructure/TypeormBusiness';
import { BusinessId } from '../../../businesses/core/domain/Business';

@Entity('groups')
export class TypeormGroup {
    @PrimaryGeneratedColumn('uuid')
    id: GroupId;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ name: 'business_id', type: 'uuid' })
    businessId: BusinessId;

    @ManyToOne(() => TypeormBusiness, (business) => business.groups)
    business: TypeormBusiness;

    toDomain(): Group {
        return new Group({
            id: this.id,
            name: this.name,
            business: this.business ? { id: this.business.id } : { id: this.businessId },
        });
    }

    static fromDomain(group: Group): TypeormGroup {
        const entity = new TypeormGroup();
        entity.id = group.id;
        entity.name = group.name;
        entity.businessId = group.business.id;
        return entity;
    }
}
