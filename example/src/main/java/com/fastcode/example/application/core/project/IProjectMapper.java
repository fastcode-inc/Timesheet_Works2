package com.fastcode.example.application.core.project;

import com.fastcode.example.application.core.project.dto.*;
import com.fastcode.example.domain.core.customer.Customer;
import com.fastcode.example.domain.core.project.Project;
import java.time.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface IProjectMapper {
    Project createProjectInputToProject(CreateProjectInput projectDto);

    @Mappings(
        {
            @Mapping(source = "entity.customer.customerid", target = "customerid"),
            @Mapping(source = "entity.customer.customerid", target = "customerDescriptiveField"),
        }
    )
    CreateProjectOutput projectToCreateProjectOutput(Project entity);

    Project updateProjectInputToProject(UpdateProjectInput projectDto);

    @Mappings(
        {
            @Mapping(source = "entity.customer.customerid", target = "customerid"),
            @Mapping(source = "entity.customer.customerid", target = "customerDescriptiveField"),
        }
    )
    UpdateProjectOutput projectToUpdateProjectOutput(Project entity);

    @Mappings(
        {
            @Mapping(source = "entity.customer.customerid", target = "customerid"),
            @Mapping(source = "entity.customer.customerid", target = "customerDescriptiveField"),
        }
    )
    FindProjectByIdOutput projectToFindProjectByIdOutput(Project entity);

    @Mappings(
        {
            @Mapping(source = "customer.description", target = "description"),
            @Mapping(source = "customer.name", target = "name"),
            @Mapping(source = "foundProject.id", target = "projectId"),
        }
    )
    GetCustomerOutput customerToGetCustomerOutput(Customer customer, Project foundProject);
}
