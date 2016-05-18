<!DOCTYPE html>
<head>
    <title>Score Control</title>
    <meta name="apple-mobile-web-app-capable" content="no" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<table border="1">
  <tr>
    <th>key</th>
    <th>score</th>
    <th>reset</th>
  </tr>
<?php
  require_once('../api/file/fun/score_fun.php');
  try {
    $data = json_decode(read("score.tmp"), true);
    foreach ($data as $key => $value) { 
      ?>
      <tr>
        <?php echo "<td>$key</td><td><span id='$key'>$value</span></td><td><button name='resetBtn' data-key='$key'>click</button></td>"; ?>    
      </tr>
      <?php
    }
  }catch (Exception $e) {
  }
?>
</table>
<script src="../js/jquery-1.11.3.js"></script>
<script type="text/javascript">
  $("button[name='resetBtn']").on('click', function() {
    writeScore($(this).data('key'), null);
  });

  function writeScore(key, score) {
    $.ajax('../api/file/writescore.php',{
      method: 'GET',
      data: {'key':key, 'score':score}
    }).done(function() {
      $('#'+key).html(score);
    });
  }
</script>
</body>
</html>