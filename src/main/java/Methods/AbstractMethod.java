package Methods;

public abstract class AbstractMethod implements Method {
    //x, y
    public double[][] data;

    public double desired;

    AbstractMethod(double[][] data, double desired) {
        this.data = data;
        this.desired = desired;
    }

}
