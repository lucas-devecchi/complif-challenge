import { businessRepository, BusinessRepository } from "./BusinessRepository";
import { NewProps, Business, BusinessId } from "./Business";

export class BusinessService {
    constructor(private businessRepository: BusinessRepository) { }

    async create(props: NewProps) {
        return this.businessRepository.save(Business.new(props));
    }

    async update(business: Business) {
        return this.businessRepository.save(business);
    }

    async delete(id: BusinessId): Promise<Business> {
        return this.businessRepository.delete(id);
    }
}

export const businessService = new BusinessService(businessRepository);