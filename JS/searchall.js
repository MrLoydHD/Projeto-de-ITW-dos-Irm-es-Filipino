$(document).ready(function() {
    $('#forms1').submit(function(event) {
        return false;
    });

    var selectedTabId = 'Drivers'

    $('a[data-toggle="op"]').on('shown.bs.op', function(e) {
        // here is the new selected tab id

        selectedTabId = e.target.id;
        console.log(selectedTabId)



        localStorage.setItem('selectedTab', $(e.target).attr('id'));


        var selectedTab = localStorage.getItem('selectedTab');
        if (selectedTab) {
            $('#' + selectedTab).tab('show');
        }

    });

    $("#searchbarall").autocomplete({
        minLength: 2,
        source: function(request, response) {
            $.ajax({
                type: "GET",
                url: 'http://192.168.160.58/Formula1/api/Search/' + selectedTabId,
                data: {
                    name: $('#searchbarall').val(),
                    page: '1',
                    pagesize: '7',
                },
                dataType: "json",
                success: function(data) {
                    console.log(data)
                    var lista1 = [];
                    var lista2 = [];
                    var lista3 = [];
                    var l = 7

                    if (data.length < 7) {
                        l = data.length
                    }


                    for (var i = 0; i < l; i++) {
                        lista1.push({
                            label: data[i].Name,
                            value: data[i].Name,
                            data: './driverDetails.html?id=' + data[i].Id,
                        })
                        lista2.push({
                            label: data[i].Name,
                            value: data[i].Name,
                            data: './constructorsDetails.html?id=' + data[i].Id,
                        })
                        lista3.push({
                            label: data[i].Name,
                            value: data[i].Name,
                            data: './circuitDetails.html?id=' + data[i].Id,
                        })
                    }
                    console.log(selectedTabId)
                    if (selectedTabId === 'Drivers') {
                        response(lista1);
                    }
                    if (selectedTabId === 'Constructors') {
                        response(lista2);
                    }
                    if (selectedTabId === 'Circuits') {
                        response(lista3)
                    }

                },
                error: function(result) {
                    alert(result.statusText);
                }
            });
        },
        select: function(event, ui) {
            window.location.href = ui.item.data;
        }
    });



    $('#forms1').submit(function(event) {
        if ($('#searchbarall').val().trim().length > 2) {
            window.location.href = './searchres.html?' + selectedTabId + '&name=' + $('#searchbarall').val()
        }
    });


});