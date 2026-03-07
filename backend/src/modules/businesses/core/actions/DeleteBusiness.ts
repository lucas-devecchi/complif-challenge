import { Business, BusinessId } from "../domain/entities/Business";
import { businessService, BusinessService } from "../domain/services/BusinessService";

class DeleteBusiness {
    constructor(private businessService: BusinessService) { }

    async invoke(id: BusinessId): Promise<Business> {
        return this.businessService.delete(id);
    }
}

export const deleteBusiness = new DeleteBusiness(businessService);
