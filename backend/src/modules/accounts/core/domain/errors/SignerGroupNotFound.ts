import { Resource } from "../../../../shared/domain/errors/HandledError";
import { ResourceNotFound } from "../../../../shared/domain/errors/ResourceNotFound";
import { GroupId } from "../Group";

export class GroupNotFound extends ResourceNotFound {
    constructor(id: GroupId) {
        super(Resource.GROUP, { id });
    }
}
