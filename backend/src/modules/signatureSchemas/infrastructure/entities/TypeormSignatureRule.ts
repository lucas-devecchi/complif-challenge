import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { SignatureRule, SignatureRuleId } from '../../core/domain/entities/SignatureRule';
import { Faculty } from '../../core/domain/Faculty';
import { TypeormSignatureSchema } from './TypeormSignatureSchema';
import { SignatureSchemaId } from '../../core/domain/entities/SignatureSchema';
import { TypeormRuleOption } from './TypeormRuleOption';

@Entity('signature_rules')
export class TypeormSignatureRule {
    @PrimaryGeneratedColumn('uuid')
    id: SignatureRuleId;

    @Column({ type: 'uuid' })
    schemaId: SignatureSchemaId;

    @Column({ type: 'enum', enum: Faculty })
    faculty: Faculty;

    @ManyToOne(() => TypeormSignatureSchema, (schema) => schema.signatureRules)
    schema: TypeormSignatureSchema;

    @OneToMany(() => TypeormRuleOption, (option) => option.rule)
    options: TypeormRuleOption[];

    toDomain(): SignatureRule {
        return new SignatureRule({
            id: this.id,
            schema: !!this.schema ? this.schema.toDomain() : { id: this.schemaId },
            faculty: this.faculty,
        });
    }

    static fromDomain(rule: SignatureRule): TypeormSignatureRule {
        const entity = new TypeormSignatureRule();
        entity.id = rule.id;
        entity.schemaId = rule.schema.id;
        entity.faculty = rule.faculty;
        return entity;
    }
}
