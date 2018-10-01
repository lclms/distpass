#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""

@author: luismarques
"""

filepath = 'az09.txt'
file = open('file_importa_distpass_brute_force.json','w')   
with open(filepath) as fp:  
   line = fp.readline()
   cnt = 1
   var = 50000
   dobra = 50000
   while line:
       s =  '{}'.format(len(str(line.strip())))     
       try:
           type(int(line.strip()))
           ty="i"            
       except ValueError:
           ty="s"
       if var==dobra:
           file.write(']}{"l": '+s+', "k": "b","t":"'+ty+'","w": [')
           dobra+=50000

       if var+1==dobra:
           file.write('"'+line.strip()+'"\n')
       else:
           file.write('"'+line.strip()+'",\n')
           
       var+=1       
       line = fp.readline()
       cnt += 1
file.close()
