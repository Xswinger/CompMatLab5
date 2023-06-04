package Methods;

public class GaussMethod extends AbstractMethod {

    public double[][] polynomials;

    private double numerical = 1;

    private double denominator = 1;

    public GaussMethod(double[][] data, double desired) {
        super(data, desired);
    }

    @Override
    public double solutionCycle() {

        polynomials = new double[data[0].length][];

        double middle = data[0][data.length/2+1];
        double result;

        if (middle > desired) {
            result = secondFormula();
        } else {
            result = firstFormula();
        }

        return result;
    }

    private double secondFormula() {

        double step = calculateStep(data[0][data.length/2]);
        double value = 0;
        int switchIndex = data[0].length/2;

        for (int i = 0; i < data[0].length; i++) {
            calculatePolynomialArray(i);
            if ((i+1) % 2 == 0) {
                switchIndex -= 1;
            }

            if (i != 0 && i % 2 == 0) {
                numerical *= (step - (i/2));
            } else if (i != 0 && i != 1 && i % 2 == 1) {
                numerical *= (step + (i/2));
            } else if (i == 1) {
                numerical = step;
            }

            if (i != 0) {
                denominator *= i;
            }
            value += calculateFractionFormula(polynomials[i][switchIndex], i);
        }

        return value;
    }

    private double firstFormula() {

        double step;

        if (data[0].length % 2 == 0) {
            step = calculateStep(data[0][data.length/2]);
        } else {
            step = calculateStep(data[0][data.length/2 + 1]);
        }

        double value = 0;
        int switchIndex;

        if (data[0].length % 2 == 0) {
            switchIndex = (data[0].length/2 - 1);
        } else {
            switchIndex = (data[0].length/2);
        }

        for (int i = 0; i < data[0].length; i++) {
            calculatePolynomialArray(i);
            if (i != 0 && (i+1) % 2 != 0) {
                switchIndex -= 1;
            }

            if (i != 0 && i % 2 == 0) {
                numerical *= (step + (i/2));
            } else if (i != 0 && i != 1 && i % 2 == 1) {
                numerical *= (step - (i/2));
            } else if (i == 1) {
                numerical = step;
            }

            value += calculateFractionFormula(polynomials[i][switchIndex], i);
        }

        return value;
    }

    private double calculateFractionFormula(double polynomial, int i) {

        return (numerical*polynomial)/denominator;
    }

    private void calculatePolynomialArray(int index) {

        if (index == 0) {
            polynomials[0] = data[1];
        } else {
            polynomials[index] = new double[data[0].length - index];
            for (int i = 0; i < data[0].length - index; i += 1) {
                polynomials[index][i] = (polynomials[index-1][i+1] - polynomials[index-1][i]);
            }
        }
    }

    private double calculateStep(double value) {
        return (desired - value)/(data[0][1] - data[0][0]);
    }


}
