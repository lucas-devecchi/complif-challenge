import { signatureSchemaRepository, SignatureSchemaRepository } from "../repositories/SignatureSchemaRepository";
import { NewProps, SignatureSchema, SignatureSchemaId } from "../entities/SignatureSchema";
import { CreateSignatureSchemaDto } from "../../../../../delivery/dtos/signatureSchemaDTO";

export class SignatureSchemaService {
    constructor(private signatureSchemaRepository: SignatureSchemaRepository) { }

    async create(props: CreateSignatureSchemaDto) {
        const version = await this.signatureSchemaRepository.getNextVersionForAccount(props.account.id);
        return this.signatureSchemaRepository.save(SignatureSchema.new({ ...props, version }));
    }

    async update(signatureSchema: SignatureSchema) {
        return this.signatureSchemaRepository.save(signatureSchema);
    }

    async delete(id: SignatureSchemaId): Promise<SignatureSchema> {
        return this.signatureSchemaRepository.delete(id);
    }
}

export const signatureSchemaService = new SignatureSchemaService(signatureSchemaRepository);

