package com.fastcode.example.application.core.timeofftype;

import com.fastcode.example.application.core.timeofftype.dto.*;
import com.fastcode.example.domain.core.timeofftype.Timeofftype;
import java.time.*;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ITimeofftypeMapper {
    Timeofftype createTimeofftypeInputToTimeofftype(CreateTimeofftypeInput timeofftypeDto);
    CreateTimeofftypeOutput timeofftypeToCreateTimeofftypeOutput(Timeofftype entity);

    Timeofftype updateTimeofftypeInputToTimeofftype(UpdateTimeofftypeInput timeofftypeDto);

    UpdateTimeofftypeOutput timeofftypeToUpdateTimeofftypeOutput(Timeofftype entity);
    FindTimeofftypeByIdOutput timeofftypeToFindTimeofftypeByIdOutput(Timeofftype entity);
}
