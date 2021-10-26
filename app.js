$(function () {
  $("#serch_btn").click(function () {
    // 入力された値を取得

    // urlを設定
    const url = "https://zipcloud.ibsnet.co.jp/api/search";
    // 送るデータを成形する
    const param = { zipcode: $("#zipcode").val() };
    // サーバーと通信(Ajax)

    $.ajax({
      type: "GET",
      cache: false,
      data: param,
      url: url,
      dataType: "jsonp",
    })
      .done(function (res) {
        if (res.status != 200) {
          // 通信には成功。APIの結果がエラー
          // エラー内容を表示
          $("#zip_result").html(res.message);
        } else {
          //住所を表示
          const results = res.results[0];
          let ol = $("<ol>", {
            type: "a",
          });
          const html = `
            <li>都道府県コード:${results.zipcode}</li>
            <li>都道府県:${results.address1}</li>
            <li>市区町村:${results.address2}</li>
            <li>町域:${results.address3}</li>
            <li>都道府県(カナ):${results.kana1}</li>
            <li>市区町村(カナ):${results.kana2}</li>
            <li>町域(カナ):${results.kana3}</li>
            `;
          ol.append(html);
          $("#zip_result").html(ol);
        }
      })
      .fail(function (error) {
        console.log(error);
        $("#zip_result").html(
          "<p>通信エラーです。時間をおいてお試しください</p>"
        );
      });
  });
});
