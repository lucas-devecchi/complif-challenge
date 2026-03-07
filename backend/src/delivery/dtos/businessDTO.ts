import { BusinessStatus } from "../../modules/businesses/core/domain/entities/Business";

export type CreateBusinessDto = {
    name: string;
    taxId: string;
    country: string;
    industry: string;
    documentsComplete?: boolean; // TODO: provision for incomplete documents.
    status?: BusinessStatus; // TODO: check if undefined is needed in the future.
    riskScore?: number; // TODO: check if undefined is needed in the future.
}; 