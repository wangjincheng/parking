#!/bin/bash 
# usage: check_loop <port> <path>  
# 每隔10分钟检查一次网页是否正常   
while true;  
        do  
                sleep 2  
                echo "$(date)  Nodejs check once"  >> check.$(date +%Y-%m-%d).log
        # 2008.08.21 -I/--head -s/--silent  
        #if curl -s -I --connect-timeout 5 --max-time 10 http://localhost:$1/; then  
        # 2010.02.16 add 200 OK test  
        if curl -s -I --connect-timeout 5 --max-time 10 http://119.29.57.178:3000 | grep -q '200 OK';  
        then  
                echo "$(date)  Nodejs maybe OK"  >> check.$(date +%Y-%m-%d).log 
        else  
                echo "$(date)  Nodejs maybe FAULT" >> check.$(date +%Y-%m-%d).log
                npm start & >> check.$(date +%Y-%m-%d).log
        fi  
        done  
 