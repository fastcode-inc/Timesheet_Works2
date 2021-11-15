package com.fastcode.example.addons.emailbuilder.domain.irepository;

import com.fastcode.example.addons.emailbuilder.domain.model.EmailVariableTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEmailVariableTypeRepository extends JpaRepository<EmailVariableTypeEntity, Long> {}
