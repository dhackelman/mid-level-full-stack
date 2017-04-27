(function() {

    var newButton = document.querySelectorAll('.new__reveal');
    var addButton = document.querySelectorAll('.new__add');
    var cancelButton = document.querySelectorAll('.new__cancel');
    var searchButton = document.querySelectorAll('.search__button');
    var count = true;
    var data_table = document.createElement('table');
    var data_table_row = document.createElement('tr');
    var data_table_header = document.createElement('th');
    var data_table_cell = document.createElement('td');
    //use this variable to make toggle possible
    var data_table_exists = false;

    var table_data = [{
            appt_date: '4/15/2017',
            appt_time: '2:15 PM',
            appt_desc: 'Find with people about stuffs.'
        },
        {
            appt_date: '5/15/2017',
            appt_time: '2:15 PM',
            appt_desc: 'Meet with people about things.'
        },
        {
            appt_date: '4/15/2017',
            appt_time: '2:15 PM',
            appt_desc: 'Meet with people about places.'
        },
        {
            appt_date: '4/15/2017',
            appt_time: '2:15 PM',
            appt_desc: 'Meet with people about jobs.'
        },
        {
            appt_date: '6/15/2017',
            appt_time: '2:15 PM',
            appt_desc: 'Meet with cats about stuffs.'
        },
        {
            appt_date: '4/15/2017',
            appt_time: '2:15 PM',
            appt_desc: 'Meet with people about stuffs.'
        },
        {
            appt_date: '7/15/2017',
            appt_time: '2:15 PM',
            appt_desc: 'Meet with people about things.'
        },
        {
            appt_date: '5/15/2017',
            appt_time: '2:15 PM',
            appt_desc: 'Meet with pups about stuffs.'
        }
    ];

    getAppointments('');



    $(newButton).click(function() {
        event.preventDefault();
        // console.log('animate');
        revealAppointmentForm();
    });
    $(addButton).click(function() {
        event.preventDefault();
        addNewAppointment();
    });
    $(cancelButton).click(function() {
        event.preventDefault();
        revealAppointmentForm();
    })

    $(searchButton).click(function() {
        event.preventDefault();
        appointment_ajax();
        $('table').remove();
        getAppointments('');
    });





    function addNewAppointment() {
        console.log('add appt');
    }

    function appointment_ajax() {
        $.ajax({
            xhrFields: {
                cors: true
            },
            type: "GET",
            url: "https://localhost:8080/",
            success: function(data) {
                console.log(data);
            },
            error: function(resp) {
                console.log(resp);
            }
        });
    }

    function addColumnHeaders(arr, table) {
        var columnSet = [];
        var tr = data_table_row.cloneNode(false);
        for (var i = 0, l = arr.length; i < l; i++) {
            for (var key in arr[i]) {
                if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
                    columnSet.push(key);
                    var th = data_table_header.cloneNode(false);
                    th.appendChild(document.createTextNode(key));
                    tr.appendChild(th);
                }
            }
        }
        table.appendChild(tr);
        //  console.log(columnSet);

        return columnSet;
    }

    function buildAppointmentTable(arr, parent) {
        $('.appointment__display').append(parent);
        // console.log('appt');
        var table = data_table.cloneNode(false);
        var columns = addColumnHeaders(arr, table);
        for (var i = 0; i < arr.length; ++i) {
            var tr = data_table_row.cloneNode(false);
            for (var j = 0; j < columns.length; ++j) {
                var td = data_table_cell.cloneNode(false);
                var cellValue = arr[i][columns[j]];
                td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        // console.log(table);
        parent.appendChild(table);
        data_table_exists = true;
    }


    function getAppointments(arg) {
        if (arg.length > 0) {
            console.log('searching for', arg);
        } else {
            console.log('retrieving all appointments');
            buildAppointmentTable(table_data, data_table);
            searchExistingAppointments();
        }
    }

    function revealAppointmentForm() {
        if (count === true) {
            $('.new__form').animate({
                height: "300px"
            }, "swing");
            count = false;
            $('.new__form').css("padding-top", "20px");
        } else {
            $('.new__form').css("padding-top", "0");
            $('.new__form').animate({
                height: "0"
            });
            count = true;
        }
        $('.new__form input').toggle();
    }

    function searchExistingAppointments() {
        $('tr').show();
        let searchBarInput = $('.search__input').val().toLowerCase();
        console.log(searchBarInput);
        if (searchBarInput.length === 0) {
            $('tr').show();
            return true;
        } else {
            let table__cells = document.querySelectorAll('td');
            // console.log(table__cells);
            for (let i = 0; i < table__cells.length; i++) {
                // console.log(table__cells[i].innerHTML);
                let thisCell = table__cells[i];
                if (thisCell.innerHTML.toLowerCase().indexOf(searchBarInput) === -1) {
                    // console.log(false);
                    $(thisCell).parent().toggle();
                } else {
                    // console.log(true);
                }
            }
        }
    }

})();
