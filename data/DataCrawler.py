from selenium import webdriver
from time import sleep
import mysql.connector as mysql


# 爬取股票信息，保存到本地文件/数据库

driver = webdriver.Chrome()


# 根据xpath获取内容
def extractor(xpath_text):
    text_include = driver.find_element_by_xpath(xpath_text)
    return text_include.text


url = 'http://quote.eastmoney.com/center/gridlist.html#hs_a_board'
urlsh = 'http://quote.eastmoney.com/center/gridlist.html#sh_a_board'
urlsz = 'http://quote.eastmoney.com/center/gridlist.html#sz_a_board'
urlbj = 'http://quote.eastmoney.com/center/gridlist.html#bj_a_board'
urlgai = 'http://quote.eastmoney.com/center/boardlist.html#concept_board'


# 概念股爬虫
def conceptCl(url):
    db = mysql.connect(
        host='localhost',
        user='root',
        passwd='123456',
        database='testdb'
    )
    cursor = db.cursor()
    sql = "insert into stocksgai (rank, name, new, chg_value, chg_rate1, tm_value, turnover_rate, up, down, leader,chg_rate2" \
          ") Values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"

    driver.get(url)
    sleep(5)

    for page_num in range(1, 18):
        for i in range(1, 11):
            for ele_type in ['odd', 'even']:
                stock_dict = {}
                number_list = ['1', '2', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                ele_list = ['排名', '名称', '最新价', '涨跌额', '涨跌幅1', '总市值', '换手率', '上涨家数', '下跌家数', '领涨股票', '涨跌幅2']
                for j, name in zip(number_list, ele_list):
                    temp_xpath = "/html/body/div[@class='page-wrapper']/div[@id='page-body']/div[@id='body-main']/div[@id='table_wrapper']/table[@id='table_wrapper-table']/tbody/tr[@class='{}'][{}]/td[{}]".format(
                        ele_type, i, j)
                    stock_dict[name] = extractor(temp_xpath)
                print(list(stock_dict.values()))
                cursor.execute(sql, list(stock_dict.values()))
                db.commit()
        # 到下一页继续爬
        driver.find_element_by_xpath(
            "/html/body/div[@class='page-wrapper']/div[@id='page-body']/div[@id='body-main']/div[@id='table_wrapper']/div[@class='dataTables_wrapper']/div[@id='main-table_paginate']/a[@class='next paginate_button']").click()
        sleep(1)

    # driver.close()


# A股爬虫
def stocksCl(url, tablename):
    db = mysql.connect(
        host='localhost',
        user='root',
        passwd='123456',
        database='testdb'
    )
    cursor = db.cursor()
    sql = "insert into " + tablename +"(symbol, name, new, chg_rate, change_value, vol, amount, amplitude, high, low, open, " \
          "prev_close, qrr, turnover_rate, pe, pb) Values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"

    driver.get(url)
    sleep(5)

    for page_num in range(1, 242):
        for i in range(1, 11):
            for ele_type in ['odd', 'even']:
                stock_dict = {}
                number_list = ['2', '3', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
                ele_list = ['代码', '名称', '最新价', '涨跌幅', '涨跌额', '成交量', '成交额', '振幅', '最高价', '最低价', '今开',
                            '昨收', '量比', '换手率', '市盈率', '市净率']
                for j, name in zip(number_list, ele_list):
                    temp_xpath = "/html/body/div[@class='page-wrapper']/div[@id='page-body']/div[@id='body-main']/div[@id='table_wrapper']/div[@class='listview full']/table[@id='table_wrapper-table']/tbody/tr[@class='{}'][{}]/td[{}]".format(
                        ele_type, i, j)
                    stock_dict[name] = extractor(temp_xpath)
                print(list(stock_dict.values()))
                cursor.execute(sql, list(stock_dict.values()))
                db.commit()
        # 到下一页继续爬
        driver.find_element_by_xpath(
            "/html/body/div[@class='page-wrapper']/div[@id='page-body']/div[@id='body-main']/div[@id='table_wrapper']/div[@class='listview full']/div[@class='dataTables_wrapper']/div[@id='main-table_paginate']/a[@class='next paginate_button']").click()
        sleep(1)

    # driver.close()


# 个股爬虫
def IndividualSCl():
    driver = webdriver.Chrome()
    driver.get('http://quotes.money.163.com/trade/lsjysj_zhishu_000001.html')
    sleep(3)

    driver.find_element_by_xpath(
        "/html/body/div[@class='area']/div[@class='inner_box']/div[@class='search_area align_r']/form[@id='date']/a[@class='download_link']").click()
    sleep(3)
    driver.find_element_by_xpath(
        "/html/body/div[@class='area']/div[@id='dropBox1']/div[@class='bd']/form[@name='tradeData']/div[@class='align_c']/a[@class='blue_btn submit']").click()
    sleep(5)
    # driver.close()


