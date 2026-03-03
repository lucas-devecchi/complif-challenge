import { Business, BusinessId, BusinessProps } from "../domain/Business";
import { BusinessRepository } from "../domain/BusinessRepository";
import { BusinessNotFound } from "../domain/errors/BusinessNotFound";

class UpdateBusiness {
    constructor(private businessService: BusinessService, private repository: BusinessRepository) { }

    async invoke(id: BusinessId, p0: string, params: Partial<Omit<BusinessProps, "id">>): Promise<Business> {
        const business = await this.businessService.getById(id);
        if (!business)
            throw new BusinessNotFound(id);

        const updatedBusiness = new Business({ ...business, ...params });
        return this.businessService.update(updatedBusiness);
    }
}

export const updateBusiness = new UpdateBusiness(businessService, businessRepository);
