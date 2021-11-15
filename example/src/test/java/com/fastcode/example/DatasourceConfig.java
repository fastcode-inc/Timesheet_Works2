package com.fastcode.example;

import static com.fastcode.example.DatabaseContainerConfig.*;

import java.sql.SQLException;
import javax.sql.DataSource;
import liquibase.integration.spring.SpringLiquibase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@Profile("test")
public class DatasourceConfig {

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName("org.postgresql.Driver");
        ds.setUrl(databaseContainer.getJdbcUrl() + "&stringtype=unspecified&currentSchema=timesheet");
        ds.setUsername(databaseContainer.getUsername());
        ds.setPassword(databaseContainer.getPassword());
        ds.setSchema("timesheet");
        return ds;
    }

    @Bean
    public SpringLiquibase springLiquibase(DataSource dataSource) throws SQLException {
        tryToCreateSchema(dataSource);
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setDropFirst(true);
        liquibase.setDataSource(dataSource);
        liquibase.setDefaultSchema("timesheet");
        liquibase.setChangeLog("classpath:/db/changelog/test/db.changelog-testmaster.xml");
        return liquibase;
    }

    private void tryToCreateSchema(DataSource dataSource) throws SQLException {
        String CREATE_SCHEMA_QUERY = "CREATE SCHEMA IF NOT EXISTS timesheet";
        dataSource.getConnection().createStatement().execute(CREATE_SCHEMA_QUERY);
    }
    //	@Bean
    //	public ServletWebServerFactory servletWebServerFactory() {
    //		return new TomcatServletWebServerFactory();
    //	}

}
