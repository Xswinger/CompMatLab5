import Methods.*;
import Response.Response;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

@WebServlet(name = "HandlerServlet", value = "/handler")
public class Handler extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        PrintWriter writer = resp.getWriter();

        resp.setContentType("text/html");

        Response response = new Response();
        double[] xData = Arrays.stream(req.getParameterValues("xData[]")).mapToDouble(Double::parseDouble).toArray();
        double[] yData = Arrays.stream(req.getParameterValues("yData[]")).mapToDouble(Double::parseDouble).toArray();
        double[] desired = Arrays.stream(req.getParameterValues("approximate[]")).mapToDouble(Double::parseDouble).toArray();

        response.setApproximateGauss(new double[desired.length]);
        response.setApproximateLaGrange(new double[desired.length]);

        for (int i = 0; i < desired.length; i += 1) {

            GaussMethod gauss = new GaussMethod(new double[][]{xData, yData}, desired[i]);

            response.getApproximateGauss()[i] = gauss.solutionCycle();
            response.getApproximateLaGrange()[i] = new LaGrangeMethod(new double[][]{xData, yData}, desired[i]).solutionCycle();
            response.setDesired(gauss.polynomials);

        }

        writer.println(gson.toJson(response));

        resp.setContentType("text/html");

    }
}
