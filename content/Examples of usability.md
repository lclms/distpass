# 5. Examples of usability

This page is intended to introduce some examples of usability

### Home Page

As described in point 3, when you start the frontend, the web browser automatically opens with the DistPass system. The following image illustrates the system home page. On the left side you can see the navigation menus and two buttons on the center that represent the actions that users can take to contribute their hardware. Finally, at the center a list of work that are available to be solved.

![](https://github.com/lclms/distpass/blob/master/img/home_pages_distpass.png)

The system can perform jobs based on brute force and dictionary modes (make sure you have both sets of data loaded to do this) the following image illustrates the buttons.

![](https://github.com/lclms/distpass/blob/master/img/verifi_works_addwork.png)

The figure below shows the form of inserting a job in the "brute force" mode.</br> The bottom line is the hash (sha256) of the word "aabb".

`486b34250bd4400c0aa90516fce9a9c0633a922eb40d0828cf299bc4e825acf4`

![](https://github.com/lclms/distpass/blob/master/img/verifi_work_addwork_bruteforce.png)

the management of tasks functions as if it were a separate module for learning purposes. However, at a later stage you can incorporate the REST API so that we have everything integrated.

You should make sure that you properly configure the IP in the demo_worker.js file.

Line 5</br>
`var socket = io.connect('http://xxx.xxx.xxx.xxx:8080',{'forceNew':true});`

From the second insert the previously defined IP to start the job. You can access it with any web browser that can access the server. The image below shows the result through the terminal.

![](https://github.com/lclms/distpass/blob/master/img/terminal_Success_work.png)
___
[Back to Readme](https://github.com/lclms/distpass)</br>
