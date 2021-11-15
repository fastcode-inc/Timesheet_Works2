package com.fastcode.example.addons.emailbuilder.domain.datasource;

import com.fastcode.example.addons.emailbuilder.application.datasource.dto.PreviewDataSourceOutput;
import org.json.JSONException;

public interface IDataSourceMetaManager {
    public PreviewDataSourceOutput getData(String query) throws JSONException;
}
