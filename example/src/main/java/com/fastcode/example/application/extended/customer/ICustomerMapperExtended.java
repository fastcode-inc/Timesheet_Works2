package com.fastcode.example.application.extended.customer;

import com.fastcode.example.application.core.customer.ICustomerMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ICustomerMapperExtended extends ICustomerMapper {}
