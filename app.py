from flask import Flask, render_template, jsonify
from data.Data import *

app = Flask(__name__)


@app.route('/')
def render():
    return render_template('index.html')


@app.route('/echarts_1')
def get_echarts_1_data():
    data = getWordCloudData()
    return jsonify({"data": data})


@app.route('/echarts_2')
def get_echarts_2_data():
    data = getFunnellData()
    return jsonify({"data": data})


@app.route('/echarts_3')
def get_echarts_3_data():
    data = getEcharts3Data(r'C:\Users\Yuzuru Hanyu\Downloads/000001.csv')
    return jsonify({"date": data[0], "e": data[1], "liang": data[2], "fu": data[3]})


@app.route('/echarts_4')
def get_echarts_4_data():
    data = getKLineData(r'C:\Users\Yuzuru Hanyu\Downloads/000001.csv')
    return jsonify({"data": data})


@app.route('/echarts_5')
def get_echarts_5_data():
    data = getVol_AmoList(sql1)
    return jsonify({"gname": data[0], "vol": data[1], "amo": data[2]})


@app.route('/numbt')
def get_totalAmo_data():
    data = totalAmo()
    return jsonify({"data": data})


@app.route('/zb')
def get_zb_data():
    data = getAmoshszbj()
    return jsonify({"sh": data[0], "sz": data[1], "bj": data[2]})


if __name__ == '__main__':
    app.debug = True
    app.run()