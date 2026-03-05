import { Resource } from "../../../../shared/domain/errors/HandledError";
import { ResourceNotFound } from "../../../../shared/domain/errors/ResourceNotFound";
import { SignatureSchemaId } from "../entities/SignatureSchema";

export class SignatureSchemaNotFound extends ResourceNotFound {
    constructor(id: SignatureSchemaId,) {
        super(Resource.SIGNATURESCHEMA, { id });
    }
}




