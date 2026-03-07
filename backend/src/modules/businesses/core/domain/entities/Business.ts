import { randomUUID } from 'crypto';

export type BusinessId = string;

export enum BusinessStatus {
    PENDING = 'pending',
    IN_REVIEW = 'in_review',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export type BusinessProps = {
    id: BusinessId;
    name: string;
    taxId: string;
    country: string;
    industry: string;
    status: BusinessStatus;
    riskScore: number;
};

export type NewProps = Omit<BusinessProps, 'id'>;

export class Business {
    readonly id: BusinessId;
    readonly name: string;
    readonly taxId: string;
    readonly country: string;
    readonly industry: string;
    readonly status: BusinessStatus;
    readonly riskScore: number;

    constructor(props: BusinessProps) {
        this.id = props.id;
        this.name = props.name;
        this.taxId = props.taxId;
        this.country = props.country;
        this.industry = props.industry;
        this.status = props.status;
        this.riskScore = props.riskScore;
    }

    static new(props: NewProps): Business {
        return new Business({
            ...props,
            id: randomUUID(),
        });
    }
}
