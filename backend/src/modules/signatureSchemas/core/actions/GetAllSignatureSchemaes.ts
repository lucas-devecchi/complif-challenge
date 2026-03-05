import { EntriesResult } from "../../../shared/domain/EntriesResult";
import { SignatureSchema } from "../domain/entities/SignatureSchema";
import { signatureSchemaRepository, SignatureSchemaRepository, GetAllParams } from "../domain/repositories/SignatureSchemaRepository";

class GetAllSignatureSchemas {
  constructor(private signatureSchemaRepository: SignatureSchemaRepository) {}

  invoke(params: GetAllParams): Promise<EntriesResult<SignatureSchema>> {
    return this.signatureSchemaRepository.getAll(params);
  }
}

export const getAllSignatureSchemas = new GetAllSignatureSchemas(signatureSchemaRepository);


