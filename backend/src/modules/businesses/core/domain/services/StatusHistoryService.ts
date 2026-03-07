import { statusHistoryRepository, StatusHistoryRepository } from '../repositories/StatusHistoryRepository';
import { StatusHistory, StatusHistoryId, NewProps } from '../entities/StatusHistory';
import { BusinessId } from '../entities/Business';

export class StatusHistoryService {
    constructor(private statusHistoryRepository: StatusHistoryRepository) { }

    async create(props: NewProps): Promise<StatusHistory> {
        return this.statusHistoryRepository.save(StatusHistory.new(props));
    }

    async getById(id: StatusHistoryId): Promise<StatusHistory | undefined> {
        return this.statusHistoryRepository.getById(id);
    }

    async getByBusinessId(businessId: BusinessId): Promise<StatusHistory[]> {
        return this.statusHistoryRepository.getByBusinessId(businessId);
    }
}

export const statusHistoryService = new StatusHistoryService(statusHistoryRepository);
