
export type CreateBusinessDto = {
    name: string;
    taxId: string;
    country: string;
    industry: string;
    documentsComplete?: boolean; // TODO: provision for incomplete documents.
    userId: string
}; 