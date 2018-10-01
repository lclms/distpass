# Create the Datasets

The system works with two sets of data, a set that is meant to encompass all possible combinations for a given set of characters and another set of data with previously selected words. For this dataset, the "Rockyou" (this data set accompanies the distribution of Kali Linux and comes from an old social network with the same name) dataset used.

### Create the combinatorial dataset with the crunch tool

In this dataset we will use the following set of data.
>a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9

To continue creating the dataset we use the crunch tool.
In our concrete case the command used was;

`crunch 4 4 abcdefghijklmnopqrstuvwxyz0123456789 -o az09.txt`

Running this command will allow you to create a file that will serve as the basis for creating our combinatorial data set. We use this data set for size 4 passwords. You can create another size (pay attention to the space in disk and memory of your server).

### Adapt the file az09.txt to be imported by MongoDB

To transform the file az09.txt it is necessary to execute the file [distpass_createjson_dataset_bruteforce]( https://github.com/lclms/distpass/blob/master/scripts/distpass_createjson_dataset_bruteforce.py), this file is written in Python. 

When finished executing, a file JSON of name file_importa_distpass_brute_force will create. Before finalizing, it is necessary to complete the file by moving the first two characters "]}" to the end of the file.

Alternatively you can find the file already prepared [here](https://github.com/lclms/distpass/blob/master/content/file_importa_distpass_brute_force.json).

### Import the distpass_createjson_dataset_bruteforce file into the database

MongoDB has a document-based operation, and the previous step was done converting a text file to the JSON format that can read.

Import the file. The following command must use:

`mongoimport --db db_distPass --collection dictionaries --file file_importa_distpass_brute_force.json`

### Create the dataset dictionary

In this case we need to get the file Rockyou.txt and make the following adaptations of the [distpass_createjson_dataset_bruteforce]( https://github.com/lclms/distpass/blob/master/scripts/distpass_createjson_dataset_bruteforce.py) file.

```
filepath = 'rockyou.txt'
file = open('file_importa_distpass_rockyou.json','w')
...
file.write(']}{"l": '+s+', "k": "d","t":"'+ty+'","w": [')
```
When finished executing, a file JSON of name file_importa_distpass_brute_force will create. Before finalizing, it is necessary to complete the file by moving the first two characters "]}" to the end of the file.

Finally import the file_importa_distpass_rockyou.json file into the database using the following command;

`mongoimport --db db_distPass --collection dictionaries --file file_importa_distpass_rockyou.json`

## Create indexes to make the collection faster

The following image illustrates the creation of a "len" index using the Robo 3T tool.

![create index len](https://github.com/lclms/distpass/blob/master/img/create_index_dic_len.png)

## Final considerations

Only one set of data can be used, and it is up to the user to adapt the system as desired. You can even use other data sets that you understand. You must always bear in mind that the dataset in the case of brute force doubles each added character. As for the dictionary can always be improved.

___
[Back to Readme](https://github.com/lclms/distpass)</br>
[Next step, install the backend](https://github.com/lclms/distpass/blob/master/content/Install%20the%20Backend.md)
