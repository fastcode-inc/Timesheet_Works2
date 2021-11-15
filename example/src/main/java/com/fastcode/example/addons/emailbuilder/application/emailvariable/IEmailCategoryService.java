package com.fastcode.example.addons.emailbuilder.application.emailvariable;

import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.*;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface IEmailCategoryService {
    List<String> getAllCategories() throws Exception;
}
