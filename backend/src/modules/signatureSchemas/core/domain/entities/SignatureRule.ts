import { randomUUID } from 'crypto';
import { Faculty } from '../Faculty';
import { SignatureSchemaProps } from './SignatureSchema';
import { OptionalExceptFor } from '../../../../shared/domain/utils';

export type SignatureRuleId = string;

export type SignatureRuleProps = {
    id: SignatureRuleId;
    schema: OptionalExceptFor<SignatureSchemaProps, 'id'>;
    faculty: Faculty;
};

export type NewSignatureRuleProps = Omit<SignatureRuleProps, 'id'>

export class SignatureRule {
    readonly id: SignatureRuleId;
    readonly schema: OptionalExceptFor<SignatureSchemaProps, 'id'>;;
    readonly faculty: Faculty;

    constructor(props: SignatureRuleProps) {
        this.id = props.id;
        this.schema = props.schema;
        this.faculty = props.faculty;
    }

    static new(props: NewSignatureRuleProps): SignatureRule {
        const id = randomUUID();
        return new SignatureRule({
            ...props,
            id
        });
    }
}
