import { EntriesResult } from "../../../shared/domain/EntriesResult";
import { Business } from "../domain/Business";
import { businessRepository, BusinessRepository, GetAllParams } from "../domain/BusinessRepository";

class GetAllBusinesss {
  constructor(private businessRepository: BusinessRepository) {}

  invoke(params: GetAllParams): Promise<EntriesResult<Business>> {
    return this.businessRepository.getAll(params);
  }
}

export const getAllBusinesss = new GetAllBusinesss(businessRepository);
