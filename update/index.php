<!DOCTYPE html>
<html>
  <head>
    <!--Need to: -->
    <title>Update Page</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
      charset="UTF-8"
    />
  </head>
  <body>
    <form action="index.php">
      <input type="submit" value="submit" />
    </form>
  </body>
</html>

<?php
exec("./update.sh");
?>