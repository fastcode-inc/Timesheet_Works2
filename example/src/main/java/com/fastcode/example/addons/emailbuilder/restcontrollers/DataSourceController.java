package com.fastcode.example.addons.emailbuilder.restcontrollers;

import com.fastcode.example.addons.emailbuilder.application.datasource.DataSourceAppService;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.*;
import com.fastcode.example.addons.emailbuilder.application.emailvariable.dto.*;
import com.fastcode.example.commons.domain.EmptyJsonResponse;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.commons.search.OffsetBasedPageRequest;
import com.fastcode.example.commons.search.SearchCriteria;
import com.fastcode.example.commons.search.SearchUtils;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/emailbuilder/datasource")
public class DataSourceController {

    @Autowired
    private DataSourceAppService dataSourceAppService;

    @Autowired
    private LoggingHelper logHelper;

    @Autowired
    private Environment env;

    @PreAuthorize("hasAnyAuthority('DATASOURCEENTITY_READ')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CreateDataSourceOutput> create(@RequestBody @Valid CreateDataSourceInput dataSource) {
        FindDataSourceByNameOutput foundDataSource = dataSourceAppService.findByName(dataSource.getName());
        if (foundDataSource != null) {
            logHelper.getLogger().error("There already exists a datasource with a name=%s", foundDataSource.getName());
            throw new EntityExistsException(
                String.format("There already exists a datasource with name=%s", foundDataSource.getName())
            );
        }
        return new ResponseEntity(dataSourceAppService.create(dataSource), HttpStatus.OK);
    }

    // ------------ Delete an email ------------
    @PreAuthorize("hasAnyAuthority('DATASOURCEENTITY_DELETE')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> delete(@PathVariable String id) {
        FindDataSourceByIdOutput dob = dataSourceAppService.findById(Long.valueOf(id));

        if (dob == null) {
            logHelper.getLogger().error("There does not exist a data source wth a id=%s", id);
            throw new EntityNotFoundException(String.format("There does not exist a data source wth a id=%s", id));
        }
        return new ResponseEntity(dataSourceAppService.delete(Long.valueOf(id)), HttpStatus.OK);
    }

    // ------------ Update an email ------------
    @PreAuthorize("hasAnyAuthority('DATASOURCEENTITY_UPDATE')")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<UpdateDataSourceOutput> update(
        @PathVariable String id,
        @RequestBody @Valid UpdateDataSourceInput dataSource
    ) {
        FindDataSourceByIdOutput currentDataSource = dataSourceAppService.findById(Long.valueOf(id));
        if (currentDataSource == null) {
            logHelper.getLogger().error("Unable to update. Email with id {} not found.", id);
            return new ResponseEntity(new EmptyJsonResponse(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(dataSourceAppService.update(Long.valueOf(id), dataSource), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @PreAuthorize("hasAnyAuthority('DATASOURCEENTITY_READ')")
    public ResponseEntity<FindDataSourceByIdOutput> findById(@PathVariable String id) {
        FindDataSourceByIdOutput eo = dataSourceAppService.findById(Long.valueOf(id));

        if (eo == null) {
            return new ResponseEntity(new EmptyJsonResponse(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(eo, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasAnyAuthority('DATASOURCEENTITY_READ')")
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

        return ResponseEntity.ok(dataSourceAppService.find(searchCriteria, Pageable));
    }

    @PreAuthorize("hasAnyAuthority('DATASOURCEENTITY_READ')")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity list() throws Exception {
        return ResponseEntity.ok(dataSourceAppService.findAll());
    }

    /**
     *
     * @param dataSource
     * @return Table generated by query and its data type
     * @throws JSONException
     */
    @PreAuthorize("hasAnyAuthority('DATASOURCEENTITY_READ')")
    @RequestMapping(value = "/preview/table", method = RequestMethod.GET)
    public ResponseEntity<PreviewDataSourceOutput> preview(@RequestParam(value = "query") String dataSource)
        throws JSONException {
        PreviewDataSourceOutput pds = dataSourceAppService.preview(dataSource);
        return new ResponseEntity(pds, HttpStatus.OK);
    }

    /**
     *
     * @param id
     * @return Merge Field mapped comma seperated
     * @throws JSONException
     */

    @PreAuthorize("hasAnyAuthority('DATASOURCEENTITY_READ')")
    @RequestMapping(value = "/getAllMappedForMergeField/{id}", method = RequestMethod.GET)
    public ResponseEntity<ResponseEntityMergeField> getAllMappedMergeField(@PathVariable(value = "id") Long id)
        throws JSONException {
        String pds = dataSourceAppService.getAllMappedMergeField(id);
        ResponseEntityMergeField response = new ResponseEntityMergeField();
        response.setFields(pds);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     *
     * @param id
     * @returnEmail template mapped
     * @throws JSONException
     */
    @PreAuthorize("hasAnyAuthority('DATASOURCEENTITY_READ')")
    @RequestMapping(value = "/getAllMappedForEmailTemplate/{id}", method = RequestMethod.GET)
    public ResponseEntity<ResponseEntityMergeField> getAllMappedForEmailTemplate(@PathVariable(value = "id") Long id)
        throws JSONException {
        String pds = dataSourceAppService.getAllMappedForEmailTemplate(id);
        ResponseEntityMergeField response = new ResponseEntityMergeField();
        response.setFields(pds);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     *
     * @param id
     * @return Mapped DataSource for a email tempalte
     * @throws JSONException
     */
    @PreAuthorize("hasAnyAuthority('DATASOURCEENTITY_READ')")
    @RequestMapping(value = "/getAlreadyMappedDatasourceForEmailTemplate/{id}", method = RequestMethod.GET)
    public ResponseEntity<ResponseEntityMergeField> getAlreadyMappedDatasourceForEmailTemplate(
        @PathVariable(value = "id") Long id
    )
        throws JSONException {
        String pds = dataSourceAppService.getAlreadyMappedDatasourceForEmailTemplate(id);
        ResponseEntityMergeField response = new ResponseEntityMergeField();
        response.setFields(pds);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
