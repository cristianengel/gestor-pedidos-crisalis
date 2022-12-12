package com.cristianengel.gestorpedidos.exception;

import com.cristianengel.gestorpedidos.exception.custom.EmptyElementException;
import com.cristianengel.gestorpedidos.exception.custom.NotCreatedException;
import com.cristianengel.gestorpedidos.exception.custom.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ApiExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
            EmptyElementException.class,
            NotCreatedException.class
    })
    @ResponseBody
    public ErrorMessage badRequest(HttpServletRequest request, Exception exception) {
        return new ErrorMessage(exception, request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({
            UnauthorizedException.class
    })
    @ResponseBody
    public void unauthorized() {
        // Empty, because http in case 401 doesn't support BodyResponse
    }

}
