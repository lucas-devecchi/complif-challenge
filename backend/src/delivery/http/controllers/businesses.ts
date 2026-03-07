import { createBusiness } from "../../../modules/businesses/core/actions/business/CreateBusiness";
import { deleteBusiness } from "../../../modules/businesses/core/actions/business/DeleteBusiness";
import { getAllBusinesss } from "../../../modules/businesses/core/actions/business/GetAllBusinesses";
import { getBusinessById } from "../../../modules/businesses/core/actions/business/GetBusinessById";
import { updateBusinessStatus } from "../../../modules/businesses/core/actions/business/UpdateBusinessStatus";
import { getBusinessId, getPagination } from "../../utils/Functions";
import Controller from "./controller";

export const getAllBusinessesController: Controller = async (req, res) => {
    const businesses = await getAllBusinesss.invoke({
        pagination: getPagination(req),
    });

    res.status(200).json(businesses);
};

export const getBusinessByIdController: Controller = async (req, res) => {
    const business = await getBusinessById.invoke(getBusinessId(req));
    res.status(200).json(business);
};

export const createBusinessController: Controller = async (req, res) => {
    const {
        name,
        taxId,
        country,
        industry,
    } = req.body;

    const business = await createBusiness.invoke({
        name,
        taxId,
        country,
        industry,
        userId: req.user!.id,
    });
    res.status(201).json(business);
};

export const updateBusinessController: Controller = async (req, res) => {
    const { status } = req.body;

    const business = await updateBusinessStatus.invoke({
        businessId: getBusinessId(req),
        status,
        userId: req.user!.id,
    });

    res.status(200).json(business);
};

export const deleteBusinessController: Controller = async (req, res) => {
    const business = await deleteBusiness.invoke(getBusinessId(req));
    res.status(200).json(business);
};