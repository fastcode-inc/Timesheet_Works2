package com.fastcode.example.addons.emailbuilder.emailconverter.utils;

import com.fastcode.example.addons.emailbuilder.emailconverter.dto.response.ResponseDto;
import com.fastcode.example.addons.emailbuilder.emailconverter.exception.DublicateValueException;
import com.fastcode.example.addons.emailbuilder.emailconverter.exception.GenralException;
import java.util.function.BiFunction;
import java.util.function.Supplier;

public class ExceptionGenrater {

    public static final BiFunction<String, Integer, Supplier<GenralException>> genralException = (message, status) ->
        () -> new GenralException(DataMapper.object2Json.apply(new ResponseDto<>(message, status)));

    public static final BiFunction<String, Integer, Supplier<DublicateValueException>> dublicateException = (message, status) ->
        () -> new DublicateValueException(DataMapper.object2Json.apply(new ResponseDto<>(message, status)));
}
