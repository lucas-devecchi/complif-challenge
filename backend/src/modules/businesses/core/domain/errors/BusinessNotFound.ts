import { Resource } from "../../../../shared/domain/errors/HandledError";
import { ResourceNotFound } from "../../../../shared/domain/errors/ResourceNotFound";
import { BusinessId } from "../entities/Business";

export class BusinessNotFound extends ResourceNotFound {
    constructor(id: BusinessId) {
        super(Resource.BUSINESS, { id });
    }
}
