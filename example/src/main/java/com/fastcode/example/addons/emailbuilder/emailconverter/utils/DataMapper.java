package com.fastcode.example.addons.emailbuilder.emailconverter.utils;

import com.google.gson.Gson;
import java.util.function.BiFunction;
import java.util.function.Function;

public class DataMapper {

    public static final Function<Object, String> object2Json = object -> new Gson().toJson(object);

    public static final BiFunction<String, Class<?>, Object> json2Object = (json, objectClass) ->
        new Gson().fromJson(json, objectClass);
}
