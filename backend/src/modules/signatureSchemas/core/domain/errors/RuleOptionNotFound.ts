import { Resource } from "../../../../shared/domain/errors/HandledError";
import { ResourceNotFound } from "../../../../shared/domain/errors/ResourceNotFound";
import { RuleOptionId } from "../entities/RuleOption";

export class RuleOptionNotFound extends ResourceNotFound {
    constructor(id: RuleOptionId) {
        super(Resource.RULE_OPTION, { id });
    }
}
