import { businessService, BusinessService } from '../domain/services/BusinessService';
import { Business } from '../domain/entities/Business';
import { CreateBusinessDto } from '../../../../delivery/dtos/businessDTO';

class CreateBusiness {
  constructor(private businessService: BusinessService) { }

  async invoke(props: CreateBusinessDto): Promise<Business> {
    return this.businessService.create(props);
  }
}

export const createBusiness = new CreateBusiness(businessService);




