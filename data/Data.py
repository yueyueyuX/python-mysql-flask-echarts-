import pymysql
from collections import Counter
import numpy as np
import pandas as pd


# 连接数据库
def getConnect():
    conn = pymysql.connect(
        host='localhost',
        user='root',
        passwd='123456',
        database='testdb'
    )
    cursor = conn.cursor()
    return conn, cursor


# 清空表
def emptySql(tablename):
    conn, cursor = getConnect()
    sql = "truncate table %s" % tablename
    cursor.execute(sql)


# 删除空值
def deleteNone(tablename):
    conn, cursor = getConnect()
    sql = "delete from %s where turnover_rate = '-'" % tablename
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()


# 查找数据
def getsqlData(sql):
    conn, cursor = getConnect()
    cursor.execute(sql)
    data_list = []
    for item in cursor.fetchall():
        data_list.append(item)
    cursor.close()
    conn.close()
    return data_list


sql1 = "select name, vol, amount from stocks"


# 获取成交量bar数据
def getVol_AmoList(sql):
    datalist = getsqlData(sql)
    # print(datalist)  [('N通灵', '19.15万', '10.58亿'),
    # 元组化成列表
    newlist = list()
    for i in range(len(datalist)):
        newlist.append(list(datalist[i]))

    # 化单位，把vol的以万为单位的化成元为单位，amo亿化成万
    for i in range(len(newlist)):
        if '万' in newlist[i][1]:
            newlist[i][1] = float(newlist[i][1].strip('万')) * 10000
        if '亿' in newlist[i][2]:
            newlist[i][2] = float(newlist[i][2].strip('亿')) * 10000

        # 保留小数点后4位。同时把amo的万单位去掉
        newlist[i][1] = round(float(newlist[i][1]), 4)
        newlist[i][2] = str(newlist[i][2]).strip('万')
        newlist[i][2] = round(float(newlist[i][2]), 4)

    list_sortedby_vol = sorted(newlist, key=lambda x: x[1], reverse=True)  # sort by vol, reverse=True
    list_sortedby_amo = sorted(newlist, key=lambda x: x[2])  # sort by amo

    name = [n[0] for n in list_sortedby_amo]
    vol = [n[1] for n in list_sortedby_amo]
    amo = [n[2] for n in list_sortedby_amo]
    return name, vol, amo


#  获得K线图数据
def getKLineData(csv_name):
    df = pd.read_csv(csv_name, encoding='gbk')
    # 表格里的日期转化为日期格式
    df = df[df['日期'] != 'None']
    df['日期'] = pd.to_datetime(df['日期']).astype('str')
    # dataframe横向合并
    a = pd.concat([df['日期'], df['开盘价'], df['收盘价'], df['最低价'], df['最高价']], ignore_index=False, axis=1)
    datalist = np.array(a).tolist()
    return datalist[::-1]


# 获得总量数据
def totalAmo():
    name, vol, amo = getVol_AmoList(sql1)
    return int(sum(amo))


# 获得上海深圳北京饼图数据
def getAmoshszbj():
    sqlsh = "select name, vol, amount from stockssh"
    sqlsz = "select name, vol, amount from stockssz"
    sqlbj = "select name, vol, amount from stocksbj"
    sql_list = [sqlsh, sqlsz, sqlbj]
    amo_list = list()
    for sql in sql_list:
        name, vol, amo = getVol_AmoList(sql)
        amo_list.append(int(sum(amo)))
    return amo_list


# 获得成交额成交量与涨跌幅 bar+line图数据
def getEcharts3Data(csv_name):
    df = pd.read_csv(csv_name, encoding='gbk')
    # 表格里的日期转化为日期格式
    df = df[df['日期'] != 'None']
    df['日期'] = pd.to_datetime(df['日期']).astype('str')
    # 表格里的科学计数法转化为浮点数格式
    deal_name = ['成交金额', '成交量']  # '成交量' '总市值', '流通市值'
    for name in deal_name:
        df = df[df[name] != 'None']
        df[name] = df[name].astype(np.float64)
    # dataframe横向合并
    a = pd.concat([df['日期'], df['成交金额'], df['成交量'], df['涨跌幅']], ignore_index=False, axis=1)
    datalist = np.array(a).tolist()
    date = [n[0] for n in datalist[::-1]]
    e = [n[1] / 10000 for n in datalist[::-1]]
    liang = [n[2] / 10000 for n in datalist[::-1]]
    fu = [n[3] for n in datalist[::-1]]
    return date, e, liang, fu


# 获得词云图数据
def getWordCloudData():
    sql = "select name, chg_rate1 from stocksgai"
    data = getsqlData(sql)
    newlist = list()
    for i in range(len(data)):
        newlist.append(list(data[i]))
    dict_list = list()
    key_list = ['name', 'value']
    for i in range(len(data)):
        # 去单位
        newlist[i][1] = float(newlist[i][1].strip('%'))
        # 转化为词云图参数需要的数据形式 {'name': '昨日连板', 'value': '844.56'}
        dict_list.append(dict(zip(key_list, newlist[i])))
    return dict_list


# 获得漏斗图数据
def getFunnellData():
    sql = "select leader, chg_rate2 from stocksgai"
    data = getsqlData(sql)
    count = Counter(data)
    newlist = list()
    fin_list = list()
    for i in range(len(count)):
        sigletup = [0, 0]
        sigletup[0] = list(count.keys())[i][0]
        sigletup[1] = list(count.values())[i]
        newlist.append(sigletup)
        if newlist[i][1] > 4:
            fin_list.append(newlist[i])
    key_list = ['name', 'value']
    dict_list = list()
    for i in range(len(fin_list)):
        dict_list.append(dict(zip(key_list, newlist[i])))
    return dict_list
