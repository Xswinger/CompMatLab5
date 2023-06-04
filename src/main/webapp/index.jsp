<%@ page contentType="text/html;charset=utf-8" %>

<html style="background: linear-gradient(351deg, rgba(2,0,36,1) 0%, rgba(0,156,142,1) 0%, rgba(0,212,255,1) 100%);">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная работа №5</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="icon" type="image/x-icon" href="style/icon.svg">
</head>
<body>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <h1 class="title is-1 has-text-centered">Интерполяция функции</h1>
    <div>
        <div class="has-text-centered m-2">
            <div>
                <span class="title is-3">Ввод исходных данных</span>
            </div>
            <div class="columns">
                <div class="column level mt-5">
                    <h4 class="level-item title is-5">Ввод из файла:</h4>
                    <div class="file level-item">
                        <label class="file-label">
                            <input id="file_input" class="file-input" type="file" name="resume" accept=".txt">
                            <span class="file-cta">
                            <span class="file-label">
                                Выберите файл…
                            </span>
                        </span>
                            <span id="name-file" class="file-name">
                            Файл не выбран
                        </span>
                        </label>
                    </div>
                    <span class="title is-3" style="color: red" id="error-file"></span>
                </div>
                <div class="column">
                    <div class="column">
                        <div class="columns">
                            <div class="column">
                                <div>
                                    <span class="title is-5">Ввод из таблицы</span>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <table id="values-table" class="table is-fullwidth is-bordered">
                                            <thead>
                                            <tr>
                                                <th class="has-text-centered" title="X">X</th>
                                                <th class="has-text-centered" title="Y">Y</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <input class="input" type="text">
                                                </td>
                                                <td>
                                                    <input class="input" type="text">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input class="input" type="text">
                                                </td>
                                                <td>
                                                    <input class="input" type="text">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input class="input" type="text">
                                                </td>
                                                <td>
                                                    <input class="input" type="text">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input class="input" type="text">
                                                </td>
                                                <td>
                                                    <input class="input" type="text">
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="column is-narrow pl-0">
                                        <div>
                                            <button id="addButton" class="button" onclick="addRow()">+</button>
                                        </div>
                                        <div>
                                            <button id="deleteButton" class="button mt-1" onclick="deleteRow()" disabled>-</button>
                                        </div>
                                    </div>
                                    <div class="column columns">
                                        <div class="column">
                                            <table id="approximate-table" class="table is-fullwidth is-bordered">
                                                <thead>
                                                <tr>
                                                    <th class="has-text-centered" title="X">X</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <input class="input" type="text">
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="column is-narrow pl-0">
                                            <div>
                                                <button id="addApproximate" class="button" onclick="addApproximateTableRow()">+</button>
                                            </div>
                                            <div>
                                                <button id="deleteApproximate" class="button mt-1" onclick="deleteApproximateTableRow()" disabled>-</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button id="sendButton" class="button is-primary" onclick="sendData()" disabled>Посчитать</button>
                        <button id="clearButton" class="button is-warning" onclick="clearTable()">Очистить</button>
                    </div>
                </div>
                <div class="column mt-5">
                    <div>
                        <span class="title is-5">Функции</span>
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="function" onchange="checkManual()">$$y=\sin{x}$$
                            </label>
                            <br>
                            <label class="radio">
                                <input type="radio" name="function" onchange="checkManual()">$$y=3x^2 - 5x$$
                            </label>
                        </div>
                    </div>
                    <div>
                        <span class="title is-5">Интервал</span>
                        <div class="columns">
                            <div class="column field">
                                <label class="label">Левая граница</label>
                                <div class="control">
                                    <input id="left-border" class="input" type="number" onchange="checkManual()">
                                </div>
                            </div>
                            <div class="column field">
                                <label class="label">Правая граница</label>
                                <div class="control">
                                    <input id="right-border" class="input" type="number" onchange="checkManual()">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="label">Количество точек</label>
                        <div>
                            <input id="point-count" class="input" type="number" onchange="checkManual()" min="1">
                        </div>
                    </div>
                    <div class="mt-5">
                        <button id="sendManualButton" class="button is-primary" onclick="sendManualData()" disabled>Посчитать</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="has-text-centered">
            <div class="mb-3">
                <span class="title is-3">График</span>
            </div>
            <div>
                <canvas class="mr-3" id="canvas_background" style="height: 400px"></canvas>
            </div>
        </div>
    </div>
    <div class="has-text-centered">
        <div>
            <span class="title is-2">Результат</span>
        </div>
        <br>
        <span class="title is-3">Таблица конечных разностей</span>
        <table class="table is-fullwidth is-bordered mt-5" id="XY-table">
            <thead>
            <tr>
                <th class="has-text-centered" title="x">$$x$$</th>
                <th class="has-text-centered" title="y">$$y$$</th>
                <th class="has-text-centered" title="y">$$\Delta y$$</th>
                <th class="has-text-centered" title="y">$$\Delta^2 y$$</th>
                <th class="has-text-centered" title="y">$$\Delta^3 y$$</th>
                <th class="has-text-centered" title="y">$$\Delta^4 y$$</th>
                <th class="has-text-centered" title="y">$$\Delta^5 y$$</th>
                <th class="has-text-centered" title="y">$$\Delta^6 y$$</th>
                <th class="has-text-centered" title="y">$$\Delta^7 y$$</th>
                <th class="has-text-centered" title="y">$$\Delta^8 y$$</th>
                <th class="has-text-centered" title="y">$$\Delta^9 y$$</th>
                <th class="has-text-centered" title="y">$$\Delta^10 y$$</th>
            </tr>
            </thead>
            <tbody class="has-text-centered">

            </tbody>
        </table>
        <div>
            <div>
                <span class="title is-3">Приближенные значения функции</span>
            </div>
            <table class="table is-fullwidth is-bordered mt-5" id="coefficients">
                <thead>
                <tr>
                    <th class="has-text-centered" title="naming">X</th>
                    <th class="has-text-centered" title="a_0">Многочлен Лагранжа</th>
                    <th class="has-text-centered" title="b_0">Многочлен Гаусса</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="js/table.js"></script>
<script src="js/controller.js"></script>
<script src="js/canvas.js"></script>
</body>
</html>
