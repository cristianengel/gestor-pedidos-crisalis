package com.cristianengel.gestorpedidos.exception.custom;

public class UnauthorizedException extends RuntimeException{
    private static final String DESCRIPTION = "Invalid credentials (401)";

    public UnauthorizedException(String detail) {
        super(DESCRIPTION + ". " + detail);
    }
}
