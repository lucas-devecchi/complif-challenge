import { BusinessProps } from "../../modules/businesses/core/domain/entities/Business";
import { OptionalExceptFor } from "../../modules/shared/domain/utils";

export type CreateAccountDto = {
    business: OptionalExceptFor<BusinessProps, 'id'>;
}; 