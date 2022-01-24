
from selenium import webdriver
from time import sleep

driver = webdriver.Chrome()
driver.get('http://quotes.money.163.com/trade/lsjysj_zhishu_000001.html')
sleep(5)

driver.find_element_by_xpath(
    "/html/body/div[@class='area']/div[@class='inner_box']/div[@class='search_area align_r']/form[@id='date']/a[@class='download_link']").click()
sleep(5)
driver.find_element_by_xpath("/html/body/div[@class='area']/div[@id='dropBox1']/div[@class='bd']/form[@name='tradeData']/div[@class='align_c']/a[@class='blue_btn submit']").click()
sleep(10)
driver.close()
def export_to_file(stock_dict):
    """导出股票数据"""
    with open('bjA股数据.csv', 'a', encoding='gbk') as file:
        file.write(','.join(stock_dict.values()))
        file.write('\n')
