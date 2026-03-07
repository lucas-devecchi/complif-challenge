import { Resource } from "../../../../shared/domain/errors/HandledError";
import { ResourceNotFound } from "../../../../shared/domain/errors/ResourceNotFound";
import { RuleRequirementId } from "../entities/RuleRequirement";

export class RuleRequirementNotFound extends ResourceNotFound {
    constructor(id: RuleRequirementId) {
        super(Resource.RULE_REQUIREMENT, { id });
    }
}
