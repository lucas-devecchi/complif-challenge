import { Business, BusinessId } from '../../domain/entities/Business';
import { businessRepository, BusinessRepository } from '../../domain/repositories/BusinessRepository';
import { BusinessNotFound } from '../../domain/errors/BusinessNotFound';

class GetBusinessById {
  constructor(private businessRepository: BusinessRepository) { }

  async invoke(id: BusinessId): Promise<Business> {
    const business = await this.businessRepository.getById(id);
    if (!business)
      throw new BusinessNotFound(id);
    return business;
  }
}

export const getBusinessById = new GetBusinessById(businessRepository);