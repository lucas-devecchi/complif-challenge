import { signatureSchemaService, SignatureSchemaService } from '../domain/services/SignatureSchemaService';
import { NewProps, SignatureSchema } from '../domain/entities/SignatureSchema';

class CreateSignatureSchema {
  constructor(private signatureSchemaService: SignatureSchemaService) { }

  async invoke(props: NewProps): Promise<SignatureSchema> {
    return this.signatureSchemaService.create(props);
  }
}

export const createSignatureSchema = new CreateSignatureSchema(signatureSchemaService);






