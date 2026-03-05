import { signatureSchemaRepository, SignatureSchemaRepository } from "../repositories/SignatureSchemaRepository";
import { NewProps, SignatureSchema, SignatureSchemaId } from "../entities/SignatureSchema";

export class SignatureSchemaService {
    constructor(private signatureSchemaRepository: SignatureSchemaRepository) { }

    async create(props: NewProps) {
        return this.signatureSchemaRepository.save(SignatureSchema.new(props));
    }

    async update(signatureSchema: SignatureSchema) {
        return this.signatureSchemaRepository.save(signatureSchema);
    }

    async delete(id: SignatureSchemaId): Promise<SignatureSchema> {
        return this.signatureSchemaRepository.delete(id);
    }
}

export const signatureSchemaService = new SignatureSchemaService(signatureSchemaRepository);

