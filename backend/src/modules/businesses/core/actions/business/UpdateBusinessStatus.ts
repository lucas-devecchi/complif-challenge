import { Business, BusinessId, BusinessStatus } from "../../domain/entities/Business";
import { businessRepository, BusinessRepository } from "../../domain/repositories/BusinessRepository";
import { businessService, BusinessService } from "../../domain/services/BusinessService";
import { statusHistoryService, StatusHistoryService } from "../../domain/services/StatusHistoryService";
import { BusinessNotFound } from "../../domain/errors/BusinessNotFound";
import { accountService, AccountService } from "../../../../accounts/core/domain/AccountService";
import { signatureSchemaService, SignatureSchemaService } from "../../../../signatureSchemas/core/domain/services/SignatureSchemaService";

export type UpdateBusinessStatusParams = {
    businessId: BusinessId;
    status: BusinessStatus;
    userId: string;
};

class UpdateBusinessStatus {
    constructor(
        private businessService: BusinessService,
        private repository: BusinessRepository,
        private accountService: AccountService,
        private signatureSchemaService: SignatureSchemaService,
        private statusHistoryService: StatusHistoryService,
    ) { }

    async invoke(params: UpdateBusinessStatusParams): Promise<Business> {
        const { businessId, status, userId } = params;

        // Get business
        const business = await this.repository.getById(businessId);

        if (!business)
            throw new BusinessNotFound(businessId);

        if (business.status === status) return business;

        const updatedBusiness = business.copy({ status });

        // Update business
        const savedBusiness = await this.businessService.update(updatedBusiness);
        
        // Create status history
        const previousStatus = business.status;
        await this.statusHistoryService.create({
            business: { id: business.id },
            previousStatus,
            newStatus: status,
            user: { id: userId },
        });

        // Create account and signature schema
        if (status === BusinessStatus.APPROVED) {
            const account = await this.accountService.create({ business: { id: business.id } });
            await this.signatureSchemaService.create({ account: { id: account.id } });
        }

        return savedBusiness;
    }
}

export const updateBusinessStatus = new UpdateBusinessStatus(
    businessService,
    businessRepository,
    accountService,
    signatureSchemaService,
    statusHistoryService,
);
