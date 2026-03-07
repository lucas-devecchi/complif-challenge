import { EntriesResult } from "../../../../shared/domain/EntriesResult";
import { Business } from "../../domain/entities/Business";
import { businessRepository, BusinessRepository, GetAllParams } from "../../domain/repositories/BusinessRepository";

class GetAllBusinesss {
  constructor(private businessRepository: BusinessRepository) {}

  invoke(params: GetAllParams): Promise<EntriesResult<Business>> {
    return this.businessRepository.getAll(params);
  }
}

export const getAllBusinesss = new GetAllBusinesss(businessRepository);
