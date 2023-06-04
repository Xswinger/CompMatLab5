package Response;

public class Response {

    private double[] approximateGauss;

    private double[] approximateLaGrange;

    private double[][] desired;

    public double[] getApproximateGauss() {
        return approximateGauss;
    }

    public void setApproximateGauss(double[] approximateGauss) {
        this.approximateGauss = approximateGauss;
    }

    public double[] getApproximateLaGrange() {
        return approximateLaGrange;
    }

    public void setApproximateLaGrange(double[] approximateLaGrange) {
        this.approximateLaGrange = approximateLaGrange;
    }

    public double[][] getDesired() {
        return desired;
    }

    public void setDesired(double[][] desired) {
        this.desired = desired;
    }
}
