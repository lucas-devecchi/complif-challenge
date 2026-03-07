import { businessService, BusinessService } from '../domain/services/BusinessService';
import { statusHistoryService, StatusHistoryService } from '../domain/services/StatusHistoryService';
import { Business, BusinessStatus } from '../domain/entities/Business';
import { CreateBusinessDto } from '../../../../delivery/dtos/businessDTO';

class CreateBusiness {
  constructor(
    private businessService: BusinessService,
    private statusHistoryService: StatusHistoryService,
  ) { }

  async invoke(props: CreateBusinessDto): Promise<Business> {
    const { userId, ...businessDTO } = props;
    const business = await this.businessService.create(businessDTO);

    await this.statusHistoryService.create({
      business: { id: business.id },
      previousStatus: undefined,
      newStatus: BusinessStatus.PENDING,
      user: { id: userId },
    });

    return business;
  }
}

export const createBusiness = new CreateBusiness(businessService, statusHistoryService);




