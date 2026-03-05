import { SignatureSchema, SignatureSchemaId } from '../domain/entities/SignatureSchema';
import {signatureSchemaRepository, SignatureSchemaRepository } from '../domain/repositories/SignatureSchemaRepository';
import { SignatureSchemaNotFound } from '../domain/errors/SignatureSchemaNotFound';

class GetSignatureSchemaById {
  constructor(private signatureSchemaRepository: SignatureSchemaRepository) { }

  async invoke(id: SignatureSchemaId): Promise<SignatureSchema> {
    const signatureSchema = await this.signatureSchemaRepository.getById(id);
    if (!signatureSchema)
      throw new SignatureSchemaNotFound(id);
    return signatureSchema;
  }
}

export const getSignatureSchemaById = new GetSignatureSchemaById(signatureSchemaRepository);

