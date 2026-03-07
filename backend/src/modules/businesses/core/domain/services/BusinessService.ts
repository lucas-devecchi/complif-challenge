import { businessRepository, BusinessRepository } from "../repositories/BusinessRepository";
import { NewProps, Business, BusinessId, BusinessStatus } from "../entities/Business";
import { RiskCalculator } from "./RiskCalculator";
import { RISK_THRESHOLD_MANUAL_REVIEW } from "./RiskCalculator";
import { randomUUID } from "crypto";
import { CreateBusinessDto } from "../../../../../delivery/dtos/business";


export class BusinessService {
    constructor(
        private businessRepository: BusinessRepository,
        private riskCalculator: RiskCalculator,
    ) { }

    async create(businessProps: CreateBusinessDto): Promise<Business> {

        const riskScore = this.riskCalculator.calculate({
            country: businessProps.country,
            industry: businessProps.industry,
            documentsComplete: true,
        });

        const status = riskScore > RISK_THRESHOLD_MANUAL_REVIEW
            ? BusinessStatus.IN_REVIEW
            : BusinessStatus.APPROVED;

        const business = Business.new({
            ...businessProps,
            riskScore,
            status,
        });

        return this.businessRepository.save(business);
    }

    async update(business: Business): Promise<Business> {
        return this.businessRepository.save(business);
    }

    async delete(id: BusinessId): Promise<Business> {
        return this.businessRepository.delete(id);
    }
}

export const businessService = new BusinessService(businessRepository, new RiskCalculator());