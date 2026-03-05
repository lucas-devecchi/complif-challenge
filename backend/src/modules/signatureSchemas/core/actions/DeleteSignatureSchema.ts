import { SignatureSchema, SignatureSchemaId } from "../domain/entities/SignatureSchema";
import { signatureSchemaService, SignatureSchemaService } from "../domain/services/SignatureSchemaService";

class DeleteSignatureSchema {
    constructor(private signatureSchemaService: SignatureSchemaService) { }

    async invoke(id: SignatureSchemaId): Promise<SignatureSchema> {
        return this.signatureSchemaService.delete(id);
    }
}

export const deleteSignatureSchema = new DeleteSignatureSchema(signatureSchemaService);

