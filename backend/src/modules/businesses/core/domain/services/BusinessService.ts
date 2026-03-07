import { businessRepository, BusinessRepository } from "../repositories/BusinessRepository";
import { Business, BusinessId, BusinessStatus } from "../entities/Business";
import { RiskCalculator, RISK_THRESHOLD_MANUAL_REVIEW } from "./RiskCalculator";

export type CreateBusinessInput = {
    name: string;
    taxId: string;
    country: string;
    industry: string;
    documentsComplete?: boolean;
};

export class BusinessService {
    constructor(
        private businessRepository: BusinessRepository,
        private riskCalculator: RiskCalculator,
    ) { }

    async create(businessProps: CreateBusinessInput): Promise<Business> {
        const riskScore = this.riskCalculator.calculate({
            country: businessProps.country,
            industry: businessProps.industry,
            documentsComplete: businessProps.documentsComplete ?? true,
        });

        const business = Business.new({
            ...businessProps,
            riskScore,
            status: BusinessStatus.PENDING,
        });

        return this.businessRepository.save(business);
    }

    async updateStatusBasedOnRiskScore(business: Business): Promise<Business> {
        const status = business.riskScore > RISK_THRESHOLD_MANUAL_REVIEW
            ? BusinessStatus.IN_REVIEW
            : BusinessStatus.APPROVED;

        const updatedBusiness = business.copy({ status });
        return this.businessRepository.save(updatedBusiness);
    }

    async update(business: Business): Promise<Business> {
        return this.businessRepository.save(business);
    }

    async delete(id: BusinessId): Promise<Business> {
        return this.businessRepository.delete(id);
    }
}

export const businessService = new BusinessService(businessRepository, new RiskCalculator());