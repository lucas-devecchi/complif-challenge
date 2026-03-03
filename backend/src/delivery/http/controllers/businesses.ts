import { createBusiness } from "../../../modules/businesses/core/actions/CreateBusiness";
import { getAllBusinesss } from "../../../modules/businesses/core/actions/GetAllBusinesses";
import { getBusinessById } from "../../../modules/businesses/core/actions/GetBusinessById";
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
    });
    res.status(201).json(business);
};

export const updateBusinessController: Controller = async (req, res) => {
    const {
        name,
        ownerId,
        species,
        breed,
        gender,
    } = req.body;

    const business = await updateBusiness.invoke(getBusinessId(req), getUserId(req), {
        name,
        species,
        breed,
        gender,
        owner: { id: ownerId }
    });

    res.status(200).json(business);
};

export const deleteBusinessController: Controller = async (req, res) => {
    const business = await deleteBusiness.invoke(getBusinessId(req));
    res.status(200).json(business);
};