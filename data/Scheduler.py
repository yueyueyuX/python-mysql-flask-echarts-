import logging
import time
from apscheduler.schedulers.blocking import BlockingScheduler

from data.Data import *
from data.DataCrawler import *

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S',
                    filename='log1.txt',
                    filemode='a')

url = 'http://quote.eastmoney.com/center/gridlist.html#hs_a_board'
urlsh = 'http://quote.eastmoney.com/center/gridlist.html#sh_a_board'
urlsz = 'http://quote.eastmoney.com/center/gridlist.html#sz_a_board'
urlbj = 'http://quote.eastmoney.com/center/gridlist.html#bj_a_board'
urlgai = 'http://quote.eastmoney.com/center/boardlist.html#concept_board'


def my_job():
    table_list = ['stocks', 'stockssh', 'stockssz', 'stocksbj', 'stocksgai']
    url_list = [url, urlsh, urlsz, urlbj, urlgai]
    # 清空每个表
    for table in table_list:
        emptySql(table)
    # 每个表爬虫获得数据
    for i in range(len(table_list)):
        try:
            print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())))
            # 爬取数据
            stocksCl(url_list[i], table_list[i])
            print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())))
            while i == 4:
                conceptCl(urlgai)
                break
        except Exception as e:
            print("except:", e)
            continue
    # 个股数据爬取下载
    IndividualSCl()
    print("本次爬虫完成")
    print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())))


sched = BlockingScheduler()
# # 定时，周一到周五每天下午三点运行
sched.add_job(my_job, 'cron', day_of_week='mon-fri', hour='15')
sched._logger = logging
sched.start()
