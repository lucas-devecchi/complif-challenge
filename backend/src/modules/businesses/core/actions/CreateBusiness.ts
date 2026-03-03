import { businessService, BusinessService } from '../domain/BusinessService';
import { NewProps, Business } from '../domain/Business';

class CreateBusiness {
  constructor(private businessService: BusinessService) { }

  async invoke(props: NewProps): Promise<Business> {
    return this.businessService.create(props);
  }
}

export const createBusiness = new CreateBusiness(businessService);




