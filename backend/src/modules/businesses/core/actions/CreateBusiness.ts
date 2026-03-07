import { businessService, BusinessService } from '../domain/services/BusinessService';
import { NewProps, Business } from '../domain/entities/Business';

class CreateBusiness {
  constructor(private businessService: BusinessService) { }

  async invoke(props: NewProps): Promise<Business> {
    return this.businessService.create(props);
  }
}

export const createBusiness = new CreateBusiness(businessService);




