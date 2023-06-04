package Methods;

public class LaGrangeMethod extends AbstractMethod {

    public LaGrangeMethod(double[][] data, double desired) {
        super(data, desired);
    }

    @Override
    public double solutionCycle() {

        double polynomial = 0;

        for (int i = 0; i < data[0].length; i += 1) {

            polynomial += calculatePolynomial(i);

        }

        return polynomial;

    }

    private double calculatePolynomial(int index) {

        double numeration = 1;
        double denominator = 1;

        for (int i = 0; i < data[0].length - 1; i += 1) {
            if (i != index) {
                numeration *= (desired - data[0][i]);
                denominator *= (data[0][index] - data[0][i]);
            }
        }

        return data[1][index] * (numeration/denominator);

    }

}
