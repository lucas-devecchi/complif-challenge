import { Business, BusinessId, BusinessProps, BusinessStatus } from "../domain/entities/Business";
import { businessRepository, BusinessRepository } from "../domain/repositories/BusinessRepository";
import { businessService, BusinessService } from "../domain/services/BusinessService";
import { BusinessNotFound } from "../domain/errors/BusinessNotFound";
import { accountService, AccountService } from "../../../accounts/core/domain/AccountService";
import { signatureSchemaService, SignatureSchemaService } from "../../../signatureSchemas/core/domain/services/SignatureSchemaService";

class UpdateBusinessStatus {
    constructor(
        private businessService: BusinessService,
        private repository: BusinessRepository,
        private accountService: AccountService,
        private signatureSchemaService: SignatureSchemaService,
    ) { }

    async invoke(id: BusinessId, status: BusinessStatus): Promise<Business> {
        const business = await this.repository.getById(id); // TODO: find out if it is ok to skip service layer and call repository directly.

        if (!business)
            throw new BusinessNotFound(id);

        if (business.status === status) return business;

        const updatedBusiness = business.copy({ status });

        if (status === BusinessStatus.APPROVED) {
            const account = await this.accountService.create({ business: { id: business.id } });
            await this.signatureSchemaService.create({ account: { id: account.id } });
        }

        return this.businessService.update(updatedBusiness);
    }
}

export const updateBusinessStatus =
    new UpdateBusinessStatus(
        businessService,
        businessRepository,
        accountService,
        signatureSchemaService,
    );
