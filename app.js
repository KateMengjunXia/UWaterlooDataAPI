/*
 *  Starter code for University of Waterloo CS349 - Spring 2017 - A3.
 *	Refer to the JS examples shown in lecture for further reference.
 *  Note: this code uses ECMAScript 6.
 *  Updated 2017-07-12.
 */
	
"use strict";

// Get your own API key from https://uwaterloo.ca/api/register
var apiKey = '8d0a520ef37f3b7bea23f54b2a93f979';

(function(exports) {

	/* A Model class */
    class AppModel {
		constructor() {
			this._observers = [];
		}

        // You can add attributes / functions here to store the data

        // Call this function to retrieve data from a UW API endpoint
        loadData(endpointUrl) {
            var that = this;
            $.getJSON(endpointUrl + "?key=" + apiKey,
                function (data) {
                    var info = document.getElementById('txt1');
                    var input = info.value;
                    info = document.getElementById('p1');
                    var info2 = document.getElementById('p2');
                    var info3 = document.getElementById('p3');
                    var info4 = document.getElementById('p4');
                    var info5 = document.getElementById('p5');
                    var info6 = document.getElementById('p6');
                    var info7 = document.getElementById('p7');

                    info.innerHTML = "";
                    info2.innerHTML = "";
                    info3.innerHTML = "";
                    info4.innerHTML = "";
                    info5.innerHTML = "";
                    info6.innerHTML = "";
                    info7.innerHTML = "";

                    info.append("Course ID entered: " + input);
                    info2.append(data.data.subject + " ");
                    info2.append(data.data.catalog_number);
                    info3.append(data.data.title);
                    info4.append("Description:");
                    info5.append(data.data.description);
                    info6.append("Prerequisites: " + data.data.prerequisites);
                    info7.append("Antirequisites: " + data.data.antirequisites);

                    that.notify(); // Notify View(s)
                }
            );
        }

        loadData2(endpointUrl) {
            var that = this;
            $.getJSON(endpointUrl + "?key=" + apiKey,
                function (data) {
                    var info = document.getElementById('txt2');
                    var input = info.value;
                    info = document.getElementById('pp1');
                    var info2 = document.getElementById('pp2');
                    var info3 = document.getElementById('pp3');

                    info.innerHTML = "";
                    info2.innerHTML = "";
                    info3.innerHTML = "";

                    info.append("Subject entered: " + input);
                    info2.append("Course listing:");
                    for (var i = 0 ; i < data.data.length; ++i) {
                        var para = document.createElement("br");
                        info3.append(input + " " + data.data[i].catalog_number + " (ID: " + data.data[i].course_id + ")");
                        info3.appendChild(para);
                    }

                    that.notify(); // Notify View(s)
                }
            );
        }

        loadData3(endpointUrl) {
            var that = this;
            $.getJSON(endpointUrl + "?key=" + apiKey,
                function (data) {
                    var info = document.getElementById('level');
                    var input = info.value.toLowerCase();
                    info = document.getElementById('ppp1');
                    var info2 = document.getElementById('ppp2');
                    var info3 = document.getElementById('ppp3');

                    info.innerHTML = "";
                    info2.innerHTML = "";
                    info3.innerHTML = "";

                    info.append(input + ": ");

                    for (var i = 0 ; i < data.data.length; ++i) {
                        if (data.data[i].academic_level == input) {
                            var para = document.createElement("br");
                            info2.append(data.data[i].subject + data.data[i].catalog_number);
                            info2.appendChild(para);
                        }
                    }

                    that.notify(); // Notify View(s)
                }
            );
        }
		
		// Add observer functionality to AppModel objects:
		
		// Add an observer to the list
		addObserver(observer) {
            this._observers.push(observer);
            observer.updateView(this, null);
        }
		
		// Notify all the observers on the list
		notify(args) {
            _.forEach(this._observers, function(obs) {
                obs.updateView(this, args);
            });
        }
    }

    /*
     * A view class.
     * model:  the model we're observing
     * div:  the HTML div where the content goes
     */
    class AppView {
		constructor(model, div) {
			this.model = model;
			this.div = div;
			model.addObserver(this); // Add this View as an Observer

            $("#addItemBtn").click(function() {
                var info = document.getElementById('txt1');
                var input = info.value;
                /*
                var num = input.substring(1);
                if (num.substring(0,1) == "0") {
                    num = num.substring(1);
                }
                */
                var num = input;
                while(num.substring(0,1) == "0") {
                    num = num.substring(1);
                }
                model.loadData("https://api.uwaterloo.ca/v2/courses/" + num + ".json");
            });

            $("#addItemBtn2").click(function() {
                var info = document.getElementById('txt2');
                var input = info.value;
                model.loadData2("https://api.uwaterloo.ca/v2/courses/" + input + ".json");
            });

            $("#level").change(function() {
                model.loadData3("https://api.uwaterloo.ca/v2/courses/CS.json");
            });

            $("#clearItemBtn").click(function() {
                var v1 = document.getElementById('p1');
                var v2 = document.getElementById('p2');
                var v3 = document.getElementById('p3');
                var v4 = document.getElementById('p4');
                var v5 = document.getElementById('p5');
                var v6 = document.getElementById('p6');
                var v7 = document.getElementById('p7');
                var vv1 = document.getElementById('pp1');
                var vv2 = document.getElementById('pp2');
                var vv3 = document.getElementById('pp3');
                var vvv1 = document.getElementById('ppp1');
                var vvv2 = document.getElementById('ppp2');
                var vvv3 = document.getElementById('ppp3');

                v1.innerHTML = "";
                v2.innerHTML = "";
                v3.innerHTML = "";
                v4.innerHTML = "";
                v5.innerHTML = "";
                v6.innerHTML = "";
                v7.innerHTML = "";
                vv1.innerHTML = "";
                vv2.innerHTML = "";
                vv3.innerHTML = "";
                vvv1.innerHTML = "";
                vvv2.innerHTML = "";
                vvv3.innerHTML = "";
            });

            $("#clearBtn1").click(function() {
                var v1 = document.getElementById('p1');
                var v2 = document.getElementById('p2');
                var v3 = document.getElementById('p3');
                var v4 = document.getElementById('p4');
                var v5 = document.getElementById('p5');
                var v6 = document.getElementById('p6');
                var v7 = document.getElementById('p7');

                v1.innerHTML = "";
                v2.innerHTML = "";
                v3.innerHTML = "";
                v4.innerHTML = "";
                v5.innerHTML = "";
                v6.innerHTML = "";
                v7.innerHTML = "";

            });

            $("#clearBtn2").click(function() {
                var vv1 = document.getElementById('pp1');
                var vv2 = document.getElementById('pp2');
                var vv3 = document.getElementById('pp3');

                vv1.innerHTML = "";
                vv2.innerHTML = "";
                vv3.innerHTML = "";
            });

            $("#clearBtn3").click(function() {
                var vvv1 = document.getElementById('ppp1');
                var vvv2 = document.getElementById('ppp2');
                var vvv3 = document.getElementById('ppp3');

                vvv1.innerHTML = "";
                vvv2.innerHTML = "";
                vvv3.innerHTML = "";
            });
		}

        updateView(obs, args) {
            // Add code here to update the View

        };        
    }

	/*
		Function that will be called to start the app.
		Complete it with any additional initialization.
	*/
    exports.startApp = function() {
        var model = new AppModel();
        var view = new AppView(model, "div#viewContent");
        model.addObserver(view);
        model.notify(view);
    }

})(window);
