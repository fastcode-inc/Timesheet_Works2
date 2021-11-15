package com.fastcode.example;

import org.junit.ClassRule;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.testcontainers.containers.PostgreSQLContainer;

@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ContextConfiguration(initializers = DatabaseContainerConfig.Initializer.class)
public abstract class DatabaseContainerConfig {

    @ClassRule
    public static PostgreSQLContainer databaseContainer = new PostgreSQLContainer("postgres:9.4")
        .withDatabaseName("Timesheet_Works")
        .withUsername("sa")
        .withPassword("sa");

    static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            TestPropertyValues
                .of(
                    "spring.datasource.url=" +
                    databaseContainer.getJdbcUrl() +
                    "&stringtype=unspecified&currentSchema=timesheet",
                    "spring.datasource.username=" + databaseContainer.getUsername(),
                    "spring.datasource.password=" + databaseContainer.getPassword()
                )
                .applyTo(configurableApplicationContext.getEnvironment());
        }
    }
}
