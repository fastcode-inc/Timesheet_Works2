package com.fastcode.example.application.core.customer;

import com.fastcode.example.application.core.customer.dto.*;
import com.fastcode.example.domain.core.customer.Customer;
import java.time.*;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ICustomerMapper {
    Customer createCustomerInputToCustomer(CreateCustomerInput customerDto);
    CreateCustomerOutput customerToCreateCustomerOutput(Customer entity);

    Customer updateCustomerInputToCustomer(UpdateCustomerInput customerDto);

    UpdateCustomerOutput customerToUpdateCustomerOutput(Customer entity);
    FindCustomerByIdOutput customerToFindCustomerByIdOutput(Customer entity);
}
