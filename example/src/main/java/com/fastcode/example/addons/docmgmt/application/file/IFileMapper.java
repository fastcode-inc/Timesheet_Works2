package com.fastcode.example.addons.docmgmt.application.file;

import com.fastcode.example.addons.docmgmt.application.file.dto.*;
import com.fastcode.example.addons.docmgmt.domain.file.FileEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IFileMapper {
    FileEntity createFileInputToFileEntity(CreateFileInput fileDto);

    CreateFileOutput fileEntityToCreateFileOutput(FileEntity entity);

    FileEntity updateFileInputToFileEntity(UpdateFileInput fileDto);

    UpdateFileOutput fileEntityToUpdateFileOutput(FileEntity entity);

    FindFileByIdOutput fileEntityToFindFileByIdOutput(FileEntity entity);
}
