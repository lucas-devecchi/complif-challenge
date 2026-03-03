import { Business, BusinessId, BusinessProps } from "../domain/Business";
import { businessRepository, BusinessRepository } from "../domain/BusinessRepository";
import { businessService, BusinessService } from "../domain/BusinessService";
import { BusinessNotFound } from "../domain/errors/BusinessNotFound";

class UpdateBusiness {
    constructor(private businessService: BusinessService, private repository: BusinessRepository) { }

    async invoke(id: BusinessId, params: Partial<Omit<BusinessProps, "id">>): Promise<Business> {
        const business = await this.repository.getById(id);
        if (!business)
            throw new BusinessNotFound(id);

        const updatedBusiness = new Business({ ...business, ...params });
        return this.businessService.update(updatedBusiness);
    }
}

export const updateBusiness = new UpdateBusiness(businessService, businessRepository);
