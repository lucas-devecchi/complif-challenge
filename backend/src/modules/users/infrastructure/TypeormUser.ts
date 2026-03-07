import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User, UserId, UserRole } from '../core/domain/User';

@Entity('users')
export class TypeormUser {
    @PrimaryGeneratedColumn("uuid")
    id: UserId;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', default: UserRole.VIEWER })
    role: UserRole;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    toDomain(): User {
        return new User({
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
        });
    }

    static fromDomain(user: User): TypeormUser {
        const entity = new TypeormUser();
        entity.id = user.id;
        entity.name = user.name;
        entity.email = user.email;
        entity.password = user.password;
        entity.role = user.role;
        return entity;
    }
}
