package com.fastcode.example.domain.extended.customer;

import com.fastcode.example.domain.core.customer.ICustomerRepository;
import org.springframework.stereotype.Repository;

@Repository("customerRepositoryExtended")
public interface ICustomerRepositoryExtended extends ICustomerRepository {
    //Add your custom code here
}
