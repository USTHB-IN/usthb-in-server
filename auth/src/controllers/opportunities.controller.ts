import { Request, Response, NextFunction } from "express";
import { OpportunityService } from "../services/opportunities.service";

export async function createOpportunity(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const opportunity = await OpportunityService.createOpportunity(req.body);
    res.status(201).json({
      status: "success",
      data: opportunity,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function getOpportunityById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const opportunity = await OpportunityService.getOpportunityById(id);
    res.status(200).json(opportunity);
  } catch (error: any) {
    next(error);
  }
}

export async function getAllOpportunities(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const opportunities = await OpportunityService.getAllOpportunities();
    res.status(200).json(opportunities);
  } catch (error: any) {
    next(error);
  }
}

export async function updateOpportunity(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const opportunity = await OpportunityService.updateOpportunity(
      id,
      req.body
    );
    res.status(200).json(opportunity);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteOpportunity(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const deletedOpportunity = await OpportunityService.deleteOpportunity(id);
    res.status(200).json(deletedOpportunity);
  } catch (error: any) {
    next(error);
  }
}
