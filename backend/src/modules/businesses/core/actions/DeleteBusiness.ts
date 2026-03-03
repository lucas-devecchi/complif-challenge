import { Business, BusinessId } from "../domain/Business";
import { businessService, BusinessService } from "../domain/BusinessService";

class DeleteBusiness {
    constructor(private businessService: BusinessService) { }

    async invoke(id: BusinessId): Promise<Business> {
        return this.businessService.delete(id);
    }
}

export const deleteBusiness = new DeleteBusiness(businessService);
