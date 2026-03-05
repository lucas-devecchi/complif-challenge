import { SignatureSchema, SignatureSchemaId, SignatureSchemaProps } from "../domain/entities/SignatureSchema";
import { signatureSchemaRepository, SignatureSchemaRepository } from "../domain/repositories/SignatureSchemaRepository";
import { signatureSchemaService, SignatureSchemaService } from "../domain/services/SignatureSchemaService";
import { SignatureSchemaNotFound } from "../domain/errors/SignatureSchemaNotFound";

class UpdateSignatureSchema {
    constructor(private signatureSchemaService: SignatureSchemaService, private repository: SignatureSchemaRepository) { }

    async invoke(id: SignatureSchemaId, params: Partial<Omit<SignatureSchemaProps, "id">>): Promise<SignatureSchema> {
        const signatureSchema = await this.repository.getById(id);
        if (!signatureSchema)
            throw new SignatureSchemaNotFound(id);

        const updatedSignatureSchema = new SignatureSchema({ ...signatureSchema, ...params });
        return this.signatureSchemaService.update(updatedSignatureSchema);
    }
}

export const updateSignatureSchema = new UpdateSignatureSchema(signatureSchemaService, signatureSchemaRepository);


