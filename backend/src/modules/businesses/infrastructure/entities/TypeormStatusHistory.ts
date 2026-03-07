import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { TypeormBusiness } from './TypeormBusiness';
import { TypeormUser } from '../../../users/infrastructure/TypeormUser';
import { BusinessId } from '../../core/domain/entities/Business';
import { UserId } from '../../../users/core/domain/User';
import { StatusHistory, StatusHistoryId } from '../../core/domain/entities/StatusHistory';
import { BusinessStatus } from '../../core/domain/entities/Business';

@Entity('status_history')
export class TypeormStatusHistory {
    @PrimaryGeneratedColumn('uuid')
    id: StatusHistoryId;

    @Column({ type: 'uuid' })
    businessId: BusinessId;

    @Column({ type: 'enum', enum: BusinessStatus, nullable: true })
    previousStatus: BusinessStatus | null;

    @Column({ type: 'enum', enum: BusinessStatus })
    newStatus: BusinessStatus;

    @Column({ type: 'uuid' })
    userId: UserId;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => TypeormBusiness, (business) => business.statusHistories)
    business: TypeormBusiness;

    @ManyToOne(() => TypeormUser)
    user: TypeormUser;

    toDomain(): StatusHistory {
        return new StatusHistory({
            id: this.id,
            business: !!this.business ? this.business.toDomain() : { id: this.businessId },
            previousStatus: this.previousStatus ?? undefined,
            newStatus: this.newStatus,
            user: !!this.user ? this.user.toDomain() : { id: this.userId },
        });
    }

    static fromDomain(history: StatusHistory): TypeormStatusHistory {
        const entity = new TypeormStatusHistory();
        entity.id = history.id;
        entity.businessId = history.business.id;
        entity.previousStatus = history.previousStatus ?? null;
        entity.newStatus = history.newStatus;
        entity.userId = history.user.id;
        return entity;
    }
}
