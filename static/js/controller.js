function get_echarts_5_data() {
    $.ajax({
        url: "/echarts_5",
        success: function (data) {
            ec_5_option.yAxis[0].data = data.gname;
            ec_5_option.series[0].data = data.amo;
            Chart5.setOption(ec_5_option);
        },
        error: function () {

        }
    })
}


function get_echarts_4_data() {
    $.ajax({
        url: "/echarts_4",
        async : false,
        success: function (data) {
            mydata = data.data;
        },
        error: function () {

        }
    });
}


function get_echarts_3_data() {
    $.ajax({
        url: "/echarts_3",
        success: function (data) {
            ec_3_option.xAxis[0].data = data.date;
            ec_3_option.series[0].data = data.e;
            ec_3_option.series[1].data = data.liang;
            ec_3_option.series[2].data = data.fu;

            Chart3.setOption(ec_3_option);
        },
        error: function () {

        }
    })
}


function get_totalAmo_data() {
    $.ajax({
        url: "/numbt",
        success: function (data) {
            $(".numtxt").eq(0).text(data.data);
        },
        error: function () {

        }
    });
}


function get_zb_data() {
    $.ajax({
        url: "/zb",
        async : false,
        success: function (data) {
           v1 = data.sh;
           v2 = data.sz;
           v3 = data.bj;

        },
        error: function () {

        }
    });
}


function get_wordcloud_data() {
    $.ajax({
        url: "/echarts_1",
        success: function (data) {
        ec_1_option.series[0].data=data.data;
        Chart1.setOption(ec_1_option);
        },
        error: function () {

        }
    });
}


function get_pie_data() {
    $.ajax({
        url: "/echarts_2",
        success: function (data) {
        ec_2_option.series[0].data=data.data;
        Chart2.setOption(ec_2_option);
        },
        error: function () {

        }
    });
}

get_zb_data();
get_wordcloud_data();
get_totalAmo_data();
get_echarts_3_data();
get_echarts_4_data();
get_echarts_5_data();
get_pie_data();