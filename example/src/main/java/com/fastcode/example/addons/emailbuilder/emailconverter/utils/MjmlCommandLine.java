package com.fastcode.example.addons.emailbuilder.emailconverter.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;

//@Service
public class MjmlCommandLine {

    public static String executeCommand(String mjmlTemplate) {
        try {
            //      String formedCommand = command + "\"" + nodePath + "mjml\" " + mjmlTemplate;
            String formedCommand = getCommand(mjmlTemplate);
            System.out.println(formedCommand);
            Process p = Runtime.getRuntime().exec(formedCommand);
            // p.waitFor();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String outPutHtml = reader.lines().reduce("", (a, b) -> a + b);
            System.out.println(outPutHtml);
            return outPutHtml;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    private static String getCommand(String mjmlTemplate) {
        String command = "mjml " + mjmlTemplate;
        boolean isWindows = System.getProperty("os.name").toLowerCase().startsWith("windows");
        ProcessBuilder builder = new ProcessBuilder();
        if (isWindows) {
            return "cmd.exe /c" + command;
        } else {
            return "sh -c" + command;
        }
    }
}
