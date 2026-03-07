import { businessService, BusinessService } from '../domain/services/BusinessService';
import { NewProps, Business } from '../domain/entities/Business';
import { CreateBusinessDto } from '../../../../delivery/dtos/business';

class CreateBusiness {
  constructor(private businessService: BusinessService) { }

  async invoke(props: CreateBusinessDto): Promise<Business> {
    return this.businessService.create(props);
  }
}

export const createBusiness = new CreateBusiness(businessService);




