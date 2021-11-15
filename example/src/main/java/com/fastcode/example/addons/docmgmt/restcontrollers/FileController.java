package com.fastcode.example.addons.docmgmt.restcontrollers;

import com.fastcode.example.addons.docmgmt.application.file.IFileAppService;
import com.fastcode.example.addons.docmgmt.application.file.IFileMapper;
import com.fastcode.example.addons.docmgmt.application.file.dto.*;
import com.fastcode.example.addons.docmgmt.domain.file.FileEntity;
import com.fastcode.example.addons.docmgmt.domain.file.IFileContentStore;
import com.fastcode.example.addons.docmgmt.domain.file.IFileRepository;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.OffsetBasedPageRequest;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.commons.search.SearchUtils;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.env.Environment;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.versions.VersionInfo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/docapi/file")
public class FileController {

    @Autowired
    @Qualifier("fileAppService")
    protected IFileAppService _fileAppService;

    @Autowired
    protected LoggingHelper logHelper;

    @Autowired
    protected Environment env;

    @Autowired
    private IFileRepository filesRepo;

    @Autowired
    private IFileContentStore contentStore;

    @Autowired
    @Qualifier("IFileMapperImpl")
    protected IFileMapper mapper;

    public FileController(IFileAppService fileAppService, LoggingHelper helper) {
        super();
        this._fileAppService = fileAppService;
        this.logHelper = helper;
    }

    @PreAuthorize("hasAnyAuthority('FILEENTITY_CREATE')")
    @RequestMapping(method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json" })
    public ResponseEntity<CreateFileOutput> create(@RequestBody @Valid CreateFileInput file) {
        CreateFileOutput output = _fileAppService.create(file);
        return new ResponseEntity(output, HttpStatus.OK);
    }

    // ------------ Delete file ------------
    @PreAuthorize("hasAnyAuthority('FILEENTITY_DELETE')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, consumes = { "application/json" })
    public void delete(@PathVariable String id) {
        FindFileByIdOutput output = _fileAppService.findById(Long.valueOf(id));
        Optional
            .ofNullable(output)
            .orElseThrow(
                () -> new EntityNotFoundException(String.format("There does not exist a file with a id=%s", id))
            );

        _fileAppService.delete(Long.valueOf(id));
    }

    // ------------ Update file ------------
    @PreAuthorize("hasAnyAuthority('FILEENTITY_UPDATE')")
    @RequestMapping(
        value = "/{id}",
        method = RequestMethod.PUT,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<UpdateFileOutput> update(@PathVariable String id, @RequestBody @Valid UpdateFileInput file) {
        FindFileByIdOutput currentFile = _fileAppService.findById(Long.valueOf(id));
        Optional
            .ofNullable(currentFile)
            .orElseThrow(
                () -> new EntityNotFoundException(String.format("Unable to update. File with id=%s not found.", id))
            );
        UpdateFileOutput output = _fileAppService.update(Long.valueOf(id), file);
        return new ResponseEntity(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('FILEENTITY_READ')")
    @RequestMapping(
        value = "/{id}",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/json" }
    )
    public ResponseEntity<FindFileByIdOutput> findById(@PathVariable String id) {
        FindFileByIdOutput output = _fileAppService.findById(Long.valueOf(id));
        Optional
            .ofNullable(output)
            .orElseThrow(
                () -> new EntityNotFoundException(String.format("The entity with the provided Id has not been found."))
            );

        return new ResponseEntity(output, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('FILEENTITY_READ')")
    @RequestMapping(method = RequestMethod.GET, consumes = { "application/json" }, produces = { "application/json" })
    public ResponseEntity find(
        @RequestParam(value = "search", required = false) String search,
        @RequestParam(value = "offset", required = false) String offset,
        @RequestParam(value = "limit", required = false) String limit,
        Sort sort
    )
        throws Exception {
        if (offset == null) {
            offset = env.getProperty("fastCode.offset.default");
        }
        if (limit == null) {
            limit = env.getProperty("fastCode.limit.default");
        }

        Pageable Pageable = new OffsetBasedPageRequest(Integer.parseInt(offset), Integer.parseInt(limit), sort);
        SearchCriteria searchCriteria = SearchUtils.generateSearchCriteriaObject(search);

        return ResponseEntity.ok(_fileAppService.find(searchCriteria, Pageable));
    }

    // Content related methods
    @PreAuthorize("hasAnyAuthority('FILEENTITY_CREATE')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/content/{fileId}", method = RequestMethod.PUT, consumes = { "multipart/form-data" })
    public void setContent(@PathVariable("fileId") Long id, @RequestParam("file") MultipartFile file)
        throws IOException {
        Optional<FileEntity> f = filesRepo.findById(id);
        if (f.isPresent()) {
            f.get().setMimeType(file.getContentType());
            contentStore.setContent(f.get(), file.getInputStream());
            // save updated content-related info
            filesRepo.save(f.get());
        } else {
            throw new EntityNotFoundException("The entity with the provided Id has not been found.");
        }
    }

    @PreAuthorize("hasAnyAuthority('FILEENTITY_DELETE')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/content/{fileId}", method = RequestMethod.DELETE, consumes = { "application/json" })
    public void unsetContent(@PathVariable("fileId") Long id) {
        Optional<FileEntity> f = filesRepo.findById(id);
        if (f.isPresent()) {
            contentStore.unsetContent(f.get());
        } else {
            throw new EntityNotFoundException("The entity with the provided Id has not been found.");
        }
    }

    @PreAuthorize("hasAnyAuthority('FILEENTITY_READ')")
    @RequestMapping(
        value = "/content/{fileId}",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/hal+json" }
    )
    public ResponseEntity<?> getContent(@PathVariable("fileId") Long id) {
        Optional<FileEntity> f = filesRepo.findById(id);
        if (f.isPresent()) {
            InputStreamResource inputStreamResource = new InputStreamResource(contentStore.getContent(f.get()));
            HttpHeaders headers = new HttpHeaders();
            headers.setContentLength(f.get().getContentLength());
            headers.set("Content-Type", f.get().getMimeType());
            return new ResponseEntity<Object>(inputStreamResource, headers, HttpStatus.OK);
        } else {
            throw new EntityNotFoundException("The entity with the provided Id has not been found.");
        }
    }

    @PreAuthorize("hasAnyAuthority('FILE_LOCK')")
    @RequestMapping(
        value = "/{fileId}/lock",
        method = RequestMethod.PUT,
        consumes = { "application/json" },
        produces = { "application/hal+json" }
    )
    public ResponseEntity<?> lock(@PathVariable("fileId") Long id) {
        Optional<FileEntity> f = filesRepo.findById(id);
        if (f.isPresent()) {
            FileEntity lockedFile = filesRepo.lock(f.get());
            return new ResponseEntity<Object>(lockedFile, HttpStatus.OK);
        } else {
            throw new EntityNotFoundException("The entity with the provided Id has not been found.");
        }
    }

    @PreAuthorize("hasAnyAuthority('FILE_UNLOCK')")
    @RequestMapping(
        value = "/{fileId}/unlock",
        method = RequestMethod.DELETE,
        consumes = { "application/json" },
        produces = { "application/hal+json" }
    )
    public ResponseEntity<?> unlock(@PathVariable("fileId") Long id) {
        Optional<FileEntity> f = filesRepo.findById(id);
        if (f.isPresent()) {
            FileEntity unlockedFile = filesRepo.unlock(f.get());
            return new ResponseEntity<Object>(unlockedFile, HttpStatus.OK);
        } else {
            throw new EntityNotFoundException("The entity with the provided Id has not been found.");
        }
    }

    @PreAuthorize("hasAnyAuthority('VERSION_CREATE')")
    @RequestMapping(
        value = "/{fileId}/version",
        method = RequestMethod.PUT,
        consumes = { "application/json" },
        produces = { "application/hal+json" }
    )
    public ResponseEntity<?> version(@PathVariable("fileId") Long id, @RequestBody @Valid VersionInfo versionInfo) {
        Optional<FileEntity> f = filesRepo.findById(id);
        if (f.isPresent()) {
            FileEntity versionedFile = filesRepo.version(f.get(), versionInfo);
            return new ResponseEntity<Object>(versionedFile, HttpStatus.OK);
        } else {
            throw new EntityNotFoundException("The entity with the provided Id has not been found.");
        }
    }

    @PreAuthorize("hasAnyAuthority('VERSION_READ')")
    @RequestMapping(
        value = "/{id}/findAllVersions",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/hal+json" }
    )
    public ResponseEntity<List<FileEntity>> findAllVersions(@PathVariable String id) {
        List<FileEntity> fl = null;
        Optional<FileEntity> f = filesRepo.findById(Long.valueOf(id));
        if (f.isPresent()) {
            fl = filesRepo.findAllVersions(f.get());
            return new ResponseEntity(fl, HttpStatus.OK);
        } else {
            throw new EntityNotFoundException("The entity with the provided Id has not been found.");
        }
    }

    @PreAuthorize("hasAnyAuthority('VERSION_READ')")
    @RequestMapping(
        value = "/findAllVersionsLatest",
        method = RequestMethod.GET,
        consumes = { "application/json" },
        produces = { "application/hal+json" }
    )
    public ResponseEntity findAllVersionsLatest() {
        List<FileEntity> fl = null;
        fl = filesRepo.findAllVersionsLatest(FileEntity.class);
        return ResponseEntity.ok(fl);
    }
}
