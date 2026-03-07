import { OptionalExceptFor } from "../../modules/shared/domain/utils";
import { AccountProps } from "../../modules/accounts/core/domain/Account";

export type CreateSignatureSchemaDto = {
    account: OptionalExceptFor<AccountProps, 'id'>;
    
};