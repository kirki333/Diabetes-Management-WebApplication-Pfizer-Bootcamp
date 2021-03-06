package com.pfizer.sacchonapi.resource.Consultation;

import com.pfizer.sacchonapi.exception.BadEntityException;
import com.pfizer.sacchonapi.exception.NotFoundException;
import com.pfizer.sacchonapi.representation.ConsultationRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.Post;

import java.util.List;

public interface ConsultationListResource {
    @Post("json")
    ConsultationRepresentation add(ConsultationRepresentation consultationIn) throws BadEntityException;

    @Get("json")
    List<ConsultationRepresentation> getConsultations() throws NotFoundException;
}
