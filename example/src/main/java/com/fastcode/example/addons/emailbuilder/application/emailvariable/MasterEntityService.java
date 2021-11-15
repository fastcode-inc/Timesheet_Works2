package com.fastcode.example.addons.emailbuilder.application.emailvariable;

import com.fastcode.example.addons.emailbuilder.domain.irepository.IMasterEntityRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MasterEntityService implements IMasterEntityService {

    @Autowired
    private IMasterEntityRepository masterEntityRepository;

    @Override
    public List<String> getMastersByMasterName(String name) {
        return masterEntityRepository.findMasterValueByMasterName(name);
    }
}
