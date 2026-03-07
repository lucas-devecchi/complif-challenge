import { Resource } from "../../../../shared/domain/errors/HandledError";
import { ResourceNotFound } from "../../../../shared/domain/errors/ResourceNotFound";
import { AccountId } from "../Account";

export class AccountNotFound extends ResourceNotFound {
    constructor(id: AccountId) {
        super(Resource.ACCOUNT, { id });
    }
}
