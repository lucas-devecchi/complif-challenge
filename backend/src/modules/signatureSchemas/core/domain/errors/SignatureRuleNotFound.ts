import { Resource } from "../../../../shared/domain/errors/HandledError";
import { ResourceNotFound } from "../../../../shared/domain/errors/ResourceNotFound";
import { SignatureRuleId } from "../entities/SignatureRule";

export class SignatureRuleNotFound extends ResourceNotFound {
    constructor(id: SignatureRuleId) {
        super(Resource.SIGNATURE_RULE, { id });
    }
}
