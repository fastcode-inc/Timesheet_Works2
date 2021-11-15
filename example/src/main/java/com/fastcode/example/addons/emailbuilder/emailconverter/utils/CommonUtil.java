package com.fastcode.example.addons.emailbuilder.emailconverter.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.function.BiConsumer;
import java.util.function.BiFunction;

public class CommonUtil {

    public static final BiFunction<String, String, String> checkValue = (parem, defaultValue) ->
        parem.isEmpty() ? defaultValue : parem;

    public static final BiConsumer<String, String> writeFile = (content, path) -> {
        try {
            Files.write(Paths.get(path), content.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    };

    public static final void deleteFile(String path) {
        try {
            Files.deleteIfExists(Paths.get(path));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
