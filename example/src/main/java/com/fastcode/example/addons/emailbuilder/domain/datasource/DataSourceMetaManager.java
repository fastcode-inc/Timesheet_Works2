package com.fastcode.example.addons.emailbuilder.domain.datasource;

import com.fastcode.example.addons.emailbuilder.application.datasource.dto.DataSourceMetaInput;
import com.fastcode.example.addons.emailbuilder.application.datasource.dto.PreviewDataSourceOutput;
import com.fastcode.example.addons.emailbuilder.domain.model.DataSourceEntity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.persistence.EntityManager;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("DataSourceMetaEntityBean")
public class DataSourceMetaManager implements IDataSourceMetaManager {

    @Autowired
    private EntityManager entityManager;

    protected EntityManager getEntityManager() {
        return this.entityManager;
    }

    protected Class<DataSourceEntity> getModelClass() {
        return DataSourceEntity.class;
    }

    @Override
    public PreviewDataSourceOutput getData(String query) throws JSONException {
        // VARIABLE REQUIRED
        PreviewDataSourceOutput returnObj = new PreviewDataSourceOutput();
        Session session = entityManager.unwrap(Session.class);
        List<Object> dataList = new ArrayList<>();
        List<Object> dataTypeList = new ArrayList<>();
        Map<Integer, String> positionDataTypeMap = new HashMap<>();
        List<Integer> positions = new ArrayList<>();
        boolean valid = true;
        String message = "";
        String tableName = "";
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        // String multiLineRegex = "((.|\\n)*)";
        Pattern pattern = Pattern.compile(regex);
        String regexEmail = "^(.+)@(.+)$";
        Pattern patternEmail = Pattern.compile(regex);
        String multiLineRegex = ".*\\n(.*)\\n?(.*)";

        String patternforSpecialChar = "[^A-Za-z0-9]";

        Pattern patternMultiLine = Pattern.compile(multiLineRegex);

        List<DataSourceMetaInput> allMetaInput = new ArrayList<>();
        String lowerCaseQuery = query.toLowerCase();

        try {
            Query<Object> managerQuery = session.createSQLQuery(query);
            if (managerQuery.getMaxResults() > 0) {
                dataList = managerQuery.list();
            }
            query = query.toLowerCase();
            // Logic to fetch the Table name
            String columns = lowerCaseQuery.split("from")[0];
            if (lowerCaseQuery.contains("where")) {
                tableName = lowerCaseQuery.split("from")[1];
                tableName = tableName.split("where")[0];
            } else {
                tableName = lowerCaseQuery.split("from")[1];
            }
            if (tableName.contains(";")) {
                tableName = tableName.split(";")[0];
            }
            tableName = tableName.trim();

            columns = columns.split("select")[1];
            columns = columns.trim();

            // Logic to fetch the Column name and also for *
            List<String> initialColumns = new ArrayList<>();
            List<String> arrColumns = new ArrayList<>();
            Map<String, String> columnAliased = new HashMap<String, String>();
            boolean columnExist = false;
            if (StringUtils.isNotBlank(columns) && !"*".equals(columns)) {
                columnExist = true;
                initialColumns = Arrays.asList(columns.split(","));
            }
            // Logic for Aliasing
            for (String col : initialColumns) {
                if (col.contains(" as ")) {
                    columnAliased.put(col.split(" as ")[0].trim(), col.split(" as ")[1].trim());
                    col = col.split(" as ")[1];
                }
                arrColumns.add(col);
            }

            for (Object obj : dataList) {
                Object[] arrdata = null;
                Object value = null;
                // For Single column query returning Object instead of Object[]
                try {
                    arrdata = (Object[]) obj;
                } catch (Exception e) {
                    if (obj != null) {
                        value = obj;
                    }
                }

                // LOGIC FOR EMAIL/ALL DATA TYPE
                if (value == null) {
                    for (int i = 0; i < arrdata.length; i++) {
                        Object objji = arrdata[i];

                        System.out.println("data : {} " + (String) objji);
                        if (objji instanceof String && StringUtils.isNotBlank((String) objji)) {
                            Matcher matcher = pattern.matcher((String) objji);
                            Matcher matcher2 = patternMultiLine.matcher((String) objji);
                            if (matcher.matches()) {
                                if (!positions.contains(i)) {
                                    positionDataTypeMap.put(i, "email");
                                    positions.add(i);
                                }
                            } else if (matcher2.matches()) {
                                System.out.println(" coming matcher");
                                if (!positions.contains(i)) {
                                    positionDataTypeMap.put(i, "Multi-line Text");
                                    positions.add(i);
                                }
                            }
                        } else if (objji instanceof String && StringUtils.isNotBlank((String) objji)) {
                            if (!positions.contains(i)) {
                                positions.add(i);
                            }
                        }
                    }
                } else {
                    // single column case
                    Matcher matcher = patternEmail.matcher(value.toString());
                    Matcher matcher2 = patternMultiLine.matcher(value.toString());
                    if (matcher.matches()) {
                        positionDataTypeMap.put(0, "email");
                        positions.add(0);
                    } else if (matcher2.matches()) {
                        if (!positions.contains(0)) {
                            positionDataTypeMap.put(0, "Multi-line Text");
                            positions.add(0);
                        }
                    }
                }
            }

            // GETTING ALL COLUMN

            if (!dataList.isEmpty()) {
                Query managerQuery1 = session.createSQLQuery(
                    "select column_name,data_type from information_schema.columns where table_name = '" +
                    tableName +
                    "' "
                );
                dataTypeList = managerQuery1.list();
            } else {
                valid = false;
                message = "No Record found";
            }

            if (columnExist) {
                for (String element : arrColumns) {
                    element = element.trim();
                    for (Object obj : dataTypeList) {
                        Object[] arr = (Object[]) obj;
                        if (element.equals((String) arr[0])) {
                            DataSourceMetaInput dataSource = new DataSourceMetaInput();
                            dataSource.setMetaColumnDataType((String) arr[1]);
                            dataSource.setMetaColumn((String) arr[0]);
                            allMetaInput.add(dataSource);

                            break;
                        }

                        if (
                            columnAliased.containsKey((String) arr[0]) &&
                            columnAliased.get((String) arr[0]).equals(element)
                        ) {
                            DataSourceMetaInput dataSource = new DataSourceMetaInput();
                            dataSource.setMetaColumnDataType((String) arr[1]);
                            dataSource.setMetaColumn(columnAliased.get((String) arr[0]));
                            allMetaInput.add(dataSource);
                            break;
                        }
                    }
                }
            } else {
                // CASE OF *

                for (Object obj : dataTypeList) {
                    Object[] arr = (Object[]) obj;
                    DataSourceMetaInput dataSource = new DataSourceMetaInput();
                    dataSource.setMetaColumnDataType((String) arr[1]);
                    dataSource.setMetaColumn((String) arr[0]);
                    allMetaInput.add(dataSource);
                }
            }
        } catch (Exception e) {
            valid = false;
            try {
                message = e.getCause().getCause().getMessage();
            } catch (Exception e1) {
                message = e.getMessage();
            }
        }

        // SETTING DATA
        for (int i = 0; i < allMetaInput.size(); i++) {
            if (positions.contains(i)) {
                DataSourceMetaInput dataSource = allMetaInput.get(i);
                if ("character varying".equals(dataSource.getMetaColumnDataType())) {
                    dataSource.setMetaColumnDataType(positionDataTypeMap.get(i));
                }
            }
        }
        returnObj.setValid(valid);
        returnObj.setMessage(message);
        returnObj.setMetaData(allMetaInput);
        returnObj.setDataToPreview(dataList);

        return returnObj;
    }
}
